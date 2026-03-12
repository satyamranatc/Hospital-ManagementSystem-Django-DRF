import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/', roles: ['Admin', 'Doctor', 'Patient'] },
    { title: 'Doctors', icon: <UserRound size={20} />, path: '/doctors', roles: ['Admin', 'Patient'] },
    { title: 'Patients', icon: <Users size={20} />, path: '/patients', roles: ['Admin', 'Doctor'] },
    { title: 'Appointments', icon: <Calendar size={20} />, path: '/appointments', roles: ['Admin', 'Doctor', 'Patient'] },
    { title: 'Admin Section', icon: <Settings size={20} />, path: '/admin-section', roles: ['Admin'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="bg-white h-screen w-64 border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
          <div className="bg-primary-600 p-1.5 rounded-lg text-white">
            <Calendar size={24} />
          </div>
          CareFlow
        </h1>
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Signed in as</p>
          <p className="text-sm font-bold text-slate-900 truncate">{user?.username}</p>
          <p className="text-[10px] text-primary-600 font-bold uppercase">{user?.role}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                  }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
