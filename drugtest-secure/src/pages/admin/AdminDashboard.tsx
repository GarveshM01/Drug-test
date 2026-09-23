import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTests } from '../../context/TestContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  BarChart3, 
  FlaskConical, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  ChevronRight,
  MapPin,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { records, getStats } = useTests();
  const navigate = useNavigate();

  const stats = getStats();
  const recentTests = records.slice(0, 8);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Supervisor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Supervisor Oversight
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Zonal Oversight Console • Level 3
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Agency-Wide Drug Field-Test Registry
          </h1>
          <p className="text-xs text-slate-400">
            Real-time monitoring across field units, forensic chain of custody, and cryptographic integrity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/new-test"
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <span>+ Test Simulator</span>
          </Link>
          <Link
            to="/admin/audit"
            className="px-4 py-2.5 rounded-xl border border-amber-600/50 bg-amber-950/30 hover:bg-amber-950/50 text-amber-300 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Audit Vault</span>
          </Link>
        </div>
      </div>

      {/* Aggregate Stats: 4 Clean Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total Tests"
          value={stats.total}
          icon={FlaskConical}
          subtext="Statewide field tests logged"
          tone="default"
        />
        <StatCard
          label="Presumptive Positive"
          value={stats.positive}
          icon={AlertCircle}
          subtext="Flagged for forensic lab GC-MS"
          tone="positive"
        />
        <StatCard
          label="Negative"
          value={stats.negative}
          icon={CheckCircle}
          subtext="Unreactive field screenings"
          tone="negative"
        />
        <StatCard
          label="Inconclusive"
          value={stats.inconclusive}
          icon={XCircle}
          subtext="Sub-threshold / Re-test scheduled"
          tone="warning"
        />
      </div>

      {/* Main Table: Test ID | Officer | Result | Date | Location | Integrity */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              Recent Field Tests & Chain of Custody
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any record to inspect complete digital certificate and SHA-256 verification
            </p>
          </div>
          <Link
            to="/admin/tests"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Records</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Test ID</th>
                <th className="py-3 px-4">Officer</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Integrity</th>
                <th className="py-3 px-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {recentTests.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => navigate(`/record/${t.id}`)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                    {t.id}
                    <span className="block text-[11px] font-mono text-slate-400">
                      {t.caseId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-100 block">{t.officerName}</span>
                    <span className="text-[11px] font-mono text-slate-400">{t.officerId} ({t.unitId})</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge result={t.result} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                    <div>{t.date}</div>
                    <div className="text-[11px] text-slate-400">{t.time}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 max-w-xs truncate">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{t.location}</span>
                    </div>
                    <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
                      {t.gpsCoordinates}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t.integrity}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs font-medium text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1">
                      Inspect
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards List */}
        <div className="md:hidden divide-y divide-slate-800/80">
          {recentTests.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/record/${t.id}`)}
              className="p-4 hover:bg-slate-800/40 active:bg-slate-800 transition-colors cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-sky-400 block">
                    {t.id}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {t.caseId}
                  </span>
                </div>
                <StatusBadge result={t.result} size="sm" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-200">
                  Officer: {t.officerName} ({t.officerId})
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {t.location}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-mono">
                <span>{t.date}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.integrity}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
