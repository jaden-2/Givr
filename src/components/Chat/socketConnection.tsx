import { useEffect, useRef, useState } from "react"

export const useWebsocketConnection = ()=>{

    const socketRef = useRef<WebSocket|null>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const socketBaseUrl = import.meta.env.VITE_CHAT_BASEURL;

    useEffect(()=>{
        let isMounted = true
        let socket = new WebSocket(`${socketBaseUrl}/chat`)

        socketRef.current = socket;

        const handleOpen = ()=>{
            if(!isMounted)
                return

            setIsConnected(true)
        }

        const handleClose = ()=>{
            if(!isMounted)
                return

            setIsConnected(false)
        }

        const handleError = ()=>{
            if(!isMounted)
                return

            setIsConnected(false)
        }

        socket.addEventListener("open", handleOpen)
        socket.addEventListener("close", handleClose)
        socket.addEventListener("error", handleError)

        return ()=>{
            isMounted = false

            socket.removeEventListener("open", handleOpen)
            socket.removeEventListener("close", handleClose)
            socket.removeEventListener("error", handleError)

            socket.close()
            socketRef.current = null
        
        }
            
    }, [socketBaseUrl])

    return {socketConnection: socketRef.current, isConnected}
}