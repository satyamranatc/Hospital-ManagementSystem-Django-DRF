import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, UserRound, Plus, Search, CheckCircle, XCircle } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { appointmentService, doctorService, patientService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    patient: '',
    date: '',
    time: '',
    reason: '',
    status: 'Scheduled'
  });

  const fetchData = async () => {
    try {
      const [appRes, docRes, patRes] = await Promise.all([
        appointmentService.getAll(),
        doctorService.getAll(),
        patientService.getAll()
      ]);
      setAppointments(appRes.data);
      setDoctors(docRes.data);
      setPatients(patRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.create(newAppointment);
      setIsModalOpen(false);
      setNewAppointment({ doctor: '', patient: '', date: '', time: '', reason: '', status: 'Scheduled' });
      fetchData();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await appointmentService.update(id, { ...appointments.find(a => a.id === id), status });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

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

  const actions = user?.role !== 'Patient' ? [
    { 
      icon: <CheckCircle size={16} />, 
      className: 'text-emerald-600 hover:bg-emerald-50', 
      onClick: (app) => handleUpdateStatus(app.id, 'Completed') 
    },
    { 
      icon: <XCircle size={16} />, 
      className: 'text-red-600 hover:bg-red-50', 
      onClick: (app) => handleUpdateStatus(app.id, 'Cancelled') 
    },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments Schedule</h1>
          <p className="text-slate-500 text-sm">Organize and track all medical consultations.</p>
        </div>
        {(user?.role === 'Admin' || user?.role === 'Patient') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
          >
            <Plus size={20} />
            Schedule Appointment
          </button>
        )}
      </div>


      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:w-80">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search appointments..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <Table columns={columns} data={appointments} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Appointment">
        <form onSubmit={handleAddAppointment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Patient</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newAppointment.patient}
                onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
              >
                <option value="">Choose a patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Doctor</label>
              <select
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
              >
                <option value="">Choose a doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
              <input
                type="time"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
            <textarea
              required
              rows="2"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              placeholder="e.g. Routine checkup, Fever, etc."
              value={newAppointment.reason}
              onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
