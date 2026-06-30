import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Calendar, 
  BarChart2, 
  User, 
  Settings,
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Laporan Tidak Hadir', path: '/admin/reports', icon: FileText },
    { name: 'Pengumuman', path: '/admin/announcement', icon: Bell },
    { name: 'Jadwal Aktif', path: '/admin/schedule', icon: Calendar },
    { name: 'Statistik', path: '/admin/statistics', icon: BarChart2 },
    { name: 'Profil Admin', path: '/admin/profile', icon: User },
    { name: 'Pengaturan', path: '/admin/settings', icon: Settings },
  ];

  const confirmLogout = () => {
    // Hapus sesi dari localStorage
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminName');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col flex-shrink-0 shadow-xl lg:shadow-none">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <img className="h-8 w-8 rounded-full object-cover shadow-sm border border-slate-200" src="/logo.jpeg" alt="Logo Masjid" />
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">Admin<span className="text-primary-600">Panel</span></span>
          </div>
          {/* Tombol Close untuk Mobile/Tablet */}
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          )}
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <Icon size={20} className={`mr-3 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            <LogOut size={20} className="mr-3 flex-shrink-0 text-red-500" />
            Logout
          </button>
        </div>
      </div>

      {/* Floating Alert Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-[90%] max-w-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <LogOut size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Konfirmasi Keluar</h3>
              <p className="text-slate-500 text-sm">
                Apakah Anda yakin ingin keluar dari halaman Admin?
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
