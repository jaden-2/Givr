import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { ClientEvent } from "./MessageThread";
import type { Message } from "./inAppChatComponents";


interface SocketConnectionProperties {
    socketConnection: WebSocket|null;
    subscribe: (projectId:number)=>void;
    unsubscribe: (projectId:number)=>void;
    unreadCount: Map<number, number>|null;
    totalCount: number
}


const SocketConnectionContext = createContext<SocketConnectionProperties| undefined>(undefined)

export const WebsocketConnection:React.FC<{children:React.ReactNode}> = ({children})=>{

    const socketRef = useRef<WebSocket|null>(null)
    let subscriptions = useRef<Map<number, number>>(new Map())
    let unreadNotifications = useRef<Map<number, number>>(new Map())
    let totalUnread = useRef<number>(0)
    
    const [socketConnection, setSocketConnection] = useState<WebSocket|null>(null)
    const [unreadCount, setUnreadCount] = useState<Map<number, number>>(new Map())
    const [totalCount, setTotalCount] = useState<number>(0)

    const socketBaseUrl = import.meta.env.VITE_CHAT_BASEURL;


    
    useEffect(()=>{
        let isMounted = true
        let socket = new WebSocket(`${socketBaseUrl}/chat`)

        let connectMsg: ClientEvent = {
            type: "Connected",
            payload:{}
        }
        socketRef.current = socket;
        

        subscriptions.current = new Map<number, number>()
        unreadNotifications.current = new Map<number, number>()
        
        const handleOpen = ()=>{
            if(!isMounted)
                return
            console.log("Connection open")
               
            socket.send(JSON.stringify(connectMsg))
            setSocketConnection(socket)
        }

        const handleClose = (ev: CloseEvent)=>{
            if(!isMounted)
                return
            console.error("Connection closed by server")
            console.log(ev)
            setSocketConnection(null)
        }

        const handleMessage = (msg:MessageEvent)=>{
            let payload = msg.data as Message
            if(payload.type == "unread_update" && payload.projectId){
                let projectId = payload.projectId
                setTotalCount(totalUnread.current +1)
                setUnreadCount(prev=>{
                    let next = new Map(prev)
                    next.set(projectId, (next.get(projectId)||0)+1)

                    return next;
                })
            }
        }

        const handleError = ()=>{
            if(!isMounted)
                return
            console.error("Error occured")
        }

        socket.addEventListener("open", handleOpen)
        socket.addEventListener("close", handleClose)
        socket.addEventListener("error", handleError)
        socket.addEventListener("message", handleMessage)
        
        return ()=>{
            isMounted = false

            socket.removeEventListener("open", handleOpen)
            socket.removeEventListener("close", handleClose)
            socket.removeEventListener("error", handleError)

            setTimeout(()=>{
                if(!isMounted){
                    return
                }
                console.log("Clearing socket")
                socket.close()
                socketRef.current = null
                subscriptions.current = new Map()
                unreadNotifications.current = new Map()
                totalUnread.current = 0
            }, 50)

        }
            
    }, [])

    const subscribe = (projectId:number)=>{
        let sock = socketRef.current

            if(sock?.readyState != sock?.OPEN)
                return

            let subscriptionMsg:ClientEvent = {
                type: "Group_Opened", 
                payload: {
                    projectId
                }
            }
            let count = subscriptions.current?.get(projectId) || 0

            if(count == 0 && sock?.readyState == sock?.OPEN){
                sock?.send(JSON.stringify(subscriptionMsg))
                if(unreadCount?.get(projectId))
                    unreadCount.set(projectId, 0)
            }
            subscriptions.current?.set(projectId, count+1)
        }

    const unsubscribe = (projectId:number)=>{
            let subscriptionMsg: ClientEvent = {
                type: "Group_Closed", 
                payload: {
                    projectId
                }
            }

            let count = (subscriptions.current?.get(projectId) || 0) - 1
        

            if(count < 0)
                return

            if(count == 0){
                setTimeout(()=>{
                    if(subscriptions.current?.get(projectId) == 0)
                        socketConnection?.send(JSON.stringify(subscriptionMsg))
                }, 50)
            }
        }

    return <SocketConnectionContext.Provider value={{ socketConnection, subscribe, unsubscribe, unreadCount, totalCount}}>
        {children}
    </SocketConnectionContext.Provider>
}

export const useSocketConnection = ()=>useContext(SocketConnectionContext)