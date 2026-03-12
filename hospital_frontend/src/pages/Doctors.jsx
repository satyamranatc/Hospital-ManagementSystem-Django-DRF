import { useAuth } from '../context/AuthContext';

const Doctors = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', contact: '', email: '' });

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

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await doctorService.create(newDoctor);
      setIsModalOpen(false);
      setNewDoctor({ name: '', specialization: '', contact: '', email: '' });
      fetchDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

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
        {user?.role === 'Admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
          >
            <Plus size={20} />
            Add New Doctor
          </button>
        )}
      </div>


      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:w-80">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search doctors..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <Table columns={columns} data={doctors} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Doctor">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={newDoctor.specialization}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact No.</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newDoctor.contact}
                onChange={(e) => setNewDoctor({ ...newDoctor, contact: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              />
            </div>
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
              Save Doctor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Doctors;
