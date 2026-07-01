import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, MapPin, Users, Server, Bell, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import ScheduleCard from '../../components/cards/ScheduleCard';
import { getScheduleThisWeek, getScheduleNextWeek, getActiveSchedule } from '../../services/api';

const Home = () => {
  const navigate = useNavigate();
  const scheduleRef = useRef(null);
  const [scheduleThisWeek, setScheduleThisWeek] = useState(null);
  const [scheduleNextWeek, setScheduleNextWeek] = useState(null);
  const [allSchedules, setAllSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        const [thisWeek, nextWeek, allData] = await Promise.all([
          getScheduleThisWeek(),
          getScheduleNextWeek(),
          getActiveSchedule()
        ]);
        setScheduleThisWeek(thisWeek);
        setScheduleNextWeek(nextWeek);
        setAllSchedules(allData);
      } catch (error) {
        console.error("Gagal memuat jadwal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const scrollToSchedule = () => {
    scheduleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center px-4 overflow-hidden shadow-xl shadow-slate-200/20 animate-fade-in">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/poto-masjid.png')" }}
        ></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>

        <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center animate-slide-up px-2" style={{ animationDelay: '0.2s' }}>
          {/* Welcome Text */}
          <p className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2 text-white tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Selamat Datang di
          </p>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-3 leading-tight text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Jadwal Petugas Sholat Jumat
          </h1>

          {/* Subtitle (Mosque Name) */}
          <p className="text-lg sm:text-2xl md:text-3xl font-black tracking-widest uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Masjid Nurul Huda Kencong
          </p>
        </div>
      </section>


      {/* Schedule Section */}
      <section ref={scheduleRef} id="jadwal-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-12 pt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>

        {/* Intro Text */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">Informasi Jadwal</h2>
          <p className="text-lg text-slate-600 leading-relaxed text-justify">
            Berikut adalah jadwal resmi petugas Sholat Jumat di Masjid Nurul Huda Kencong.
            Data ini dipublikasikan oleh pengurus masjid untuk memudahkan para jamaah dan petugas.
            Mohon bagi petugas yang terjadwal agar dapat hadir lebih awal.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
            <p className="text-lg text-slate-500 font-medium">Memuat jadwal terbaru...</p>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary-500 pl-4">Jadwal Minggu Ini</h2>
              {scheduleThisWeek ? (
                <ScheduleCard
                  title="Minggu Ini"
                  date={scheduleThisWeek.tanggal || "Belum ditentukan"}
                  schedule={{
                    date: scheduleThisWeek.tanggal,
                    khotib: scheduleThisWeek.khotib,
                    imam: scheduleThisWeek.imam,
                    muadzin1: scheduleThisWeek.muadzin1,
                    muadzin2: scheduleThisWeek.muadzin2
                  }}
                />
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center text-slate-500 shadow-sm">Belum ada jadwal untuk minggu ini.</div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-secondary-500 pl-4">Jadwal Minggu Depan</h2>
              {scheduleNextWeek ? (
                <ScheduleCard
                  title="Minggu Depan"
                  date={scheduleNextWeek.tanggal || "Belum ditentukan"}
                  isNextWeek={true}
                  schedule={{
                    date: scheduleNextWeek.tanggal,
                    khotib: scheduleNextWeek.khotib,
                    imam: scheduleNextWeek.imam,
                    muadzin1: scheduleNextWeek.muadzin1,
                    muadzin2: scheduleNextWeek.muadzin2
                  }}
                />
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center text-slate-500 shadow-sm">Belum ada jadwal untuk minggu depan.</div>
              )}
            </div>
          </>
        )}

        {/* All Schedules Table Section */}
        <div className="pt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-4 tracking-tight uppercase">Jadwal Jumat 2026</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4 leading-relaxed">
              Berikut adalah jadwal resmi petugas Sholat Jumat di Masjid Nurul Huda Kencong. Data ini dipublikasikan oleh pengurus masjid untuk memudahkan para jamaah dan petugas.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500">Memuat tabel jadwal...</div>
            ) : allSchedules.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Tidak ada jadwal tersedia.</div>
            ) : (
              <div className="overflow-x-auto w-full pb-2">
                <table className="w-full min-w-max text-left border-collapse">
                  <thead>
                    <tr className="bg-primary-50 border-b border-primary-100 text-base sm:text-lg md:text-xl font-extrabold text-primary-900 uppercase tracking-wider">
                      <th className="p-3 sm:p-4 md:p-5 whitespace-nowrap">Tanggal</th>
                      <th className="p-3 sm:p-4 md:p-5 whitespace-nowrap">Muadzin I</th>
                      <th className="p-3 sm:p-4 md:p-5 whitespace-nowrap">Muadzin II</th>
                      <th className="p-3 sm:p-4 md:p-5 whitespace-nowrap">Khotib</th>
                      <th className="p-3 sm:p-4 md:p-5 whitespace-nowrap">Imam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allSchedules.map((item, index) => (
                      <tr key={index} className="hover:bg-primary-900 group transition-colors duration-300">
                        <td className="p-3 sm:p-4 md:p-5 text-sm sm:text-base font-bold text-primary-900 group-hover:text-white whitespace-nowrap transition-colors">{item.tanggal}</td>
                        <td className="p-3 sm:p-4 md:p-5 text-sm sm:text-base font-bold text-primary-900 group-hover:text-white whitespace-nowrap transition-colors">{item.muadzin1}</td>
                        <td className="p-3 sm:p-4 md:p-5 text-sm sm:text-base font-bold text-primary-900 group-hover:text-white whitespace-nowrap transition-colors">{item.muadzin2}</td>
                        <td className="p-3 sm:p-4 md:p-5 text-sm sm:text-base font-bold text-primary-900 group-hover:text-white whitespace-nowrap transition-colors">{item.khotib}</td>
                        <td className="p-3 sm:p-4 md:p-5 text-sm sm:text-base font-bold text-primary-900 group-hover:text-white whitespace-nowrap transition-colors">{item.imam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>



    </div>
  );
};

export default Home;
