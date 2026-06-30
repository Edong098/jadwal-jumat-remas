/**
 * Helper Functions
 */

// Mendapatkan objek spreadsheet aktif
function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SHEET_ID);
}

// Mendapatkan sheet berdasarkan nama
function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

// Mengirim response dalam format JSON
function jsonResponse(data, success = true, message = "") {
  const result = {
    success: success,
    message: message,
    data: data
  };
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Generate ID Unik (contoh format: RPT-1234567890)
function generateID(prefix) {
  return prefix + "-" + new Date().getTime();
}

// Mencatat log aktivitas admin
function logActivity(adminName, action, description) {
  try {
    const sheet = getSheet(CONFIG.SHEETS.LOG);
    if (!sheet) return; // Jika sheet belum ada, abaikan
    
    const timestamp = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([timestamp, adminName, action, description]);
  } catch (e) {
    console.error("Gagal mencatat log: " + e.message);
  }
}
