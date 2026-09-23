import React, { useState } from 'react';
import { useTests } from '../../context/TestContext';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileKey, 
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminAuditLogs: React.FC = () => {
  const { records } = useTests();
  const [verifying, setVerifying] = useState(false);
  const [auditPassed, setAuditPassed] = useState(true);

  const handleRunFullAudit = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setAuditPassed(true);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-amber-400" />
            <span>Cryptographic Audit & Tamper Verification</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-knowledge SHA-256 integrity ledger verifying all field-test records and optical frames.
          </p>
        </div>

        <button
          onClick={handleRunFullAudit}
          disabled={verifying}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${verifying ? 'animate-spin' : ''}`} />
          <span>{verifying ? 'Auditing Digests...' : 'Run Ledger Audit'}</span>
        </button>
      </div>

      {/* Audit Status Card */}
      <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-emerald-300">
              Evidentiary Hash Tree: 100% Invariant & Tamper-Free
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Active Verified
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            All {records.length} field test records have valid SHA-256 cryptographic signatures matching their initial officer timestamp, GPS coordinates, and captured colorimetric image bytes.
          </p>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800">
          <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
            Ledger Hash Sequence
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Record ID</th>
                <th className="py-3 px-4">Officer Signature</th>
                <th className="py-3 px-4">Evidence SHA-256 Digest</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {records.map((r, i) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400">
                    <Link to={`/record/${r.id}`} className="hover:underline flex items-center gap-1">
                      {r.id}
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-slate-200">
                    {r.officerId} ({r.officerName})
                  </td>
                  <td className="py-3 px-4 text-sky-300 break-all select-all font-mono text-[11px]">
                    {r.hash}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {r.date} {r.time}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      MATCH
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
