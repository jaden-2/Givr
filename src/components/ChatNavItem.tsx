// Simple Sidebar Navigation Item with Dynamic Badge
import { LucideMessageCircleDashed } from 'lucide-react';

export const ChatNavItem = ({ unreadCount = 5 }) => {
  return (
    <button className="flex items-center justify-between w-full max-w-[160px] px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800/60 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition duration-150 group">
      <div className="flex items-center space-x-1.5">
        <LucideMessageCircleDashed size={14} className="text-indigo-400 group-hover:text-indigo-300" />
        <span className="text-xs font-medium">Chat</span>
      </div>
      {unreadCount > 0 && (
        <span className="flex items-center justify-center h-4.5 min-w-[18px] px-1.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
      )}
    </button>
  );
};