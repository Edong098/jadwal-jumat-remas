import React, { useState } from 'react';
import { User, Lock, Save, CheckCircle } from 'lucide-react';
import { updateProfile } from '../../services/api';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Administrator',
    username: 'admin',
    email: 'admin@nurulhuda.com'
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSuccess(false);
    
    try {
      await updateProfile({
        type: 'profile',
        username: profileData.username,
        name: profileData.name
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
      
      // Update nama di localStorage/session jika ada
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        userData.name = profileData.name;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (err) {
      alert(err.message || 'Gagal menyimpan profil');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Kata sandi baru dan konfirmasi tidak cocok!");
      return;
    }
    
    setIsSavingPassword(true);
    setPasswordSuccess(false);
    
    try {
      await updateProfile({
        type: 'password',
        username: profileData.username,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordSuccess(true);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      alert(err.message || 'Gagal memperbarui sandi');
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Profil Admin</h1>
        <p className="text-slate-600">Kelola informasi akun dan keamanan pengurus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                <User size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Informasi Pribadi</h2>
            </div>
            
            <form onSubmit={saveProfile} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                  <input 
                    type="text" 
                    name="username"
                    required
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 focus:ring-0 cursor-not-allowed outline-none" 
                    disabled
                  />
                  <p className="text-xs text-slate-500 mt-1.5">Username tidak dapat diubah.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Alamat Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 mt-2">
                <button 
                  type="submit"
                  disabled={isSavingProfile}
                  className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium transition-colors disabled:opacity-70 shadow-sm shadow-primary-500/20"
                >
                  <Save size={18} className="mr-2" />
                  {isSavingProfile ? 'Menyimpan...' : 'Simpan Profil'}
                </button>
                {profileSuccess && (
                  <span className="flex items-center text-sm font-medium text-emerald-600 animate-fade-in bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <CheckCircle size={16} className="mr-1.5" /> Tersimpan
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Lock size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Ubah Kata Sandi</h2>
            </div>
            
            <form onSubmit={savePassword} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kata Sandi Saat Ini</label>
                <input 
                  type="password" 
                  name="oldPassword"
                  required
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    required
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Konfirmasi Sandi Baru</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    required
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 mt-2">
                <button 
                  type="submit"
                  disabled={isSavingPassword}
                  className="flex items-center px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium transition-colors disabled:opacity-70 shadow-sm shadow-slate-900/20"
                >
                  <Lock size={18} className="mr-2" />
                  {isSavingPassword ? 'Menyimpan...' : 'Perbarui Sandi'}
                </button>
                {passwordSuccess && (
                  <span className="flex items-center text-sm font-medium text-emerald-600 animate-fade-in bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <CheckCircle size={16} className="mr-1.5" /> Sandi diperbarui
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-lg p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-0"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-tr-full -z-0"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-5 backdrop-blur-sm border border-white/30 shadow-inner">
                <User size={48} className="text-white drop-shadow-md" />
              </div>
              <h3 className="text-2xl font-bold drop-shadow-sm">{profileData.name}</h3>
              <p className="text-primary-100 text-sm mt-1.5 font-medium">@{profileData.username}</p>
              
              <div className="mt-8 pt-6 border-t border-white/20 text-left bg-black/10 rounded-xl p-4">
                <p className="text-xs text-primary-200 uppercase tracking-wider font-bold mb-1">Hak Akses</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <p className="font-semibold text-sm">Administrator Penuh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
