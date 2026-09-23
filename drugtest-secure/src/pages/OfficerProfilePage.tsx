import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTests } from '../context/TestContext';
import { 
  User, 
  Shield, 
  MapPin, 
  Smartphone, 
  Database, 
  LogOut, 
  CheckCircle2, 
  Wifi, 
  ShieldCheck,
  RefreshCw,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OfficerProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { records } = useTests();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Profile Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <User className="w-6 h-6 text-sky-400" />
          <span>Field Officer Profile & Terminal Info</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Authorized field operator credentials and device cryptographic diagnostics.
        </p>
      </div>

      {/* Officer Identification Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-950 border-2 border-sky-500/40 flex items-center justify-center text-xl font-bold text-sky-400 font-mono shadow-inner">
              {user ? user.id.slice(-2) : '10'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  {user?.name || 'Insp. Rajesh Verma'}
                </h2>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Badge: <strong className="text-slate-200">{user?.badgeNumber || 'MP-BPL-4921'}</strong> • ID: <strong className="text-sky-400">{user?.id || 'OFF-1023'}</strong>
              </p>
              <p className="text-xs text-sky-400 mt-1">
                {user?.unit || 'Bhopal Central Unit'}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Assigned Station</span>
            <span className="text-xs font-medium text-slate-200 block mt-0.5">{user?.station || 'MP Narcotics Enforcement Sector 4'}</span>
            <span className="text-[11px] text-slate-400 font-mono block mt-1">
              Contact: {user?.phone || '+91 98260 10234'}
            </span>
          </div>
        </div>

        {/* Credentials Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">Operational Role</span>
            <p className="font-bold text-slate-200 text-sm capitalize">{user?.role || 'Field Officer'}</p>
            <span className="text-[11px] text-slate-400">Authorized for preliminary colorimetric screening</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">Tests Executed</span>
            <p className="font-bold font-mono text-sky-400 text-sm">{records.length} Verified Records</p>
            <span className="text-[11px] text-slate-400">Cryptographically anchored</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-slate-400 uppercase font-semibold tracking-wider text-[10px]">Field Authorization</span>
            <p className="font-bold text-emerald-400 text-sm">Valid through 2027</p>
            <span className="text-[11px] text-slate-400">Annual re-certification current</span>
          </div>
        </div>
      </div>

      {/* Field Terminal Hardware & Telemetry Diagnostics */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-sky-400" />
          <span>Field Terminal Diagnostics & Calibration</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div>
              <span className="font-semibold text-slate-200 block">GPS Telemetry</span>
              <span className="text-[11px] text-slate-400 font-mono">23.2599° N, 77.4126° E (Bhopal Sector 4)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/30">
              LOCKED
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div>
              <span className="font-semibold text-slate-200 block">Optical White-Balance Sensor</span>
              <span className="text-[11px] text-slate-400 font-mono">CIE L*a*b* Profile v2.4</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/30">
              CALIBRATED
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div>
              <span className="font-semibold text-slate-200 block">Local Encrypted Cache</span>
              <span className="text-[11px] text-slate-400 font-mono">IndexedDB + LocalStorage Sync</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono text-[11px] border border-sky-500/30">
              {records.length} SAVED
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div>
              <span className="font-semibold text-slate-200 block">Offline Mode Integrity</span>
              <span className="text-[11px] text-slate-400 font-mono">Hash Verification Enabled</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/30">
              READY
            </span>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-xl border border-rose-800/60 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Field Terminal</span>
        </button>
      </div>

    </div>
  );
};
