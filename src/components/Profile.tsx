import ProfileAchievements from "./ProfileAchievement";

import Certifications from "./Volunteer/Certifications";

import { BadgeIcon } from "./icons";

import type {MyCertificationProps} from "../interface/interfaces"
import { useState } from "react";
import { EditProfile } from "./Volunteer/editProfile";

const data: MyCertificationProps[] = [
  {
    id: "1",
    title: "Frontend Developer",
    organization: {
      name: "TechCorp Ltd",
      status: "VERIFIED",
      category: ["Technology", "Education"],
    },
    earned: "2025-11-10",
    hoursContributed: 5,
    userName: "Habib Yusuf",
    role: "super volunteer",
  },
  {
    id: "2",
    title: "Graphic Designer",
    organization: {
      name: "Designify Studios",
      status: "VERIFIED",
      category: ["Technology", "Education"],
    },
    earned: "2025-11-10",
    hoursContributed: 7,
    userName: "Habib Yusuf",
    role: "super volunteer",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    organization: {
      name: "SoftBridge",
      status: "VERIFIED",
      category: ["Technology", "Education"],
    },
    earned: "2025-11-10",
    hoursContributed: 5,
    userName: "Habib Yusuf",
    role: "super volunteer",
  },
];



const sampleProfile= {
  id: 1,
  name: "Habib Yusuf",
  avatar: "/user.png",
  location: "Abuja, Nigeria",
  rating: "⭐⭐⭐⭐",
  skills: [
    "React",
    "TypeScript",
    "TailwindCSS",
    "TailwindCSS",
    "TailwindCSS",
    "TailwindCSS",
    "TailwindCSS",],
  interests: ["Frontend", "UI/UX", "Mobile Dev"],
  phoneVerified: true,
  emailVerified: true,
  role: "Volunteer",
};

const sampleBadges = [
  {
    id: 1,
    icon: <BadgeIcon  />,
    description: "Community Helper",
    earned: true,
  },
  {
    id: 2,
    icon: <BadgeIcon />,
    description: "Community Helper",
    earned: false,
  },
  {
    id: 3,
    icon: <BadgeIcon />,
    description: "Community Helper",
    earned: false,
  },
  {
    id: 4,
    icon: <BadgeIcon />,
    description: "Community Helper",
    earned: false,
  },
];

export const ProfilePage:React.FC<{editing?:boolean}> = ({editing = false})=> {

  const [isEditing, setIsEditing] = useState(editing)

  return (
    <div className="p-6 space-y-6 flex flex-col justify-center items-center">
      
      {isEditing?<EditProfile onClose={()=>{
        setIsEditing(false)
      }}/> : <ProfileAchievements
        profile={sampleProfile}
        badges={sampleBadges}
        onEditProfile={() => setIsEditing(true)}
      />}

    </div>
  );
}

export default ProfilePage;