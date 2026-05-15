import  { useState,} from 'react';
import { Send, Smile, CheckCheck, User } from 'lucide-react';
import { Button } from '../ReuseableComponents';

export interface Message {
  id: string;
  sender: string;
  timestamp: string;
  content: string;
  isOutgoing: boolean;
}

const Avatar = ({ className = "" }: { className?: string }) => (
  <div className={`w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0 ${className}`}>
    <User className="text-white w-8 h-8" />
  </div>
);

export const ThreadHeader = ({ newMessageCount }: { newMessageCount: number }) => (
  <header className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-white">
    <h2 className="text-xs font-bold text-black uppercase tracking-wider">Message Thread</h2>
    <div className="flex items-center gap-1 text-blue-500 font-medium text-xs">
      <span>{newMessageCount} new messages</span>
      <div className="w-2 h-2 bg-blue-500 rounded-full" />
    </div>
  </header>
);

export const MessageBubble = ({ message }: { message: Message }) => {
  if (message.isOutgoing) {
    return (
      <div className="flex justify-end gap-3 mb-6 items-start">
        <div className="flex flex-col items-end max-w-[70%]">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xs font-bold text-blue-600">You</span>
             <span className="text-[10px] text-gray-500 uppercase">{message.timestamp}</span>
          </div>
          <div className="bg-blue-50 text-gray-800 p-4 rounded-2xl rounded-tr-none shadow-sm relative">
            <p className="text-sm leading-relaxed">{message.content}</p>
            <div className="flex justify-end mt-1">
               <CheckCheck className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>
        <Avatar className="mt-6" />
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3 mb-6 items-start">
      <Avatar />
      <div className="flex flex-col max-w-[70%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-black">{message.sender}</span>
          <span className="text-[10px] text-gray-500 uppercase">{message.timestamp}</span>
        </div>
        <div className="bg-gray-50 text-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export const InputArea:React.FC<{onSend:(test:string)=>Promise<void>}> = ({onSend}) => {
  const [text, setText] = useState("");

  const handleSend = async ()=>{
    await onSend(text)
    setText('')
  }
  return (
    <div className="p-4 bg-white border-t border-gray-100 flex gap-4 items-center">
      <div className="relative flex-grow">
        <textarea 
        
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={async (key)=>{
            if(key.key == "Enter"){
                if(!key.shiftKey)
                    await handleSend()
            }
          }}
          placeholder="Type your message here..."
          rows={4}
          className="resize-none w-full pl-4 pr-10 py-3 border-2 border-indigo-100 rounded-xl focus:outline-none focus:border-indigo-300 transition-colors text-sm"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          <Smile size={20} />
        </button>
      </div>
      {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-bold text-xs tracking-widest transition-all shadow-md">
        
      </button> */}
      <Button variant='primary' onClick={handleSend}>
        <Send size={16} />
        SEND MESSAGE
      </Button>
    </div>
  );
};

