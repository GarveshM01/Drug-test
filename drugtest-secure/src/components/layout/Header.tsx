import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  Shield, 
  Wifi, 
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  isAdminView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdminView = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Branding & System Name */}
        <div className="flex items-center gap-3">
          <Link to={isAdminView ? "/admin" : "/dashboard"} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400 group-hover:bg-sky-600/30 transition-all shadow-inner">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-100 text-base sm:text-lg">
                  DrugTest <span className="text-sky-400 font-medium">Secure</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                  SIH Demo
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-mono hidden sm:block">
                Field Narcotics Digital Verification System
              </p>
            </div>
          </Link>

          {/* Mode Switch Badge */}
          {isAdminView ? (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              Supervisor Mode
            </span>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Wifi className="w-3 h-3" />
              <span>Offline-Sync Ready</span>
            </span>
          )}
        </div>

        {/* Right: Actions, Notifications, Officer Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Admin toggle link for easy demo grading */}
          <Link
            to={isAdminView ? "/dashboard" : "/admin"}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            title={isAdminView ? "Switch to Officer View" : "Open Supervisor View"}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{isAdminView ? "Officer Mode" : "Admin / Supervisor"}</span>
          </Link>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setNotifyOpen(!notifyOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 relative transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400" />
            </button>

            {notifyOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setNotifyOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Field Dispatch Alerts</span>
                  <span className="text-[10px] text-sky-400 font-mono">1 New</span>
                </div>
                <div className="px-3 py-2.5 hover:bg-slate-800/50 transition-colors border-b border-slate-800/60">
                  <p className="text-xs text-slate-200 font-medium">Standard Kit Batch KIT-B24-018 Active</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Reference color profiles calibrated for Zonal Sector 4.</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">Today, 08:30 AM</span>
                </div>
                <div className="px-3 py-2 text-center">
                  <span className="text-[11px] text-slate-400">All field alerts synchronized</span>
                </div>
              </div>
            )}
          </div>

          {/* Officer Identity Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-800/60 hover:bg-slate-800 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-sky-300">
                {user ? user.id.slice(-2) : 'OF'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-200 leading-tight">
                  {user ? user.name : 'Officer'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono leading-tight">
                  {user ? user.id : 'OFF-DEMO'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {menuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 z-50"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{user?.badgeNumber || 'MP-BPL-4921'}</p>
                  <p className="text-[10px] text-sky-400 mt-1">{user?.unit}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Officer Profile & Credentials
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Supervisor Console
                </Link>

                <div className="border-t border-slate-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
