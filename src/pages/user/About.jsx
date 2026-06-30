import React from 'react';
import { MapPin, Phone, CheckCircle, RefreshCw, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-slide-up">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center mb-14 relative animate-slide-up flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight uppercase">Tentang Masjid</h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto text-center">
            Website ini dibuat untuk membantu petugas dan pengurus Masjid Nurul Huda Kencong dalam melihat jadwal petugas Sholat Jumat secara mudah, cepat, dan akurat. Website juga menyediakan fasilitas pelaporan apabila petugas berhalangan hadir sehingga pengurus dapat segera melakukan tindak lanjut.
          </p>
        </div>

        {/* Fitur Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary-500/20 text-white hover:-translate-y-1 transition-transform">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 pb-4 border-b-2 border-white/20 uppercase tracking-wide">Jadwal Selalu Terupdate</h3>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed text-justify">
              Jadwal petugas akan updat tiap minggunya sesuai dengan jadwal yang sudah dibuat. Setiap perubahan jadwal akan otomatis ditampilkan pada website tanpa perlu melakukan pembaruan aplikasi.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary-500/20 text-white hover:-translate-y-1 transition-transform">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 pb-4 border-b-2 border-white/20 uppercase tracking-wide">Pelaporan Tidak Hadir</h3>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed text-justify">
              Petugas dapat mengirim laporan ketidakhadiran melalui website. Setiap laporan akan diterima oleh admin untuk ditinjau. Admin dapat menyetujui, menolak, atau memberikan catatan terhadap laporan tersebut.
            </p>
          </div>
        </div>

        {/* Lokasi Masjid */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 pl-4 border-l-4 border-primary-500">Lokasi Masjid</h2>
          <p className="text-slate-600 text-lg mb-8 pl-5">Panduan peta untuk mempermudah Anda menemukan lokasi masjid kami.</p>
          <div className="w-full h-80 bg-slate-200 rounded-2xl overflow-hidden mb-6 relative shadow-inner">
            <iframe
              title="Google Maps Lokasi Masjid"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3253.376214339511!2d116.16053707405986!3d-8.379592684498038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcddba0fd715c53%3A0x3cc0c7bb360bdf71!2sMasjid%20Nurul%20Huda%20Kencong!5e1!3m2!1sid!2sid!4v1782749619217!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-slate-50 rounded-xl">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold text-slate-900 mb-1">Masjid Nurul Huda Kencong</h4>
              <p className="text-slate-600 text-lg">Desa Kencong, Kecamatan Tanjung</p>
              <p className="text-slate-600 text-lg">Kabupaten Lombok Utara, Nusa Tenggara Barat</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              <MapPin size={20} className="mr-2" />
              Buka di Google Maps
            </a>
          </div>
        </div>

        {/* Kontak Pengurus (Redesigned) */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-[32px] p-10 md:p-14 text-white shadow-2xl shadow-primary-500/20 text-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Kontak Pengurus</h2>
            <p className="text-primary-100 text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Punya pertanyaan? Silakan hubungi kami melalui kontak di bawah ini.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href="mailto:remajamasjidkencong@gmail.com"
                className="flex items-center gap-4 bg-white/10 hover:bg-white hover:text-primary-700 text-white transition-all duration-300 px-6 py-4 md:px-8 md:py-5 rounded-[20px] backdrop-blur-md border border-white/20 w-full sm:w-auto shadow-lg hover:-translate-y-1"
              >
                <div className="bg-white/20 p-3 rounded-full shrink-0">
                  <Mail size={24} />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-sm opacity-80 font-medium">Kirim Email</p>
                  <p className="font-bold text-lg truncate">remajamasjidkencong@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/6282236868980"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-white text-primary-700 hover:bg-slate-50 transition-all duration-300 px-6 py-4 md:px-8 md:py-5 rounded-[20px] shadow-xl shadow-black/10 w-full sm:w-auto hover:-translate-y-1"
              >
                <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-500 font-medium">Hubungi / WhatsApp</p>
                  <p className="font-bold text-lg text-slate-900">0822-3686-8980</p>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
