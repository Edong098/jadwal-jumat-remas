import React from 'react';
import { Calendar, User, Mic2, BookOpen } from 'lucide-react';

const ScheduleCard = ({ title, date, isNextWeek = false, schedule }) => {
  const colorScheme = isNextWeek ? {
    borderTop: 'border-t-4 border-t-secondary-500',
    headerBg: 'bg-gradient-to-r from-secondary-50 to-white',
    title: 'text-secondary-800',
    dateText: 'text-secondary-600',
    iconText: 'text-secondary-500',
    iconBg: 'bg-secondary-100 border-secondary-200'
  } : {
    borderTop: 'border-t-4 border-t-primary-500',
    headerBg: 'bg-gradient-to-r from-primary-50 to-white',
    title: 'text-primary-800',
    dateText: 'text-primary-800',
    iconText: 'text-primary-600',
    iconBg: 'bg-primary-100 border-primary-200'
  };

  const Item = ({ icon: Icon, label, name }) => (
    <div className="flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-2 xl:gap-4 p-3 md:p-5 rounded-2xl bg-slate-50 border border-slate-100">
      <div className={`p-2 md:p-4 rounded-xl shadow-sm border ${colorScheme.iconBg} ${colorScheme.iconText} flex-shrink-0`}>
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <div className="flex flex-col justify-center w-full">
        <p className="text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-400 uppercase tracking-wider md:tracking-widest mb-0.5 md:mb-1">{label}</p>
        <p className="text-sm sm:text-base md:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">{name}</p>
      </div>
    </div>
  );

  return (
    <div className={`bg-white rounded-[32px] shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 relative ${colorScheme.borderTop}`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full -z-10 opacity-50"></div>
      
      <div className={`p-5 md:p-8 ${colorScheme.headerBg} border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4`}>
        <h3 className={`text-xl md:text-3xl font-extrabold tracking-tight ${colorScheme.title} text-center md:text-left`}>{title}</h3>
        <div className={`flex items-center justify-center font-bold ${colorScheme.dateText} text-sm md:text-xl bg-white/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm`}>
          <Calendar size={20} className="mr-2 md:mr-3 md:w-6 md:h-6" />
          {date}
        </div>
      </div>

      <div className="p-4 md:p-8 bg-white grid grid-cols-2 gap-3 md:gap-6 relative z-10">
        <Item icon={BookOpen} label="Khotib" name={schedule.khotib} />
        <Item icon={User} label="Imam" name={schedule.imam} />
        <Item icon={Mic2} label="Muadzin I" name={schedule.muadzin1} />
        <Item icon={Mic2} label="Muadzin II" name={schedule.muadzin2} />
      </div>
    </div>
  );
};

export default ScheduleCard;
