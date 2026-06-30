import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X } from 'lucide-react';
import { getReports, updateReportStatus } from '../../services/api';

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminNote, setAdminNote] = useState('');

  React.useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error("Gagal mengambil laporan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, note = '') => {
    try {
      await updateReportStatus(id, status, note);
      fetchReports(); // Refresh data
      setIsModalOpen(false);
      setSelectedReport(null);
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setAdminNote(report.adminNote || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Menunggu': return 'bg-amber-100 text-amber-800';
      case 'Disetujui': return 'bg-emerald-100 text-emerald-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laporan Tidak Hadir</h1>
          <p className="text-slate-600">Kelola persetujuan laporan petugas.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari nama, ID, atau tugas..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors w-full md:w-auto justify-center">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                <th className="p-4 whitespace-nowrap">ID</th>
                <th className="p-4 whitespace-nowrap">Tgl Kirim</th>
                <th className="p-4 whitespace-nowrap">Nama Petugas</th>
                <th className="p-4 whitespace-nowrap">Tugas</th>
                <th className="p-4 whitespace-nowrap">Tgl Bertugas</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-900 whitespace-nowrap">{report.id}</td>
                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{report.submittedAt}</td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-slate-900 whitespace-nowrap">{report.name}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700 whitespace-nowrap">{report.role}</td>
                  <td className="p-4 text-sm text-slate-700 whitespace-nowrap">{report.dutyDate}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => openModal(report)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                      {report.status === 'Menunggu' && (
                        <>
                          <button onClick={() => handleUpdateStatus(report.id, 'Disetujui')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Setujui">
                            <Check size={18} />
                          </button>
                          <button onClick={() => handleUpdateStatus(report.id, 'Ditolak')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Tolak">
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span>Menampilkan {reports.length} laporan</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Sblm</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg bg-primary-50 text-primary-600 font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Lnjt</button>
          </div>
        </div>
      </div>

      {/* Modal Detail Laporan */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Detail Laporan</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Nama Petugas</p>
                  <p className="font-bold text-slate-900">{selectedReport.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Tugas</p>
                  <p className="font-medium text-slate-700">{selectedReport.role}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Tanggal Bertugas</p>
                  <p className="font-medium text-slate-700">{selectedReport.dutyDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Alasan Ketidakhadiran</p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed">
                  {selectedReport.reason || 'Tidak ada alasan.'}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Catatan Admin</p>
                <textarea 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  rows="3"
                  placeholder="Tambahkan catatan jika perlu (misal: Silakan cari pengganti...)"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex flex-wrap justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => handleUpdateStatus(selectedReport.id, 'Disetujui', adminNote)}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium transition-colors shadow-sm shadow-emerald-500/20"
              >
                Setujui
              </button>
              <button 
                onClick={() => handleUpdateStatus(selectedReport.id, 'Ditolak', adminNote)}
                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-colors shadow-sm shadow-red-500/20"
              >
                Tolak
              </button>
              <button 
                onClick={closeModal}
                className="px-6 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
