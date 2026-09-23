import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTests } from '../context/TestContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { 
  FileText, 
  Plus, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Hash,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecordById, records } = useTests();
  const navigate = useNavigate();

  // If id is provided, fetch it; otherwise use latest created test
  const record = id ? getRecordById(id) : records[0];

  if (!record) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-400">Record not found.</p>
        <Link to="/dashboard" className="text-sky-400 underline text-sm">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const isPositive = record.result === 'Presumptive Positive';
  const isNegative = record.result === 'Negative';
  const isInconclusive = record.result === 'Inconclusive';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      
      {/* Result Hero Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
          Field-Test Verification Complete
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Preliminary Colorimetric Result
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Record ID: <strong className="text-sky-400">{record.id}</strong> • Case: {record.caseId}
        </p>
      </div>

      {/* Primary Result Banner Card */}
      <div className={`rounded-2xl border p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden ${
        isPositive
          ? 'bg-rose-950/30 border-rose-600/50 shadow-rose-950/40'
          : isNegative
          ? 'bg-emerald-950/30 border-emerald-600/50 shadow-emerald-950/40'
          : 'bg-amber-950/30 border-amber-600/50 shadow-amber-950/40'
      }`}>
        
        {/* Result Icon */}
        <div className="inline-flex p-3 rounded-full bg-slate-900/80 border border-slate-700 shadow-lg">
          {isPositive ? (
            <AlertCircle className="w-10 h-10 text-rose-400" />
          ) : isNegative ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          ) : (
            <HelpCircle className="w-10 h-10 text-amber-400" />
          )}
        </div>

        {/* Large Result Status */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Indicated Field Finding
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isPositive ? 'text-rose-400' : isNegative ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            {record.result}
          </h2>
        </div>

        {/* Confidence Gauge */}
        <div className="max-w-xs mx-auto bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Confidence Score:</span>
            <span className="font-bold font-mono text-slate-100 text-sm">{record.confidence}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full ${
                isPositive ? 'bg-rose-500' : isNegative ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${record.confidence}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-center">
            *Confidence value is for SIH prototype demonstration only.
          </span>
        </div>

        {/* Quick Sample Summary */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Kit Formulation</span>
            <span className="font-semibold text-slate-200 truncate block">{record.testKit}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Category</span>
            <span className="font-semibold text-sky-400 block">{record.category}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Sample Matrix</span>
            <span className="font-semibold text-slate-200 block">{record.sampleType}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Timestamp</span>
            <span className="font-mono text-slate-300 block">{record.time}</span>
          </div>
        </div>

      </div>

      {/* Mandatory Statutory Disclaimer */}
      <DisclaimerBanner />

      {/* Captured Image Thumbnail & Hash Preview */}
      {record.imageUrl && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
          <img
            src={record.imageUrl}
            alt="Field Test Reaction"
            className="w-24 h-20 object-cover rounded-lg border border-slate-700 bg-slate-950 shrink-0"
          />
          <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographic Integrity Stamp Verified</span>
            </div>
            <p className="text-xs font-mono text-slate-400 break-all truncate">
              SHA-256: <span className="text-slate-200">{record.hash}</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Captured by Officer {record.officerName} ({record.officerId}) at {record.location}
            </p>
          </div>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        <Link
          to={`/record/${record.id}`}
          className="w-full py-3.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-950/60 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <FileText className="w-4 h-4" />
          <span>View Digital Record</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>

        <Link
          to="/new-test"
          className="w-full py-3.5 px-5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Start New Test</span>
        </Link>
      </div>

    </div>
  );
};
