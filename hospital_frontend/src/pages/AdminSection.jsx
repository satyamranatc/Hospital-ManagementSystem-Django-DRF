import React from 'react';
import { Shield, Settings, Database, Users, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminCard = ({ title, desc, icon, action }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{desc}</p>
    <button className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-primary-600 hover:text-white transition-all">
      {action}
    </button>
  </motion.div>
);

const AdminSection = () => {
  const sections = [
    { title: 'User Management', desc: 'Manage administrative access, roles, and permissions for hospital staff.', icon: <Users size={28} />, action: 'Manage Users' },
    { title: 'System Logs', desc: 'Track all activities and system changes for security and auditing.', icon: <Database size={28} />, action: 'View Logs' },
    { title: 'Hospital Settings', desc: 'Configure hospital departments, specializations, and working hours.', icon: <Settings size={28} />, action: 'Edit Settings' },
    { title: 'Notifications', desc: 'Send announcements and emergency alerts to all hospital staff.', icon: <Bell size={28} />, action: 'Manage Alerts' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-primary-200">
          <Shield size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-slate-500">Global system configuration and data management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <AdminCard key={idx} {...section} />
        ))}
      </div>

      <div className="bg-primary-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">System Health</h2>
          <div className="flex gap-12">
            <div>
              <p className="text-primary-300 text-sm mb-1 font-medium italic">Database Storage</p>
              <p className="text-3xl font-bold">12.4 GB <span className="text-sm font-normal text-primary-400">/ 100 GB</span></p>
            </div>
            <div>
              <p className="text-primary-300 text-sm mb-1 font-medium italic">API Uptime</p>
              <p className="text-3xl font-bold text-emerald-400">99.9%</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-primary-700 rounded-full mb-[-100px] opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default AdminSection;
