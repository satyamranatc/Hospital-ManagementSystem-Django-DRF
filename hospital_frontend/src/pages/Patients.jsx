import { useAuth } from '../context/AuthContext';

const Patients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: 'M', contact: '', address: '', medical_history: '' });

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

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await patientService.create(newPatient);
      setIsModalOpen(false);
      setNewPatient({ name: '', age: '', gender: 'M', contact: '', address: '', medical_history: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

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
        {user?.role !== 'Patient' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
          >
            <Plus size={20} />
            Add New Patient
          </button>
        )}
      </div>


      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:w-80">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search patients..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <Table columns={columns} data={patients} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Patient">
        <form onSubmit={handleAddPatient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact No.</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={newPatient.contact}
              onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <textarea
              required
              rows="2"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              value={newPatient.address}
              onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Medical History (Optional)</label>
            <textarea
              rows="2"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              value={newPatient.medical_history}
              onChange={(e) => setNewPatient({ ...newPatient, medical_history: e.target.value })}
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
              Save Patient
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Patients;
