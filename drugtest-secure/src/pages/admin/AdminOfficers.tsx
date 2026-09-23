import React from 'react';
import { MOCK_OFFICERS } from '../../data/mockData';
import { useTests } from '../../context/TestContext';
import { Users, Shield, Phone, MapPin, CheckCircle, Smartphone } from 'lucide-react';

export const AdminOfficers: React.FC = () => {
  const { records } = useTests();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <Users className="w-6 h-6 text-amber-400" />
          <span>Authorized Field Officers & Rosters</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Active field personnel credentials, assigned mobile optical terminals, and field dispatch units.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_OFFICERS.map((officer) => {
          const officerTests = records.filter(r => r.officerId.toLowerCase() === officer.id.toLowerCase());
          return (
            <div
              key={officer.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-sky-400 font-mono">
                    {officer.id.slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-base">{officer.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">
                      ID: <span className="text-sky-300">{officer.id}</span> • Badge: {officer.badgeNumber}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {officer.role}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span>{officer.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{officer.station}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono">{officer.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Total Field Tests Logged:</span>
                <span className="font-bold text-sky-400">{officerTests.length} Records</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
