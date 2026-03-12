import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import Table from '../components/Table';
import { patientService } from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const response = await patientService.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const columns = [
    { key: 'name', label: 'Patient Name', render: (val) => <span className="font-bold text-slate-900">{val}</span> },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender', render: (val) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
        val === 'Male' || val === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
      }`}>
        {val === 'M' ? 'Male' : val === 'F' ? 'Female' : val}
      </span>
    )},
    { key: 'contact', label: 'Contact' },
    { key: 'medical_history', label: 'Medical History', render: (val) => (
      <span className="text-slate-500 italic max-w-xs truncate block">{val || 'No history'}</span>
    )},
  ];

  if (loading) return <div className="p-8 text-center text-slate-500">Loading patients...</div>;

  const actions = [
    { icon: <Edit2 size={16} />, className: 'text-blue-600 hover:bg-blue-50', onClick: (p) => console.log('Edit', p) },
    { icon: <Trash2 size={16} />, className: 'text-red-600 hover:bg-red-50', onClick: (p) => console.log('Delete', p) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients Directory</h1>
          <p className="text-slate-500 text-sm">View and manage patient records and medical histories.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
          <Plus size={20} />
          Add New Patient
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:w-80">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search patients..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <Table columns={columns} data={patients} actions={actions} />
    </div>
  );
};

export default Patients;
