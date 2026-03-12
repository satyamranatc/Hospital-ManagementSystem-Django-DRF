import { useEffect } from 'react';
import { adminService, systemService } from '../services/api';
import Modal from '../components/Modal';

const AdminCard = ({ title, desc, icon, action, onClick }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{desc}</p>
    <button 
      onClick={onClick}
      className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-primary-600 hover:text-white transition-all"
    >
      {action}
    </button>
  </motion.div>
);

const AdminSection = () => {
  const [health, setHealth] = useState({ database_size: '0 GB', api_uptime: '0%', system_status: 'Loading...' });
  const [logs, setLogs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', type: 'Staff' });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [healthRes, logsRes, annRes, usersRes] = await Promise.all([
          systemService.getHealth(),
          adminService.getLogs(),
          adminService.getAnnouncements(),
          adminService.getUsers()
        ]);
        setHealth(healthRes.data);
        setLogs(logsRes.data);
        setAnnouncements(annRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchAdminData();
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await adminService.createAnnouncement(newAnnouncement);
      setIsAnnouncementModalOpen(false);
      setNewAnnouncement({ title: '', message: '', type: 'Staff' });
      const annRes = await adminService.getAnnouncements();
      setAnnouncements(annRes.data);
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const sections = [
    { 
      title: 'User Management', 
      desc: `Total staff members: ${users.length}. Manage administrative access and roles for hospital staff.`, 
      icon: <Users size={28} />, 
      action: 'Manage Users',
      onClick: () => console.log('Users', users) 
    },
    { 
      title: 'System Logs', 
      desc: `Recent activities detected: ${logs.length}. Track all activities and system changes.`, 
      icon: <Database size={28} />, 
      action: 'View Logs',
      onClick: () => setIsLogModalOpen(true)
    },
    { 
      title: 'Hospital Settings', 
      desc: 'Configure hospital departments, specializations, and working hours.', 
      icon: <Settings size={28} />, 
      action: 'Edit Settings' 
    },
    { 
      title: 'Notifications', 
      desc: `Active alerts: ${announcements.length}. Send announcements and emergency alerts.`, 
      icon: <Bell size={28} />, 
      action: 'Manage Alerts',
      onClick: () => setIsAnnouncementModalOpen(true)
    },
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
              <p className="text-3xl font-bold">{health.database_size} <span className="text-sm font-normal text-primary-400">/ {health.database_limit}</span></p>
            </div>
            <div>
              <p className="text-primary-300 text-sm mb-1 font-medium italic">API Uptime</p>
              <p className="text-3xl font-bold text-emerald-400">{health.api_uptime}</p>
            </div>
            <div>
              <p className="text-primary-300 text-sm mb-1 font-medium italic">Status</p>
              <p className="text-3xl font-bold text-emerald-400">{health.system_status}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-primary-700 rounded-full mb-[-100px] opacity-30 blur-3xl"></div>
      </div>

      {/* Logs Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title="System Activity Logs">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {logs.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No recent activity detected.</p>
          ) : (
            logs.map(log => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-primary-600">{log.action}</span>
                  <span className="text-slate-400 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-slate-600">{log.description}</p>
                <div className="mt-2 text-xs text-slate-400">User: {log.user_name || 'System'}</div>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* Announcement Modal */}
      <Modal isOpen={isAnnouncementModalOpen} onClose={() => setIsAnnouncementModalOpen(false)} title="Broadcast Announcement">
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alert Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Upcoming System Maintenance"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message Body</label>
            <textarea
              required
              rows="3"
              placeholder="Provide detailed information for hospital staff..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              value={newAnnouncement.message}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alert Type</label>
            <select
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={newAnnouncement.type}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
            >
              <option value="Staff">Regular Announcement</option>
              <option value="Emergency">Emergency Alert</option>
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsAnnouncementModalOpen(false)}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              Broadcast Now
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Previous Announcements</h4>
          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className={`p-4 rounded-xl border ${ann.type === 'Emergency' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h5 className={`font-bold text-sm ${ann.type === 'Emergency' ? 'text-red-700' : 'text-slate-900'}`}>{ann.title}</h5>
                  <span className="text-[10px] text-slate-400 capitalize bg-white px-2 py-0.5 rounded-full border border-slate-100">{ann.type}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{ann.message}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSection;
