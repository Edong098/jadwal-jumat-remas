/**
 * Modul Pengumuman
 */

function getAnnouncement() {
  // Ambil pengumuman yang statusnya aktif dari Sheet Pengumuman
  const activeAnnouncement = {
    title: "Kerja Bakti Rutin",
    content: "Menjelang bulan suci Ramadhan, akan diadakan kerja bakti membersihkan lingkungan masjid pada hari Minggu, 20 Agustus 2026 mulai pukul 07.00 WIB."
  };
  
  return jsonResponse(activeAnnouncement, true, "Berhasil memuat pengumuman");
}

function addAnnouncement(data) {
  // Logika untuk menambah baris pengumuman
  return jsonResponse(null, true, "Pengumuman berhasil ditambahkan");
}

function updateAnnouncement(id, data) {
  // Logika update pengumuman berdasarkan ID
  return jsonResponse(null, true, "Pengumuman berhasil diubah");
}

function deleteAnnouncement(id) {
  // Logika menghapus/menonaktifkan pengumuman
  return jsonResponse(null, true, "Pengumuman berhasil dihapus");
}
