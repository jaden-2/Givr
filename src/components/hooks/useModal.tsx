import { useState, type ReactNode } from "react"
import useScrollLock from "./scrollLock"

const Modal:React.FC<{children:ReactNode; onClose:()=>void}> = ({children, onClose})=>{
    useScrollLock(true)
    
    return <div 
        className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
        
        onClick={()=>{
            onClose()
        }}
        >
            <div
                className="bg-white rounded-lg p-4">
                {children}
            </div>
        </div>
    }

export function useModal(){
    const[child, setChild] = useState<ReactNode>(null)

    const modal = (child:ReactNode)=>{
        setChild(child)
    }

    const DisplayModal = ()=> child? <Modal onClose={()=>setChild(null)}>{child}</Modal>:null

    return {modal, DisplayModal}
}