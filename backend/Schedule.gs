/**
 * Modul Jadwal
 */

function getSchedule() {
  // Mengambil jadwal minggu ini dari Spreadsheet
  // Dibuat mock data sementara
  const schedule = {
    date: "14 Agustus 2026",
    khotib: "Ust. Abdullah Syafii",
    imam: "Ust. Abdullah Syafii",
    muadzin1: "Bpk. Budi Santoso",
    muadzin2: "Sdr. Ahmad Yani"
  };
  
  return jsonResponse(schedule, true, "Berhasil mengambil jadwal");
}

function getNextSchedule() {
  const schedule = {
    date: "21 Agustus 2026",
    khotib: "KH. Hasan Basri",
    imam: "KH. Hasan Basri",
    muadzin1: "Bpk. Rahmat Hidayat",
    muadzin2: "Sdr. Ilham Wahyudi"
  };
  
  return jsonResponse(schedule, true, "Berhasil mengambil jadwal minggu depan");
}

function searchSchedule(name) {
  if (!name) return jsonResponse([], false, "Nama tidak boleh kosong");
  
  // Mencari nama di seluruh sheet Jadwal
  const results = [
    {
      date: "14 Agustus 2026",
      role: "Muadzin 1",
      status: "Minggu Ini"
    }
  ];
  
  return jsonResponse(results, true, "Pencarian selesai");
}

function getAllSchedule() {
  // Mengambil semua baris jadwal
  return jsonResponse([], true, "Berhasil mengambil semua jadwal");
}

function getScheduleByDate(date) {
  // Filter berdasarkan tanggal
  return jsonResponse(null, true, "Pencarian jadwal berdasarkan tanggal");
}
