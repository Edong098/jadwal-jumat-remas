// URL backend Google Apps Script Anda
// Anda bisa menaruh ini di .env dengan nama VITE_APPS_SCRIPT_URL
const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

// --- HELPER UNTUK FETCH ---
const fetchAPI = async (action, options = {}) => {
  if (!API_URL) {
    throw new Error("VITE_APPS_SCRIPT_URL belum diset!");
  }
  
  try {
    const url = new URL(API_URL);
    url.searchParams.append('action', action);
    url.searchParams.append('_t', new Date().getTime()); // Menghindari cache browser
    
    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
        ...(options.headers || {})
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

// --- API SERVICES ---

export const getReports = async () => {
  return await fetchAPI('getReports');
};

export const updateReportStatus = async (id, status, adminNote = '') => {
  return await fetchAPI('updateReport', {
    method: 'POST',
    body: JSON.stringify({ id, status, adminNote })
  });
};

export const getDashboardStats = async () => {
  return await fetchAPI('getDashboard');
};

export const getActiveSchedule = async () => {
  return await fetchAPI('getSchedule');
};

export const getScheduleThisWeek = async () => {
  return await fetchAPI('getScheduleThisWeek');
};

export const getScheduleNextWeek = async () => {
  return await fetchAPI('getScheduleNextWeek');
};

export const loginAdmin = async (username, password) => {
  const data = await fetchAPI('login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  
  if (!data.success) {
    throw new Error(data.message || "Username atau password salah");
  }
  return data;
};

export const updateProfile = async (profileData) => {
  const data = await fetchAPI('updateProfile', {
    method: 'POST',
    body: JSON.stringify(profileData)
  });
  
  if (!data || !data.success) {
    throw new Error(data?.message || "Gagal memperbarui profil.");
  }
  return data;
};

export const submitReport = async (reportData) => {
  const data = await fetchAPI('submitReport', {
    method: 'POST',
    body: JSON.stringify(reportData)
  });
  
  if (!data || !data.success) {
    throw new Error(data?.message || "Gagal mengirim laporan. Silakan coba lagi.");
  }
  return data;
};

// --- ANNOUNCEMENT SERVICES ---

export const getAnnouncements = async () => {
  return await fetchAPI('getAnnouncements');
};

export const createAnnouncement = async (announcementData) => {
  return await fetchAPI('createAnnouncement', {
    method: 'POST',
    body: JSON.stringify(announcementData)
  });
};

export const updateAnnouncement = async (id, announcementData) => {
  return await fetchAPI('updateAnnouncement', {
    method: 'POST',
    body: JSON.stringify({ id, ...announcementData })
  });
};

export const deleteAnnouncement = async (id) => {
  return await fetchAPI('deleteAnnouncement', {
    method: 'POST',
    body: JSON.stringify({ id })
  });
};

// --- SETTINGS SERVICES ---

export const getSettings = async () => {
  return await fetchAPI('getSettings');
};

export const updateSettings = async (settingsData) => {
  return await fetchAPI('updateSettings', {
    method: 'POST',
    body: JSON.stringify(settingsData)
  });
};
