/**
 * Modul Autentikasi Admin
 */

function login(username, password) {
  // Dalam aplikasi nyata, ini akan mengecek ke sheet Admin
  // Untuk keperluan kerangka, kita return mock response
  
  if (username === "admin" && password === "admin123") {
    const token = generateID("TOKEN");
    logActivity(username, "LOGIN", "Admin berhasil login");
    
    return jsonResponse({
      token: token,
      name: "Administrator Masjid",
      role: "Super Admin"
    }, true, "Login berhasil");
  } else {
    return jsonResponse(null, false, "Username atau password salah");
  }
}

function logout(username) {
  logActivity(username || "Unknown", "LOGOUT", "Admin berhasil logout");
  return jsonResponse(null, true, "Logout berhasil");
}

function changePassword(username, oldPassword, newPassword) {
  // Logika ubah password di sheet Admin
  logActivity(username, "CHANGE_PASSWORD", "Admin mengubah password");
  return jsonResponse(null, true, "Password berhasil diubah");
}

function checkSession(token) {
  // Validasi token jika diperlukan
  return true;
}
