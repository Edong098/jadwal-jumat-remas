import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Cari Petugas', path: '/search' },
    { name: 'Lapor', path: '/report' },
    { name: 'Pengumuman', path: '/announcement' },
    { name: 'Tentang', path: '/about' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img className="h-10 w-10 rounded-full object-cover shadow-sm border border-slate-100" src="/logo.jpeg" alt="Logo Masjid" />
              <span className="font-bold text-2xl text-primary-500 tracking-tight">Jadwal Jumat</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`inline-flex items-center px-1 pt-1 border-b-2 font-medium text-lg transition-colors ${
                  location.pathname === link.path 
                    ? 'border-primary-500 text-primary-500' 
                    : 'border-transparent text-slate-600 hover:border-primary-300 hover:text-primary-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <div 
        className={`sm:hidden absolute w-full left-0 bg-white shadow-lg rounded-b-3xl border-t border-slate-100 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'
        }`}
      >
        <div className="pt-2 pb-6 px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block pl-4 pr-4 py-3 border-l-4 text-[18px] font-medium rounded-r-xl transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'bg-primary-50 border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
