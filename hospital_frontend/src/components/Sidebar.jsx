import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, Calendar, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'Doctors', icon: <UserRound size={20} />, path: '/doctors' },
    { title: 'Patients', icon: <Users size={20} />, path: '/patients' },
    { title: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
    { title: 'Admin Section', icon: <Settings size={20} />, path: '/admin-section' },
  ];

  return (
    <div className="bg-white h-screen w-64 border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
          <div className="bg-primary-600 p-1.5 rounded-lg text-white">
            <Calendar size={24} />
          </div>
          CareFlow
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
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
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
