import { useState } from "react"
import type { VolunteerProfileProps } from "../../interface/interfaces"
import { Button } from "../ReuseableComponents"
import LocationSelect from "../form/LocationSelect"
import { interestCategories } from "../interest"

export const EditProfile:React.FC<{onClose?:()=>void}> = ({onClose})=>{

    const [profile, setProfile] = useState<VolunteerProfileProps>({
        firstName:"",
        lastName: "",
        email: "",
        location:{
            state: "",
            lga: ""
        }
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        let key = e.currentTarget.name as keyof VolunteerProfileProps;
        let value = e.currentTarget.value
        setProfile({...profile, [key]:value})
    }

    const InputField:React.FC<{label:string, value:string, placeholder:string, type?:React.HTMLInputTypeAttribute}> = ({label, value, placeholder, type="text"})=>(
        <div>
            <label htmlFor={label} className="block text-base font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input type={type} id="name" placeholder={placeholder} name={label} value={value} onChange={handleChange}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-800"/>
        </div>
    )

    const handleCancel = (e:React.MouseEvent<HTMLButtonElement>|undefined)=>{
        if(!e || !onClose) return;

        e.preventDefault()
        onClose()
    }
    return(
    <>
    <div className="bg-white p-8 rounded-xl shadow-2xl  w-full border border-gray-200">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 leading-tight">
        Edit Profile
    </h2>
    <form className="space-y-6">
        {/* Name Input */}
        <InputField label={"First Name"} value={profile.firstName} key={profile.firstName} placeholder="John Doe"/>
        <InputField label={"Last Name"} value={profile.lastName} key={profile.lastName} placeholder="Doe"/>
        <InputField label={"Email"} value={profile.email} key={profile.email} placeholder="johndoe@gmail.com" type="email"/>
        <div>
            <label htmlFor="location"  className="block text-base font-semibold text-gray-700 mb-2">Location</label>
            <LocationSelect onChange={()=>{}}/>
        </div>
        {/* <InputField label={profile.Location} value={profile.Location} key={profile.Location}/> */}

        {/* Required Skills */}
        <div>
            <label htmlFor="requiredSkills" className="block text-base font-semibold text-gray-700 mb-2">
                Required Skills (optional)
            </label>
            <div className="grid grid-cols-2 gap-6">
                <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-800 appearance-none bg-white pr-8">
                    <option selected={true} hidden={true}>Category</option>
                    {interestCategories.map((interest, index)=><option value={interest.title} key={index}>{interest.title}</option>)}
                </select>
                <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-800 appearance-none bg-white pr-8"
                >
                    <option selected={true} hidden={true}>Skill</option>
                    {/* {
                        interestCategories
                            .filter((cat=>cat.title == selectedSkillCat))
                            .flatMap(value =>value.items.filter(skill=>!formFields.requiredSkills.includes(skill)).map((skill, index)=><option value={skill} key={index}>{skill}</option>)
                            )
                    } */}
                </select>
            </div>
            <div id="requiredSkills" className="flex gap-x-2 px-4 py-3 border border-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-800">
                {/* {formFields.requiredSkills.map((skill)=><span className="px-2 py-1 text-xs bg-gray-200 rounded-full flex items-center" key={skill}>
                    {skill}
                    <button className="ml-1 text-red-500">×</button>
                </span>)} */}
            </div>
            </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 space-x-4">
            <Button variant="primary">
                Update
            </Button>
            <Button variant="outline"
            onClick={(e)=>{
                handleCancel(e)
            }}
            >
                Cancel
            </Button>
        </div>
    </form>
</div>
</>
)
}