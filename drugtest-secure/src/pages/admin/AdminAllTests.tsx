import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTests } from '../../context/TestContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Search, 
  Files, 
  MapPin, 
  ShieldCheck, 
  Download, 
  RotateCcw,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const AdminAllTests: React.FC = () => {
  const { records } = useTests();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<string>('ALL');
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');

  // Unique units from records
  const unitOptions = useMemo(() => {
    const units = new Set(records.map(r => r.unitId));
    return Array.from(units);
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesCase = r.caseId.toLowerCase().includes(q);
        const matchesOfficer = r.officerName.toLowerCase().includes(q) || r.officerId.toLowerCase().includes(q);
        const matchesLocation = r.location.toLowerCase().includes(q);
        if (!matchesId && !matchesCase && !matchesOfficer && !matchesLocation) {
          return false;
        }
      }

      if (selectedResult !== 'ALL' && r.result !== selectedResult) {
        return false;
      }

      if (selectedUnit !== 'ALL' && r.unitId !== selectedUnit) {
        return false;
      }

      return true;
    });
  }, [records, searchQuery, selectedResult, selectedUnit]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Files className="w-6 h-6 text-amber-400" />
            <span>Master Test Registry & Chain of Custody</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervisor audit view with cryptographic hashes, location geotags, and evidentiary custody stamps.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Filtered Records: <strong className="text-amber-400">{filteredRecords.length}</strong>
        </div>
      </div>

      {/* Filter / Search Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Test ID, Case, Officer, Location..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div>
            <select
              value={selectedResult}
              onChange={(e) => setSelectedResult(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="ALL">Filter by Result (All)</option>
              <option value="Presumptive Positive">Presumptive Positive</option>
              <option value="Negative">Negative</option>
              <option value="Inconclusive">Inconclusive</option>
            </select>
          </div>

          <div>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="ALL">Filter by Unit (All)</option>
              {unitOptions.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Test ID / Case</th>
                <th className="py-3 px-4">Kit & Category</th>
                <th className="py-3 px-4">Officer & Unit</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Location Geotag</th>
                <th className="py-3 px-4">Integrity Hash</th>
                <th className="py-3 px-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredRecords.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => navigate(`/record/${t.id}`)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                    {t.id}
                    <span className="block text-[11px] font-mono text-slate-400">{t.caseId}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-100">{t.testKit}</span>
                    <span className="block text-xs text-slate-400">{t.category}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-200 block">{t.officerName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{t.unitId}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge result={t.result} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                    <div>{t.date}</div>
                    <div className="text-[11px] text-slate-400">{t.time}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 max-w-xs truncate">
                    <div className="truncate">{t.location}</div>
                    <span className="text-[10px] font-mono text-slate-500">{t.gpsCoordinates}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.hash.slice(0, 10)}...{t.hash.slice(-6)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1">
                      Certificate
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
