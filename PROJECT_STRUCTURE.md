# Project Structure

# Website Jadwal Petugas Sholat Jumat

Frontend menggunakan React + Vite + Tailwind CSS.

Backend menggunakan Google Apps Script REST API.

Database menggunakan Google Spreadsheet.

Deploy menggunakan Vercel.

---

# Folder Structure

```text
jadwal-petugas-jumat/

│
├── public/
│   ├── favicon.ico
│   ├── logo-masjid.png
│   └── images/
│
├── src/
│
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Hamburger.jsx
│   │   │
│   │   ├── cards/
│   │   │   ├── ScheduleCard.jsx
│   │   │   ├── AnnouncementCard.jsx
│   │   │   ├── ReportCard.jsx
│   │   │   └── StatisticCard.jsx
│   │   │
│   │   ├── forms/
│   │   │   ├── ReportForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── SearchForm.jsx
│   │   │
│   │   ├── tables/
│   │   │   ├── ReportTable.jsx
│   │   │   ├── ScheduleTable.jsx
│   │   │   └── AdminTable.jsx
│   │   │
│   │   ├── modal/
│   │   │   ├── DetailReportModal.jsx
│   │   │   └── ConfirmModal.jsx
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Select.jsx
│   │       ├── Badge.jsx
│   │       ├── Loading.jsx
│   │       └── Toast.jsx
│   │
│   ├── pages/
│   │
│   │   ├── user/
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Report.jsx
│   │   │   ├── Announcement.jsx
│   │   │   └── About.jsx
│   │   │
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Reports.jsx
│   │       ├── Schedule.jsx
│   │       ├── Announcement.jsx
│   │       ├── Statistics.jsx
│   │       ├── Settings.jsx
│   │       └── Profile.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── scheduleService.js
│   │   ├── reportService.js
│   │   ├── announcementService.js
│   │   └── statisticService.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useSchedule.js
│   │   ├── useReports.js
│   │   └── useAnnouncement.js
│   │
│   ├── utils/
│   │   ├── formatter.js
│   │   ├── validator.js
│   │   ├── constants.js
│   │   └── helper.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

# Routing

Public

/

Home

/search

Cari Petugas

/report

Lapor Tidak Hadir

/announcement

Pengumuman

/about

Tentang

Admin

/admin/login

/admin/dashboard

/admin/reports

/admin/schedule

/admin/announcement

/admin/statistics

/admin/settings

/admin/profile

---

# Environment

```env
VITE_API_URL=https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxx/exec
```

Seluruh komunikasi frontend ke backend harus menggunakan variabel environment agar mudah dipindahkan ketika backend berubah.

---

# Google Spreadsheet Structure

Gunakan satu file Google Spreadsheet dengan beberapa sheet berikut.

---

## Sheet 1 : Jadwal

Nama Sheet

Jadwal

Kolom

| Tanggal | Muadzin I | Muadzin II | Khotib | Imam |

Fungsi

Menyimpan jadwal petugas setiap minggu.

---

## Sheet 2 : Laporan

Nama Sheet

Laporan

Kolom

| ID | Tanggal Kirim | Nama | Tanggal Bertugas | Jabatan | Nomor WhatsApp | Alasan | Status | Catatan Admin |

Status

Menunggu

Disetujui

Ditolak

Selesai

Fungsi

Menyimpan laporan ketidakhadiran petugas.

---

## Sheet 3 : Pengumuman

Nama Sheet

Pengumuman

Kolom

| ID | Judul | Isi | Status | Tanggal |

Status

Aktif

Nonaktif

Fungsi

Pengumuman yang tampil pada website user.

---

## Sheet 4 : Admin

Nama Sheet

Admin

Kolom

| ID | Nama | Username | Password | Role | Status |

Role

Admin

Status

Aktif

Nonaktif

Fungsi

Login dashboard admin.

---

## Sheet 5 : Pengaturan

Nama Sheet

Pengaturan

Kolom

| Key | Value |

Contoh

Nama Masjid

Alamat

Nomor WhatsApp

Logo

Email

Footer

Versi Website

Fungsi

Konfigurasi website tanpa mengubah kode.

---

# Komunikasi Sistem

Website User

↓

REST API

↓

Google Apps Script

↓

Google Spreadsheet

↓

Dashboard Admin

↓

Update Status

↓

Google Spreadsheet

↓

Website User

Seluruh komunikasi data harus melewati Google Apps Script sebagai REST API. Frontend tidak boleh mengakses Google Spreadsheet secara langsung.

---

# Prinsip Arsitektur

* Frontend dan backend dipisahkan.
* Semua request menggunakan REST API.
* Tidak ada logika bisnis langsung di frontend.
* Seluruh konfigurasi API menggunakan file `.env`.
* Struktur folder dibuat modular agar mudah dikembangkan.
* Ketika backend diganti menjadi Laravel + MySQL, frontend tidak perlu diubah, cukup mengganti endpoint API.


# Security & Deployment Guide

Dokumen ini menjelaskan file apa saja yang boleh dibagikan ke GitHub dan file apa saja yang harus dirahasiakan.

---

# Repository

Gunakan GitHub sebagai tempat menyimpan source code.

Gunakan Vercel sebagai hosting frontend.

Gunakan Google Apps Script sebagai backend REST API.

Gunakan Google Spreadsheet sebagai database sementara.

---

# Struktur Deployment

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Vercel Deployment
    │
    ▼
React Frontend
    │
    ▼
Google Apps Script REST API
    │
    ▼
Google Spreadsheet
```

---

# File Yang BOLEH Di-Upload ke GitHub

Semua source code frontend.

```text
public/

src/

package.json

package-lock.json

vite.config.js

vercel.json

tailwind.config.js

postcss.config.js

eslint.config.js

README.md

LICENSE
```

Semua komponen React.

Semua halaman.

Semua CSS.

Semua konfigurasi Vite.

Semua dokumentasi.

---

# File Yang TIDAK BOLEH Di-Upload

```text
.env

.env.local

.env.production

.env.development
```

File environment hanya boleh disimpan di komputer developer dan di Environment Variables Vercel.

---

# Isi .env

Contoh:

```env
VITE_API_URL=https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxx/exec

VITE_APP_NAME=Jadwal Petugas Jumat

VITE_APP_VERSION=1.0.0
```

Jangan commit file ini ke GitHub.

---

# .gitignore

Pastikan file berikut masuk ke .gitignore.

```gitignore
node_modules

dist

.env

.env.local

.env.production

.env.development

.vscode/settings.json
```

---

# Data Yang Tidak Boleh Dibagikan

Jangan pernah membagikan:

- Username admin
- Password admin
- Session login
- Cookie
- Token autentikasi (jika nanti menggunakan JWT)
- File environment (.env)
- Data pribadi pengguna yang tidak perlu dipublikasikan

---

# Google Spreadsheet

Google Spreadsheet digunakan sebagai database sementara.

Gunakan beberapa Sheet:

- Jadwal
- Laporan
- Pengumuman
- Admin
- Pengaturan
- Log Aktivitas

Jangan membagikan Spreadsheet dengan akses Editor kepada publik.

Atur hak akses sesuai kebutuhan:

- Developer → Editor
- Pengurus → Editor (jika diperlukan)
- Publik → Tidak memiliki akses langsung

Frontend hanya berkomunikasi melalui Google Apps Script REST API, bukan langsung ke Spreadsheet.

---

# Google Apps Script

Project Apps Script tidak perlu di-upload ke repository frontend.

Buat repository terpisah jika ingin menyimpan source code Apps Script.

Contoh:

jadwal-jumat-frontend

jadwal-jumat-backend

Hal ini memudahkan pengelolaan dan meningkatkan keamanan.

---

# Vercel Environment Variables

Masukkan seluruh konfigurasi sensitif melalui Dashboard Vercel.

Contoh:

Settings

↓

Environment Variables

Tambahkan:

```text
VITE_API_URL

https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxx/exec
```

React akan membaca melalui:

```javascript
import.meta.env.VITE_API_URL
```

Jangan menuliskan URL API secara langsung (hardcode) di dalam source code.

---

# Best Practice

✔ Gunakan Environment Variables untuk konfigurasi.

✔ Gunakan .gitignore agar file sensitif tidak ikut ter-push.

✔ Pisahkan frontend dan backend.

✔ Gunakan repository terpisah untuk frontend dan Apps Script (opsional tetapi disarankan).

✔ Simpan seluruh data di Google Spreadsheet melalui REST API.

✔ Siapkan struktur agar mudah dipindahkan ke Laravel + MySQL.

---

# Arsitektur Sistem

```text
GitHub
│
├── Frontend React
│
└── Dokumentasi
        │
        ▼
Vercel
        │
        ▼
Frontend React
        │
        ▼
Google Apps Script REST API
        │
        ▼
Google Spreadsheet
```

---

# Future Migration

Ketika sistem berkembang:

Google Spreadsheet

↓

MySQL

Google Apps Script

↓

Laravel API

Frontend React tetap digunakan tanpa perubahan besar karena seluruh komunikasi dilakukan melalui service API dan Environment Variables.