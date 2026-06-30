/**
 * Modul Pengaturan Situs
 */

function getSettings() {
  // Ambil baris konfigurasi dari Sheet Pengaturan
  const settings = {
    namaMasjid: "Masjid Nurul Huda Kencong",
    alamat: "Desa Kencong, Kecamatan Tanjung",
    kabupaten: "Lombok Utara",
    provinsi: "Nusa Tenggara Barat",
    whatsapp: "+62 812-3456-7890",
    mapsUrl: "https://www.google.com/maps/embed?pb=...",
    version: "1.0.0"
  };
  
  return jsonResponse(settings, true, "Pengaturan berhasil dimuat");
}
