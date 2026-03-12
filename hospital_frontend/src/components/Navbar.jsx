import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-96">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search for patients, doctors, etc..."
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">Dr. Sarah Johnson</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
