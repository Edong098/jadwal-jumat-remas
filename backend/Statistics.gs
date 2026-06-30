/**
 * Modul Statistik Dashboard
 */

function getDashboardStatistic() {
  const stats = {
    totalLaporan: countReport(),
    menunggu: countReportByStatus("Menunggu"),
    disetujui: countReportByStatus("Disetujui"),
    ditolak: countReportByStatus("Ditolak"),
    pengumumanAktif: 1,
    chartData: reportPerMonth()
  };
  
  return jsonResponse(stats, true, "Statistik berhasil dimuat");
}

function countReport() {
  // Hitung jumlah baris di Sheet Laporan
  return 12; // Mock
}

function countReportByStatus(status) {
  // Hitung jumlah laporan berdasarkan status
  if (status === "Menunggu") return 3;
  if (status === "Disetujui") return 8;
  if (status === "Ditolak") return 1;
  return 0;
}

function countUser() {
  // Hitung total petugas dari Sheet Jadwal atau database relasi
  return 45;
}

function countSchedule() {
  // Hitung jumlah jadwal terdaftar
  return 52;
}

function reportPerMonth() {
  // Generate data per bulan untuk Chart.js
  return [5, 8, 3, 10, 6, 12];
}
