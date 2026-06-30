import React, { useState, useEffect } from 'react';
import { Bell, Calendar as CalendarIcon, Info } from 'lucide-react';
import { getAnnouncements } from '../../services/api';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        // Hanya tampilkan pengumuman yang aktif
        setAnnouncements(data.filter(a => a.isActive));
      } catch (error) {
        console.error("Gagal mengambil pengumuman:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 relative animate-slide-up">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">Pengumuman</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Informasi, kegiatan, dan agenda terbaru seputar Masjid Nurul Huda Kencong.
          </p>
        </div>

        {/* Announcement List */}
        <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {isLoading ? (
            <div className="text-center py-12 text-slate-500 font-medium">Memuat pengumuman...</div>
          ) : announcements.length > 0 ? (
            announcements.map((item) => (
              <div 
                key={item.id} 
                className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:-translate-y-1 transition-all duration-300 group z-10"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary-50 to-white rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary-500 to-accent-500"></div>

                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="flex-shrink-0 bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl shadow-inner mb-4 sm:mb-0">
                    <Bell className="h-8 w-8 text-primary-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    {item.date && (
                      <div className="inline-flex items-center text-sm font-semibold bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full mb-5">
                        <CalendarIcon size={16} className="mr-2 text-primary-500" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    
                    <p className="text-slate-600 text-lg leading-relaxed text-justify">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-50 rounded-full blur-2xl -z-10"></div>
              <Info className="mx-auto h-16 w-16 text-slate-300 mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Belum ada pengumuman</h3>
              <p className="text-lg text-slate-500">Saat ini tidak ada informasi atau agenda terbaru yang diterbitkan.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Announcement;
