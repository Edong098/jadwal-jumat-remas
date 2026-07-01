import React, { useState, useEffect, useMemo } from 'react';
import { Search as SearchIcon, User, Calendar, Tag, Clock, Loader2 } from 'lucide-react';
import { getActiveSchedule } from '../../services/api';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [officers, setOfficers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessSchedules = async () => {
      setIsLoading(true);
      try {
        const schedules = await getActiveSchedule();
        const processed = [];
        let idCounter = 1;

        const pushRole = (name, role, time, date, status) => {
          if (name && name.trim() !== "") {
            processed.push({ name, role, date, time, status });
          }
        };

        schedules.forEach((schedule, index) => {
          let statusLabel = "Jadwal Mendatang";
          if (index === 0) statusLabel = "Minggu Ini";
          else if (index === 1) statusLabel = "Minggu Depan";

          // Cek Khotib dan Imam (jika sama, gabung)
          if (schedule.khotib === schedule.imam && schedule.khotib) {
            pushRole(schedule.khotib, "Khotib & Imam", "11:30 WIB", schedule.tanggal, statusLabel);
          } else {
            pushRole(schedule.khotib, "Khotib", "11:30 WIB", schedule.tanggal, statusLabel);
            pushRole(schedule.imam, "Imam", "11:30 WIB", schedule.tanggal, statusLabel);
          }

          pushRole(schedule.muadzin1, "Muadzin I", "11:30 WIB", schedule.tanggal, statusLabel);
          pushRole(schedule.muadzin2, "Muadzin II", "11:30 WIB", schedule.tanggal, statusLabel);
        });

        // Grouping berdasarkan Nama dan Tugas
        const grouped = {};
        processed.forEach(item => {
          const key = `${item.name.toLowerCase()}-${item.role}`;
          if (!grouped[key]) {
            grouped[key] = {
              id: idCounter++,
              name: item.name,
              role: item.role,
              time: item.time,
              schedules: []
            };
          }
          grouped[key].schedules.push({ date: item.date, status: item.status });
        });

        setOfficers(Object.values(grouped));
      } catch (error) {
        console.error("Gagal memuat jadwal untuk pencarian:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndProcessSchedules();
  }, []);

  const filteredData = useMemo(() => {
    if (searchQuery.trim() === '') return [];
    return officers.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, officers]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 animate-slide-up">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">Cari Petugas</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Temukan jadwal bertugas Anda dengan cepat dan mudah melalui sistem pencarian kami.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mb-12 group z-10">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <SearchIcon className="h-7 w-7 text-primary-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-6 py-3 min-h-[45px] text-base border-0 ring-2 ring-inset ring-primary-700 rounded-full shadow-xl shadow-slate-200/50 text-slate-900 bg-white placeholder:text-slate-400 outline-none"
            placeholder="Ketikkan nama petugas di sini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        {searchQuery.trim() !== '' && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
                <p className="text-slate-500">Mempersiapkan data petugas...</p>
              </div>
            ) : (
              <>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">
                  Menampilkan {filteredData.length} Hasil Pencarian
                </h3>

                {filteredData.length > 0 ? (
                  filteredData.map(item => (
                    <div key={item.id} className="relative bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

                      {/* Dekorasi Card */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>

                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-primary-100 p-2.5 rounded-xl border border-primary-200">
                            <User size={24} className="text-primary-700" />
                          </div>
                          <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors tracking-tight">
                            {item.name}
                          </h4>
                        </div>

                        <div className="flex flex-col gap-4 mt-4 w-full">
                          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-slate-700">
                            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                              <Tag size={18} className="text-primary-500" />
                              <span className="font-semibold">{item.role}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                              <Clock size={18} className="text-primary-500" />
                              <span className="font-semibold">Hadir {item.time}</span>
                            </div>
                          </div>

                          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Daftar Jadwal Bertugas</p>
                            <div className="flex flex-wrap gap-2">
                              {item.schedules.map((sch, i) => (
                                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold shadow-sm transition-transform hover:scale-105 ${sch.status === 'Minggu Ini'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-emerald-500/10'
                                  : sch.status === 'Minggu Depan'
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-indigo-500/10'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-600'
                                  }`}>
                                  <Calendar size={16} className={sch.status === 'Minggu Ini' ? 'text-emerald-500' : sch.status === 'Minggu Depan' ? 'text-indigo-500' : 'text-slate-400'} />
                                  <span>{sch.date}</span>
                                  {sch.status !== 'Jadwal Mendatang' && (
                                    <span className="text-xs bg-white/60 px-2 py-0.5 rounded-md ml-1 opacity-90">{sch.status}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-50 rounded-full blur-2xl -z-10"></div>
                    <SearchIcon className="mx-auto h-16 w-16 text-slate-300 mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Nama tidak ditemukan</h3>
                    <p className="text-lg text-slate-500">Silakan periksa ejaan nama atau cari dengan kata kunci lain.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
