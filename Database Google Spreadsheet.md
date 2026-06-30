# Database Google Spreadsheet - Versi 1.0

## Deskripsi

Google Spreadsheet digunakan sebagai database utama aplikasi **Jadwal Petugas Sholat Jumat Masjid Nurul Huda Kencong**.

Database ini diakses **hanya melalui Google Apps Script REST API**.

Frontend (React + Vercel) **tidak diperbolehkan** membaca ataupun menulis data langsung ke Google Spreadsheet.

---

# Nama Spreadsheet

```text
Database Jadwal Petugas Sholat Jumat
```

---

# Struktur Spreadsheet

Gunakan **1 Google Spreadsheet** yang terdiri dari beberapa Sheet berikut.

```text
📄 Jadwal
📄 Laporan
📄 Pengumuman
📄 Admin
📄 Pengaturan
📄 Log Aktivitas
```

---

# 1. Sheet Jadwal

Sheet ini **sudah tersedia** dan menjadi sumber utama jadwal petugas Jumat.

Nama Sheet

```text
Jadwal
```

Struktur tabel

| Kolom | Field     | Keterangan                       |
| ----- | --------- | -------------------------------- |
| A     | Tanggal   | Tanggal pelaksanaan Sholat Jumat |
| B     | Muadzin 1 | Nama petugas                     |
| C     | Muadzin 2 | Nama petugas                     |
| D     | Khotib    | Nama petugas                     |
| E     | Imam      | Nama petugas                     |
| F     | Status    | Aktif / Selesai / Dibatalkan     |

Contoh

| Tanggal    | Muadzin 1 | Muadzin 2 | Khotib | Imam    | Status |
| ---------- | --------- | --------- | ------ | ------- | ------ |
| 03/07/2026 | A. Purni  | Atma      | Wira   | Kersadi | Aktif  |

Keterangan Status

* Aktif
* Selesai
* Dibatalkan

---

# 2. Sheet Laporan

Nama Sheet

```text
Laporan
```

Digunakan untuk menyimpan laporan ketidakhadiran petugas.

| Kolom | Field              |
| ----- | ------------------ |
| A     | ID                 |
| B     | Tanggal Kirim      |
| C     | Nama Petugas       |
| D     | Jabatan            |
| E     | Tanggal Bertugas   |
| F     | Alasan Tidak Hadir |
| G     | Status             |
| H     | Catatan Admin      |
| I     | Tanggal Diproses   |

Status

* Menunggu
* Disetujui
* Ditolak
* Selesai

---

# 3. Sheet Pengumuman

Nama Sheet

```text
Pengumuman
```

Digunakan untuk informasi yang ditampilkan pada halaman Beranda.

| Kolom | Field            |
| ----- | ---------------- |
| A     | ID               |
| B     | Judul            |
| C     | Isi Pengumuman   |
| D     | Status           |
| E     | Tanggal Publish  |
| F     | Tanggal Berakhir |

Status

* Aktif
* Nonaktif

---

# 4. Sheet Admin

Nama Sheet

```text
Admin
```

Digunakan untuk login Dashboard Admin.

| Kolom | Field      |
| ----- | ---------- |
| A     | ID         |
| B     | Nama       |
| C     | Username   |
| D     | Password   |
| E     | Status     |
| F     | Last Login |

Status

* Aktif
* Nonaktif

Catatan

Untuk versi pertama password dapat disimpan sederhana.

Pada versi berikutnya password akan menggunakan hash agar lebih aman.

---

# 5. Sheet Pengaturan

Nama Sheet

```text
Pengaturan
```

Digunakan untuk konfigurasi website.

| Key              | Value                                           |
| ---------------- | ----------------------------------------------- |
| Nama Masjid      | Masjid Nurul Huda Kencong                       |
| Alamat           | Desa ..., Kecamatan ..., Kabupaten Lombok Utara |
| Link Google Maps | URL Google Maps                                 |
| Footer           | Remaja Masjid Nurul Huda Kencong                |
| Versi Website    | 1.0.0                                           |

---

# 6. Sheet Log Aktivitas

Nama Sheet

```text
Log Aktivitas
```

Digunakan untuk mencatat seluruh aktivitas Admin.

| Kolom | Field     |
| ----- | --------- |
| A     | Waktu     |
| B     | Aktivitas |
| C     | Detail    |

Contoh

| Waktu            | Aktivitas       | Detail               |
| ---------------- | --------------- | -------------------- |
| 29-06-2026 10:30 | Login           | Admin berhasil login |
| 29-06-2026 10:45 | Setujui Laporan | Laporan ID 5         |

---

# Relasi Data

```text
Jadwal
    │
    ├── Ditampilkan pada Website User
    ├── Digunakan untuk fitur Cari Petugas
    └── Digunakan pada Dashboard Admin

Laporan
    │
    ├── Dibuat oleh User
    └── Diproses oleh Admin

Pengumuman
    │
    ├── Dibuat oleh Admin
    └── Ditampilkan pada Halaman Beranda

Admin
    │
    └── Digunakan untuk Login Dashboard

Pengaturan
    │
    └── Digunakan untuk konfigurasi Website

Log Aktivitas
    │
    └── Menyimpan riwayat aktivitas Admin
```

---

# Alur Data

```text
Google Spreadsheet
        │
        ▼
Google Apps Script REST API
        │
        ▼
Frontend React (Vercel)
        │
        ├── User Website
        └── Admin Dashboard
```

---

# Best Practice

* Jangan mengubah nama Sheet setelah backend dibuat.
* Jangan mengubah urutan kolom tanpa memperbarui Apps Script.
* Semua data dibaca dan ditulis melalui Google Apps Script REST API.
* Jangan memberikan akses publik ke Spreadsheet.
* Lakukan backup Spreadsheet secara berkala.
* Gunakan satu Spreadsheet untuk seluruh data aplikasi agar pengelolaan lebih mudah.
* Pertahankan struktur Sheet **Jadwal** sebagai sumber data utama yang diperbarui setiap minggu oleh pengurus masjid.
