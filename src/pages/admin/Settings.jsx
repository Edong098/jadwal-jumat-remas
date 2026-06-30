import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, CheckCircle, MapPin, Phone, Info, Link as LinkIcon } from 'lucide-react';
import { getSettings, updateSettings } from '../../services/api';

const Settings = () => {
  const [settingsData, setSettingsData] = useState({
    mosqueName: '',
    address: '',
    phone: '',
    description: '',
    spreadsheetUrl: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettingsData(data);
      } catch (error) {
        console.error("Gagal mengambil pengaturan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);
    try {
      await updateSettings(settingsData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      alert("Gagal menyimpan pengaturan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Dasar</h1>
        <p className="text-slate-600">Konfigurasi informasi masjid dan aplikasi.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-100">
            <SettingsIcon size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Identitas Masjid</h2>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Memuat pengaturan...</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Info size={16} className="text-slate-400" /> Nama Masjid
                </label>
                <input 
                  type="text" 
                  name="mosqueName"
                  required
                  value={settingsData.mosqueName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" 
                  placeholder="Contoh: Masjid Agung..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Phone size={16} className="text-slate-400" /> Kontak Pengurus (Opsional)
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={settingsData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" 
                  placeholder="Contoh: 0812..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" /> Alamat Lengkap
                </label>
                <textarea 
                  name="address"
                  required
                  rows="2"
                  value={settingsData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm resize-none" 
                  placeholder="Tulis alamat lengkap masjid..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Slogan / Deskripsi Singkat</label>
                <textarea 
                  name="description"
                  rows="2"
                  value={settingsData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm resize-none" 
                  placeholder="Deskripsi singkat..."
                ></textarea>
              </div>


            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 mt-8 gap-4">
            <p className="text-sm text-slate-500 order-2 sm:order-1">Perubahan akan langsung terlihat di aplikasi.</p>
            <div className="flex items-center gap-4 order-1 sm:order-2 w-full sm:w-auto justify-end">
              {isSuccess && (
                <span className="flex items-center text-sm font-medium text-emerald-600 animate-fade-in bg-emerald-50 px-4 py-2 rounded-xl">
                  <CheckCircle size={18} className="mr-2" /> Disimpan
                </span>
              )}
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold transition-all disabled:opacity-70 shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <Save size={20} className="mr-2" />
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
