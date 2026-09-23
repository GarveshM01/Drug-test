import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTests } from '../context/TestContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { 
  Plus, 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  Lock
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { records, getStats } = useTests();
  const navigate = useNavigate();

  const stats = getStats();
  const recentTests = records.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Officer Operational Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
              Active Shift
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit: {user?.unit || 'Bhopal Central Unit'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Welcome, {user?.name || 'Officer'}
          </h1>
          <p className="text-xs text-slate-400">
            Field Officer ID: <span className="text-slate-300 font-mono font-medium">{user?.id || 'OFF-1023'}</span> • Station: {user?.station || 'Sector 4'}
          </p>
        </div>

        {/* Primary CTA: + New Test Button */}
        <div>
          <Link
            to="/new-test"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-950/60 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>+ New Test</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Field Disclaimer */}
      <DisclaimerBanner compact />

      {/* Dashboard Summary: 4 Limited Clean Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total Tests"
          value={stats.total}
          icon={FlaskConical}
          subtext="Seizure samples verified"
          tone="default"
        />
        <StatCard
          label="Presumptive Positive"
          value={stats.positive}
          icon={AlertCircle}
          subtext="Require lab confirmation"
          tone="positive"
        />
        <StatCard
          label="Negative"
          value={stats.negative}
          icon={CheckCircle}
          subtext="No reaction detected"
          tone="negative"
        />
        <StatCard
          label="Inconclusive"
          value={stats.inconclusive}
          icon={XCircle}
          subtext="Flagged for re-sampling"
          tone="warning"
        />
      </div>

      {/* Recent Tests Section */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              Recent Field Tests
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest chemical screening records logged from field terminal
            </p>
          </div>
          <Link
            to="/history"
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Records</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Test ID</th>
                <th className="py-3 px-4">Test Kit & Substance</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Integrity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {recentTests.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => navigate(`/record/${t.id}`)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-semibold text-sky-400">
                    {t.id}
                    <span className="block text-[11px] font-mono text-slate-400">
                      {t.caseId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-100">{t.testKit}</span>
                    <span className="block text-xs text-slate-400">{t.category} ({t.sampleType})</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge result={t.result} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.date}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {t.time}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t.integrity}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs font-medium text-sky-400 group-hover:text-sky-300 inline-flex items-center gap-1">
                      View Record
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Compact Cards List (Mobile-First UX) */}
        <div className="sm:hidden divide-y divide-slate-800/80">
          {recentTests.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/record/${t.id}`)}
              className="p-4 hover:bg-slate-800/40 active:bg-slate-800 transition-colors cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-400">
                  {t.id}
                </span>
                <StatusBadge result={t.result} size="sm" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-100">{t.testKit}</p>
                <p className="text-xs text-slate-400">
                  {t.category} • <span className="font-mono">{t.sampleType}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {t.date} • {t.time}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
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
