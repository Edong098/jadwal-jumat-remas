import React, { useState, useEffect } from 'react';
import { getActiveSchedule } from '../../services/api';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getActiveSchedule();
        setSchedule(data);
      } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <div>
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jadwal Aktif</h1>
          <p className="text-slate-600">Lihat jadwal yang sedang digunakan.</p>
        </div>
        <a 
          href="https://docs.google.com/spreadsheets/d/1KoRMYdqLuc1dr4IYXouZlOnBa1_8eot_ZSc2w5S7Il4/edit?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium whitespace-nowrap"
        >
          Buka Spreadsheet
        </a>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Memuat jadwal...</div>
        ) : schedule.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Tidak ada jadwal aktif.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="p-4 whitespace-nowrap">Tanggal</th>
                  <th className="p-4 whitespace-nowrap">Muadzin I</th>
                  <th className="p-4 whitespace-nowrap">Muadzin II</th>
                  <th className="p-4 whitespace-nowrap">Khotib</th>
                  <th className="p-4 whitespace-nowrap">Imam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-slate-900 whitespace-nowrap">{item.tanggal}</td>
                    <td className="p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{item.muadzin1}</td>
                    <td className="p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{item.muadzin2}</td>
                    <td className="p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{item.khotib}</td>
                    <td className="p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{item.imam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
