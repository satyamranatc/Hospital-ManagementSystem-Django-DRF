import React, { useState, useEffect } from 'react';
import { Users, UserRound, Calendar, Activity, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { doctorService, patientService, appointmentService } from '../services/api';

const StatCard = ({ title, value, icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
          <TrendingUp size={14} />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </motion.div>
);

const Dashboard = () => {
  const [counts, setCounts] = useState({ patients: 0, doctors: 0, appointments: 0 });
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [docRes, patRes, appRes] = await Promise.all([
          doctorService.getAll(),
          patientService.getAll(),
          appointmentService.getAll()
        ]);
        setCounts({
          doctors: docRes.data.length,
          patients: patRes.data.length,
          appointments: appRes.data.length
        });
        setRecentApps(appRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Patients', value: counts.patients.toLocaleString(), icon: <Users size={24} />, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Active Doctors', value: counts.doctors.toLocaleString(), icon: <UserRound size={24} />, color: 'bg-purple-500', trend: '+4%' },
    { title: 'Appointments Today', value: counts.appointments.toLocaleString(), icon: <Calendar size={24} />, color: 'bg-emerald-500', trend: '+8%' },
    { title: 'Operations', value: '12', icon: <Activity size={24} />, color: 'bg-orange-500', trend: '-2%' },
  ];


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hospital Overview</h1>
        <p className="text-slate-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Upcoming Appointments</h2>
            <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentApps.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No upcoming appointments.</p>
            ) : (
              recentApps.map((app, i) => (
                <div key={app.id} className="flex items-center justify-between p-4 border border-slate-50 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold uppercase">
                      {app.patient_name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.patient_name}</h4>
                      <p className="text-xs text-slate-500">Checkup with Dr. {app.doctor_name}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2 text-slate-500">
                    <Clock size={14} />
                    <span className="text-xs font-semibold">{app.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Patient Statistics</h2>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="w-full bg-primary-50 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="w-full bg-primary-500 rounded-t-lg transition-colors group-hover:bg-primary-600"
                ></motion.div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
