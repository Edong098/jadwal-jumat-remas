const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const action = e.parameter.action;
  let result = null;

  try {
    switch (action) {
      case 'getReports':
        result = getReports();
        break;
      case 'getDashboard':
        result = getDashboardStats();
        break;
      case 'getSchedule':
        result = getSchedule();
        break;
      case 'getScheduleThisWeek':
        result = getScheduleThisWeek();
        break;
      case 'getScheduleNextWeek':
        result = getScheduleNextWeek();
        break;
      case 'getAnnouncements':
        result = getAnnouncements();
        break;
      case 'getSettings':
        result = getSettings();
        break;
      default:
        return responseJSON({ error: true, message: 'Invalid action' });
    }
    return responseJSON(result);
  } catch (error) {
    return responseJSON({ error: true, message: error.toString() });
  }
}

function doPost(e) {
  const action = e.parameter.action;
  
  try {
    // Ambil body JSON
    const body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    let result = null;

    switch (action) {
      case 'login':
        result = loginAdmin(body.username, body.password);
        break;
      case 'submitReport':
        result = submitReport(body);
        break;
      case 'updateReport':
        result = updateReportStatus(body.id, body.status, body.adminNote);
        break;
      case 'createAnnouncement':
        result = createAnnouncement(body);
        break;
      case 'updateAnnouncement':
        result = updateAnnouncement(body);
        break;
      case 'deleteAnnouncement':
        result = deleteAnnouncement(body.id);
        break;
      case 'updateSettings':
        result = updateSettings(body);
        break;
      case 'updateProfile':
        result = updateAdminProfile(body);
        break;
      default:
        return responseJSON({ success: false, message: 'Invalid action' });
    }
    return responseJSON(result);
  } catch (error) {
    return responseJSON({ success: false, message: error.toString() });
  }
}

// ===================== HELPER =====================
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  const headers = data[0].map(h => String(h).replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
  const rows = data.slice(1);
  return rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function logActivity(activity, detail) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Log Aktivitas');
  if (sheet) {
    const timeStr = Utilities.formatDate(new Date(), "Asia/Makassar", "dd-MM-yyyy HH:mm");
    sheet.appendRow([timeStr, activity, detail]);
  }
}

function formatDateIndo(dateVal) {
  if (!dateVal) return "";
  let d = new Date(dateVal);
  if (isNaN(d.getTime())) return dateVal;
  
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const day = d.getDate().toString().padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// ===================== JADWAL =====================
function getSchedule() {
  const data = getSheetData('Jadwal');
  // Format: Tanggal, Muadzin1, Muadzin2, Khotib, Imam, Status
  return data.map(row => ({
    rawDate: row['TANGGAL'],
    tanggal: formatDateIndo(row['TANGGAL']),
    muadzin1: row['MUADZIN1'] || row['MUADZINI'] || row['MUAZDIN1'] || row['MUAZDINI'] || row['MUADZINPERTAMA'] || '',
    muadzin2: row['MUADZIN2'] || row['MUADZINII'] || row['MUAZDIN2'] || row['MUAZDINII'] || row['MUADZINKEDUA'] || '',
    khotib: row['KHOTIB'] || '',
    imam: row['IMAM'] || '',
    status: row['STATUS'] || ''
  })).filter(item => {
    let stat = String(item.status).toUpperCase();
    return stat !== 'SELESAI' && stat !== 'DIBATALKAN';
  });
}

function getActiveSchedules() {
  const schedule = getSchedule();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const upcoming = schedule.filter(s => {
    let d = new Date(s.rawDate);
    return !isNaN(d.getTime()) && d.getTime() >= now.getTime();
  });
  
  upcoming.sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());
  return upcoming;
}

function getScheduleThisWeek() {
  const upcoming = getActiveSchedules();
  return upcoming.length > 0 ? upcoming[0] : null;
}

function getScheduleNextWeek() {
  const upcoming = getActiveSchedules();
  return upcoming.length > 1 ? upcoming[1] : null;
}

// ===================== LAPORAN =====================
function getReports() {
  const data = getSheetData('Laporan');
  return data.map(row => ({
    id: row['ID'],
    submittedAt: formatDateIndo(row['TANGGALKIRIM']),
    name: row['NAMAPETUGAS'],
    role: row['JABATAN'] || row['TUGAS'] || '',
    dutyDate: formatDateIndo(row['TANGGALBERTUGAS']),
    reason: row['ALASANTIDAKHADIR'],
    status: row['STATUS'],
    adminNote: row['CATATANADMIN'] || ''
  })).reverse();
}

function submitReport(body) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Laporan');
  const data = sheet.getDataRange().getValues();
  
  let maxId = 0;
  // Cari ID angka terbesar yang ada saat ini (mulai dari baris ke-2 untuk melewati header)
  for (let i = 1; i < data.length; i++) {
    let currentId = String(data[i][0]);
    // Hanya proses jika ID sepenuhnya angka dan bukan timestamp besar
    if (/^\d+$/.test(currentId) && currentId.length < 10) {
      let num = parseInt(currentId, 10);
      if (num > maxId) {
        maxId = num;
      }
    }
  }
  
  const newId = maxId + 1;
  const dateSubmit = formatDateIndo(new Date());
  
  // ID, Tanggal Kirim, Nama Petugas, Jabatan, Tanggal Bertugas, Alasan Tidak Hadir, Status, Catatan Admin, Tanggal Diproses
  sheet.appendRow([
    newId, dateSubmit, body.name, body.role, body.dutyDate, body.reason, "Menunggu", "", ""
  ]);
  return { success: true, message: "Laporan berhasil dikirim" };
}

function updateReportStatus(id, status, adminNote) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Laporan');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      // Kolom Status = 7 (G), Catatan Admin = 8 (H), Tanggal Diproses = 9 (I)
      sheet.getRange(i + 1, 7).setValue(status);
      sheet.getRange(i + 1, 8).setValue(adminNote || '');
      sheet.getRange(i + 1, 9).setValue(Utilities.formatDate(new Date(), "Asia/Makassar", "dd-MM-yyyy HH:mm"));
      
      logActivity("Update Laporan", "Laporan ID " + id + " -> " + status);
      return { success: true, message: "Status berhasil diperbarui" };
    }
  }
  return { success: false, message: "Laporan tidak ditemukan" };
}

// ===================== PENGUMUMAN =====================
function getAnnouncements() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Pengumuman');
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0].map(h => String(h).replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
  const statusCol = headers.indexOf('STATUS');
  const berakhirCol = headers.indexOf('BERAKHIR') !== -1 ? headers.indexOf('BERAKHIR') : headers.indexOf('TANGGALBERAKHIR');

  let now = new Date();
  now.setHours(0,0,0,0);

  // Check and update expired announcements
  for (let i = 1; i < data.length; i++) {
    let stat = String(data[i][statusCol]).toUpperCase();
    if (stat === 'AKTIF' && berakhirCol !== -1) {
      let endDateRaw = data[i][berakhirCol];
      if (endDateRaw) {
        let d = new Date(endDateRaw);
        if (!isNaN(d.getTime())) {
          d.setHours(23,59,59,999);
          if (new Date().getTime() > d.getTime()) {
            sheet.getRange(i + 1, statusCol + 1).setValue('Nonaktif');
            data[i][statusCol] = 'Nonaktif'; // update locally
            logActivity("Auto Expire", "Pengumuman ID " + data[i][0] + " kadaluarsa");
          }
        }
      }
    }
  }

  const rows = data.slice(1);
  return rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return {
      id: obj['ID'],
      title: obj['JUDUL'],
      content: obj['ISIPENGUMUMAN'] || obj['ISI'] || obj['PENGUMUMAN'] || '',
      date: formatDateIndo(obj['PUBLISH'] || obj['TANGGALPUBLISH'] || obj['TANGGAL'] || ''),
      endDate: obj['BERAKHIR'] || obj['TANGGALBERAKHIR'] || '',
      isActive: String(obj['STATUS']).toUpperCase() === 'AKTIF'
    };
  }).reverse();
}

function createAnnouncement(body) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Pengumuman');
  const data = sheet.getDataRange().getValues();
  
  let maxId = 0;
  // Cari ID angka terbesar (mulai dari baris ke-2 untuk melewati header)
  for (let i = 1; i < data.length; i++) {
    let currentId = String(data[i][0]);
    // Proses jika ID adalah angka dan panjangnya wajar (bukan timestamp)
    if (/^\d+$/.test(currentId) && currentId.length < 10) {
      let num = parseInt(currentId, 10);
      if (num > maxId) {
        maxId = num;
      }
    }
  }
  
  const newId = maxId + 1;
  const dateSubmit = formatDateIndo(new Date());
  const status = body.isActive ? 'Aktif' : 'Nonaktif';
  
  // ID, Judul, Isi Pengumuman, Status, Tanggal Publish, Tanggal Berakhir
  sheet.appendRow([newId, body.title, body.content, status, dateSubmit, body.endDate || ""]);
  logActivity("Buat Pengumuman", "Pengumuman: " + body.title);
  return { success: true, message: "Pengumuman ditambahkan" };
}

function updateAnnouncement(body) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Pengumuman');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == body.id) {
      sheet.getRange(i + 1, 2).setValue(body.title);
      sheet.getRange(i + 1, 3).setValue(body.content);
      // Update status as explicitly requested, or if not provided, leave alone?
      // Typically isActive is sent in body.
      if (body.isActive !== undefined) {
        sheet.getRange(i + 1, 4).setValue(body.isActive ? 'Aktif' : 'Nonaktif');
      }
      if (body.endDate !== undefined) {
        // Kolom F (Tanggal Berakhir) adalah kolom ke-6
        sheet.getRange(i + 1, 6).setValue(body.endDate || "");
      }
      logActivity("Update Pengumuman", "Pengumuman ID " + body.id);
      return { success: true, message: "Pengumuman diperbarui" };
    }
  }
  return { success: false, message: "Pengumuman tidak ditemukan" };
}

function deleteAnnouncement(id) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Pengumuman');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      logActivity("Hapus Pengumuman", "Pengumuman ID " + id);
      return { success: true, message: "Pengumuman dihapus" };
    }
  }
  return { success: false, message: "Pengumuman tidak ditemukan" };
}

// ===================== ADMIN & LOGIN =====================
function loginAdmin(username, password) {
  const data = getSheetData('Admin');
  for (let i = 0; i < data.length; i++) {
    let stat = String(data[i]['STATUS']).toUpperCase();
    if (data[i]['USERNAME'] === username && data[i]['PASSWORD'] === password && stat === 'AKTIF') {
      logActivity("Login", "Admin " + username + " berhasil login");
      return { success: true, token: 'gas-token-' + new Date().getTime(), name: data[i]['NAMA'] };
    }
  }
  return { success: false, message: "Username atau password salah" };
}

function updateAdminProfile(body) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Admin');
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
  
  const userCol = headers.indexOf('USERNAME') + 1;
  const nameCol = headers.indexOf('NAMA') + 1;
  const passCol = headers.indexOf('PASSWORD') + 1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][userCol - 1] === body.username) {
      if (body.type === 'profile') {
        sheet.getRange(i + 1, nameCol).setValue(body.name);
        logActivity("Update Profil", "Profil Admin " + body.username + " diperbarui");
        return { success: true, message: "Profil berhasil diperbarui" };
      } else if (body.type === 'password') {
        let currentPass = data[i][passCol - 1];
        if (currentPass !== body.oldPassword) {
           return { success: false, message: "Kata sandi lama salah!" };
        }
        sheet.getRange(i + 1, passCol).setValue(body.newPassword);
        logActivity("Update Sandi", "Sandi Admin " + body.username + " diperbarui");
        return { success: true, message: "Kata sandi berhasil diperbarui" };
      }
    }
  }
  return { success: false, message: "Admin tidak ditemukan" };
}

// ===================== PENGATURAN =====================
function getSettings() {
  const data = getSheetData('Pengaturan');
  let settings = {};
  data.forEach(row => {
    let k = String(row['KEY']).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (k === 'NAMAMASJID') settings.mosqueName = row['VALUE'];
    if (k === 'ALAMAT') settings.address = row['VALUE'];
    if (k === 'FOOTER') settings.description = row['VALUE'];
    if (k === 'LINKDATABASE') settings.spreadsheetUrl = row['VALUE'];
  });
  return settings;
}

function updateSettings(body) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Pengaturan');
  const data = sheet.getDataRange().getValues();
  // Format Key = Col A, Value = Col B
  const mapData = {
    'Nama Masjid': body.mosqueName,
    'Alamat': body.address,
    'Footer': body.description,
    'Link Database': body.spreadsheetUrl
  };
  
  for (let i = 1; i < data.length; i++) {
    let key = data[i][0];
    if (mapData[key] !== undefined) {
      sheet.getRange(i + 1, 2).setValue(mapData[key]);
    }
  }
  logActivity("Update Pengaturan", "Pengaturan dasar diperbarui");
  return { success: true, message: "Pengaturan berhasil disimpan" };
}

// ===================== DASHBOARD STATS =====================
function getDashboardStats() {
  const reports = getSheetData('Laporan');
  const announcements = getSheetData('Pengumuman');
  
  let stats = {
    totalReports: reports.length,
    pending: 0,
    approved: 0,
    rejected: 0,
    activeAnnouncements: 0,
    chartLabels: [],
    chartData: []
  };
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  let monthCounts = {};

  reports.forEach(r => {
    let stat = String(r['STATUS']).toUpperCase();
    if (stat === 'MENUNGGU') stats.pending++;
    if (stat === 'DISETUJUI') stats.approved++;
    if (stat === 'DITOLAK') stats.rejected++;
    
    // Hitung data grafik berdasarkan Tanggal Kirim
    let dateVal = r['TANGGALKIRIM'];
    if (dateVal) {
      let d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        let mLabel = monthNames[d.getMonth()];
        monthCounts[mLabel] = (monthCounts[mLabel] || 0) + 1;
      }
    }
  });
  
  announcements.forEach(a => {
    let stat = String(a['STATUS']).toUpperCase();
    if (stat === 'AKTIF') stats.activeAnnouncements++;
  });
  
  // Ambil 6 bulan terakhir secara dinamis
  const now = new Date();
  let currentMonth = now.getMonth();
  for (let i = 5; i >= 0; i--) {
    let mIndex = (currentMonth - i + 12) % 12;
    let mLabel = monthNames[mIndex];
    stats.chartLabels.push(mLabel);
    stats.chartData.push(monthCounts[mLabel] || 0);
  }
  
  return stats;
}
