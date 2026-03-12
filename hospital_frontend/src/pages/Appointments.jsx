import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, Clock, User, UserRound } from 'lucide-react';
import Table from '../components/Table';
import { appointmentService } from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentService.getAll();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    { key: 'patient_name', label: 'Patient', render: (val) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
          <User size={16} />
        </div>
        <span className="font-bold text-slate-900">{val}</span>
      </div>
    )},
    { key: 'doctor_name', label: 'Doctor', render: (val) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
          <UserRound size={16} />
        </div>
        <span className="text-slate-600 font-medium">{val}</span>
      </div>
    )},
    { key: 'date', label: 'Date', render: (val) => (
      <div className="flex items-center gap-2 text-slate-600">
        <Calendar size={14} />
        <span>{val}</span>
      </div>
    )},
    { key: 'time', label: 'Time', render: (val) => (
      <div className="flex items-center gap-2 text-slate-600">
        <Clock size={14} />
        <span>{val}</span>
      </div>
    )},
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        val === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
        val === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
        'bg-red-100 text-red-700'
      }`}>
        {val}
      </span>
    )},
  ];

  if (loading) return <div className="p-8 text-center text-slate-500">Loading appointments...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments Schedule</h1>
          <p className="text-slate-500 text-sm">Organize and track all medical consultations.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
          <Plus size={20} />
          Schedule Appointment
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:w-80">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search appointments..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <Table columns={columns} data={appointments} />
    </div>
  );
};

export default Appointments;
