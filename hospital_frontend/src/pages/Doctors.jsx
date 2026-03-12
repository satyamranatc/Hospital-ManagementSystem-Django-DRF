import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import Table from '../components/Table';
import { doctorService } from '../services/api';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await doctorService.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const columns = [
    { key: 'name', label: 'Doctor Name', render: (val) => <span className="font-bold text-slate-900">{val}</span> },
    { key: 'specialization', label: 'Specialization' },
    { key: 'contact', label: 'Contact' },
    { key: 'email', label: 'Email' },
  ];

  if (loading) return <div className="p-8 text-center text-slate-500">Loading doctors...</div>;

  const actions = [
    { icon: <Edit2 size={16} />, className: 'text-blue-600 hover:bg-blue-50', onClick: (doc) => console.log('Edit', doc) },
    { icon: <Trash2 size={16} />, className: 'text-red-600 hover:bg-red-50', onClick: (doc) => console.log('Delete', doc) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctors Management</h1>
          <p className="text-slate-500 text-sm">Manage all doctors, their specializations, and contact details.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
          <Plus size={20} />
          Add New Doctor
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:w-80">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search doctors..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <Table columns={columns} data={doctors} actions={actions} />
    </div>
  );
};

export default Doctors;
