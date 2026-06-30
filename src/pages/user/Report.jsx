import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { submitReport } from '../../services/api';

const Report = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    role: 'Muadzin 1',
    reason: '',
    agreement: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await submitReport(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Gagal mengirim laporan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      date: '',
      role: 'Muadzin 1',
      reason: '',
      agreement: false
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-100 rounded-full blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-green-50 p-10 text-center relative overflow-hidden transform transition-all animate-fade-in">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-primary-500"></div>
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-8 border-4 border-green-100">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Laporan Berhasil!</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            Laporan ketidakhadiran Anda telah kami terima. Pengurus masjid akan segera meninjaunya. Terima kasih atas konfirmasinya.
          </p>
          <Button onClick={handleReset} className="w-full text-lg min-h-[56px] shadow-lg shadow-green-500/20">
            Kembali ke Formulir
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 relative animate-slide-up">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">Lapor Tidak Hadir</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Formulir pelaporan jika Anda berhalangan hadir bertugas pada jadwal yang telah ditentukan.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary-50 to-white rounded-bl-full -z-10"></div>
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary-500 to-accent-500"></div>

          <div className="mb-10 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4">
            <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={24} />
            <p className="text-blue-800 text-sm md:text-base leading-relaxed">
              Mohon isi formulir ini paling lambat <span className="font-bold">1 hari sebelum jadwal bertugas</span> agar pengurus dapat segera mencari petugas pengganti.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-lg font-bold text-slate-700 mb-3">Nama Lengkap</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                className="block w-full px-5 min-h-[56px] rounded-2xl text-lg border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="Masukkan nama lengkap..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="date" className="block text-lg font-bold text-slate-700 mb-3">Tanggal Bertugas</label>
                <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange}
                  className="block w-full px-5 min-h-[56px] rounded-2xl text-lg border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all text-slate-900" />
              </div>

              <div>
                <label htmlFor="role" className="block text-lg font-bold text-slate-700 mb-3">Tugas</label>
                <select id="role" name="role" required value={formData.role} onChange={handleChange}
                  className="block w-full px-5 min-h-[56px] rounded-2xl focus:rounded-lg text-lg border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all text-slate-900 cursor-pointer">
                  <option value="Muadzin 1">Muadzin 1</option>
                  <option value="Muadzin 2">Muadzin 2</option>
                  <option value="Khotib">Khotib</option>
                  <option value="Imam">Imam</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="block text-lg font-bold text-slate-700 mb-3">Alasan Tidak Hadir</label>
              <textarea id="reason" name="reason" rows="4" required value={formData.reason} onChange={handleChange}
                className="block w-full px-5 py-4 rounded-2xl text-lg border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all text-slate-900 resize-none placeholder:text-slate-400"
                placeholder="Jelaskan alasan berhalangan hadir secara singkat..." />
            </div>

            <div className="flex items-start bg-accent-50/50 p-5 rounded-2xl border border-accent-100 hover:bg-accent-50 transition-colors cursor-pointer group" onClick={() => setFormData(p => ({ ...p, agreement: !p.agreement }))}>
              <div className="flex items-center h-6">
                <input id="agreement" name="agreement" type="checkbox" required checked={formData.agreement} onChange={handleChange}
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 w-6 text-primary-600 rounded-md border-slate-300 focus:ring-primary-500 bg-white cursor-pointer transition-all" />
              </div>
              <div className="ml-4 text-sm md:text-base">
                <label htmlFor="agreement" className="font-semibold text-slate-700 cursor-pointer group-hover:text-slate-900 transition-colors" onClick={(e) => e.preventDefault()}>
                  Saya menyatakan bahwa data yang saya isi adalah benar dan dapat dipertanggungjawabkan.
                </label>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full text-lg min-h-[60px] rounded-2xl shadow-xl shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
              <Send size={24} className={`mr-3 ${isLoading ? 'animate-pulse' : ''}`} />
              {isLoading ? 'MEMPROSES...' : 'KIRIM LAPORAN'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
