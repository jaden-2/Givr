import { useEffect, useRef, useState } from "react";
import { InputArea, MessageBubble, ThreadHeader, type Message } from "./inAppChatComponents";
import { parseTime } from "../hooks/ParseDate";


export default function MessageThreadApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sylvanus Jedidiah',
      timestamp: '10:15 AM',
      content: 'Hello everyone,\nWelcome to the project! Please review the schedule and let me know if you have questions.',
      isOutgoing: false
    },
    {
      id: '2',
      sender: 'Jedidiah Amonia',
      timestamp: '10:17 AM',
      content: 'Thanks Sylvanus. Will do so now.\nAlso, should we prepare anything before the first session?',
      isOutgoing: false
    },
    {
      id: '3',
      sender: 'You',
      timestamp: '10:18 AM',
      content: "Good question. I'll share the requirements list here shortly. Please check back in a few minutes.",
      isOutgoing: true
    },
    {
      id: '4',
      sender: 'Sylvanus Jedidiah',
      timestamp: '10:20 AM',
      content: 'Perfect. Looking forward to it!',
      isOutgoing: false
    }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (txt:string)=>{
    setMessages(prev=>[...prev, {
        id: `${messages.length++}`,
        content: txt,
        isOutgoing: true,
        sender: "Sylvanus Jedidiah",
        timestamp: parseTime(Date.now().toLocaleString())
    }])
  }
  return (
    <div className="flex flex-col h-screen bg-white font-sans text-slate-900 overflow-hidden max-w-6xl mx-auto shadow-2xl">
      <ThreadHeader newMessageCount={3} />
      
      {}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <InputArea onSend={handleSend}/>
    </div>
  );
}