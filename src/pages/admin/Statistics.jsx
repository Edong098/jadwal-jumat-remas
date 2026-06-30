import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { getDashboardStats, getReports } from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [statsData, reportsData] = await Promise.all([
          getDashboardStats(),
          getReports()
        ]);
        setStats(statsData);
        setReports(reportsData);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Prepare data for Role Doughnut Chart
  const roleCount = reports.reduce((acc, curr) => {
    const role = curr.role || 'Lainnya';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for Status Pie Chart
  // Urutkan status yang spesifik agar warnanya konsisten: Menunggu, Disetujui, Ditolak
  const statusMap = {
    'Menunggu': 0,
    'Disetujui': 0,
    'Ditolak': 0
  };
  reports.forEach(r => {
    if (statusMap[r.status] !== undefined) {
      statusMap[r.status]++;
    } else {
      statusMap[r.status] = 1;
    }
  });

  const barData = {
    labels: stats?.chartLabels || [],
    datasets: [
      {
        label: 'Jumlah Laporan Masuk',
        data: stats?.chartData || [],
        backgroundColor: 'rgba(16, 185, 129, 0.85)', // Emerald 500
        borderRadius: 8,
        barThickness: 32,
      }
    ]
  };

  const doughnutData = {
    labels: Object.keys(roleCount),
    datasets: [
      {
        data: Object.values(roleCount),
        backgroundColor: [
          '#3b82f6', // blue-500
          '#f59e0b', // amber-500
          '#8b5cf6', // violet-500
          '#10b981', // emerald-500
        ],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const pieData = {
    labels: Object.keys(statusMap),
    datasets: [
      {
        data: Object.values(statusMap),
        backgroundColor: [
          '#f59e0b', // Menunggu (amber)
          '#10b981', // Disetujui (emerald)
          '#ef4444', // Ditolak (red)
        ],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        cornerRadius: 8
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        },
        ticks: {
          font: { family: "'Inter', sans-serif" },
          stepSize: 2
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: { family: "'Inter', sans-serif" }
        }
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Statistik Laporan</h1>
        <p className="text-slate-600">Analisis visual data ketidakhadiran petugas.</p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Memuat grafik statistik...</p>
        </div>
      ) : (
        <div className="space-y-6 animate-slide-up">
          {/* Top Row: Full Width Bar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Tren Laporan Bulanan</h3>
              <p className="text-slate-500 text-sm">Distribusi jumlah laporan masuk dalam 6 bulan terakhir</p>
            </div>
            <div className="h-80 w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Bottom Row: 2 Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 text-center">Laporan Berdasarkan Tugas</h3>
              </div>
              <div className="h-[280px] w-full flex justify-center">
                <Doughnut data={doughnutData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 text-center">Rasio Persetujuan Laporan</h3>
              </div>
              <div className="h-[280px] w-full flex justify-center">
                <Pie data={pieData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
