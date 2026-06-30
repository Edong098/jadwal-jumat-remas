# Aplikasi Jadwal Petugas Sholat Jumat 🕌

Aplikasi berbasis web modern untuk memudahkan manajemen penjadwalan petugas Sholat Jumat dan pelaporan ketidakhadiran di Masjid Nurul Huda. 

Aplikasi ini dibangun menggunakan **React** untuk tampilan *(frontend)* dan menggunakan **Google Sheets** sebagai *database* sekaligus *backend* melalui integrasi Google Apps Script (GAS). Hal ini memungkinkan operasional tanpa biaya server *(serverless & zero-cost)*.

---

## 🎯 Fitur Utama

Aplikasi ini dibagi menjadi dua portal dalam satu sistem *(Single Page Application)*:

### 1. Portal Jamaah / Petugas (Publik)
- **Beranda (Jadwal Otomatis):** Menampilkan jadwal petugas Sholat Jumat "Minggu Ini" dan "Minggu Depan" yang otomatis bergeser tanpa perlu campur tangan admin. Juga menampilkan kalender jadwal setahun penuh.
- **Pengumuman Masjid:** Menampilkan informasi terbaru mengenai agenda masjid. Pengumuman memiliki fitur "Auto-Expire" di mana pengumuman yang lewat masa berlakunya akan otomatis turun dari layar utama.
- **Pencarian Petugas:** Fitur pencarian canggih untuk mencari jadwal spesifik berdasarkan nama petugas.
- **Lapor Ketidakhadiran:** Formulir untuk petugas yang berhalangan hadir. Laporan langsung masuk ke dashboard admin.

### 2. Portal Admin (Privat)
Dapat diakses melalui URL `/admin/login` dengan sistem keamanan kata sandi.
- **Dashboard Statistik:** Menampilkan jumlah total laporan masuk, laporan yang menunggu, disetujui, dan ditolak.
- **Manajemen Jadwal:** Melihat rekap jadwal aktif. (Perubahan data inti dilakukan langsung di Google Sheets demi kepraktisan).
- **Kelola Pengumuman:** Menambah, mengubah, atau menghapus pengumuman serta mengatur "Tanggal Berakhir" tayang.
- **Kelola Laporan:** Memproses (menyetujui/menolak) laporan ketidakhadiran petugas.
- **Pengaturan & Profil:** Mengatur profil masjid, nama admin, kata sandi, serta mengubah tautan integrasi Google Sheets.

---

## 🛠 Teknologi yang Digunakan

- **Frontend:** React.js, Vite, React Router DOM
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Backend & Database:** Google Apps Script (GAS) & Google Spreadsheet
- **Deployment:** Vercel (Frontend)

---



*Dibuat untuk Masjid Nurul Huda Kencong.*
