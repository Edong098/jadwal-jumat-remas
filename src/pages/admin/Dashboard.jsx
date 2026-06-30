import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bell 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatCard = ({ title, value, gradientClass }) => (
  <div className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center text-white bg-gradient-to-br ${gradientClass} transition-all hover:-translate-y-1 hover:shadow-xl duration-300`}>
    <p className="text-sm font-semibold opacity-90 mb-1 tracking-wider uppercase">{title}</p>
    <h3 className="text-4xl font-extrabold drop-shadow-sm">{value}</h3>
  </div>
);

import { getDashboardStats } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      }
    };
    fetchStats();
  }, []);

  // Chart Data
  const data = {
    labels: stats?.chartLabels || ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Total Laporan',
        data: stats?.chartData || [0, 0, 0, 0, 0, 0],
        borderColor: '#10b981', // Emerald 500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Ringkasan data operasional bulan ini.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Total Laporan" 
          value={stats?.totalReports || 0} 
          gradientClass="from-blue-500 to-indigo-600"
        />
        <StatCard 
          title="Menunggu" 
          value={stats?.pending || 0} 
          gradientClass="from-amber-400 to-orange-500"
        />
        <StatCard 
          title="Disetujui" 
          value={stats?.approved || 0} 
          gradientClass="from-emerald-400 to-teal-500"
        />
        <StatCard 
          title="Ditolak" 
          value={stats?.rejected || 0} 
          gradientClass="from-rose-500 to-red-600"
        />
        <StatCard 
          title="Pengumuman Aktif" 
          value={stats?.activeAnnouncements || 0} 
          gradientClass="from-purple-500 to-fuchsia-600"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Tren Laporan Ketidakhadiran</h3>
          <p className="text-sm text-slate-500">Jumlah laporan yang masuk setiap bulan.</p>
        </div>
        <div className="h-80 w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
