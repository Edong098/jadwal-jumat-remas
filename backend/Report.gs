/**
 * Modul Laporan Tidak Hadir
 */

function submitReport(data) {
  try {
    const reportId = generateID("RPT");
    const submittedAt = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");
    
    // Logika menambah row ke Sheet Laporan
    // sheet.appendRow([reportId, submittedAt, data.name, data.role, data.date, data.reason, "Menunggu", "", ""]);
    
    return jsonResponse({ reportId: reportId }, true, "Laporan berhasil dikirim");
  } catch (error) {
    return jsonResponse(null, false, "Gagal mengirim laporan: " + error.message);
  }
}

function getReports() {
  // Ambil data laporan dari Sheet
  const reports = [
    {
      id: "RPT-12345",
      submittedAt: "2026-07-10 14:00",
      name: "Bpk. Budi Santoso",
      role: "Muadzin",
      dutyDate: "2026-07-12",
      reason: "Tugas luar kota.",
      status: "Menunggu"
    }
  ];
  return jsonResponse(reports, true, "Berhasil memuat laporan");
}

function getReportById(id) {
  // Cari laporan spesifik berdasarkan ID
  return jsonResponse(null, true, "Berhasil mendapatkan detail laporan");
}

function approveReport(id, adminName) {
  // Logika ubah status menjadi 'Disetujui' di kolom Status
  logActivity(adminName, "APPROVE_REPORT", "Menyetujui laporan " + id);
  return jsonResponse(null, true, "Laporan berhasil disetujui");
}

function rejectReport(id, note, adminName) {
  // Logika ubah status menjadi 'Ditolak' di kolom Status dan simpan catatan
  logActivity(adminName, "REJECT_REPORT", "Menolak laporan " + id);
  return jsonResponse(null, true, "Laporan telah ditolak");
}

function updateReportStatus(id, status) {
  return jsonResponse(null, true, "Status berhasil diperbarui");
}

function saveAdminNote(id, note) {
  return jsonResponse(null, true, "Catatan berhasil disimpan");
}

function countMonthlyReport() {
  // Hitung jumlah laporan berdasarkan bulan
  return [];
}
