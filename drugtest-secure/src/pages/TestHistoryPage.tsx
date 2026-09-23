import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTests } from '../context/TestContext';
import { TestResult } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  ChevronRight, 
  FlaskConical, 
  Lock, 
  Clock, 
  RotateCcw,
  Download
} from 'lucide-react';

export const TestHistoryPage: React.FC = () => {
  const { records } = useTests();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<string>('ALL');
  const [selectedOfficer, setSelectedOfficer] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('ALL');

  // Unique officer list from records
  const officerOptions = useMemo(() => {
    const map = new Map<string, string>();
    records.forEach(r => map.set(r.officerId, r.officerName));
    return Array.from(map.entries());
  }, [records]);

  // Unique dates from records
  const dateOptions = useMemo(() => {
    const dates = new Set(records.map(r => r.date));
    return Array.from(dates);
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesCase = r.caseId.toLowerCase().includes(q);
        const matchesSample = r.sampleId.toLowerCase().includes(q);
        const matchesOfficer = r.officerName.toLowerCase().includes(q) || r.officerId.toLowerCase().includes(q);
        if (!matchesId && !matchesCase && !matchesSample && !matchesOfficer) {
          return false;
        }
      }

      // Result filter
      if (selectedResult !== 'ALL' && r.result !== selectedResult) {
        return false;
      }

      // Officer filter
      if (selectedOfficer !== 'ALL' && r.officerId !== selectedOfficer) {
        return false;
      }

      // Date filter
      if (selectedDate !== 'ALL' && r.date !== selectedDate) {
        return false;
      }

      return true;
    });
  }, [records, searchQuery, selectedResult, selectedOfficer, selectedDate]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedResult('ALL');
    setSelectedOfficer('ALL');
    setSelectedDate('ALL');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <FlaskConical className="w-6 h-6 text-sky-400" />
            <span>Field Test Registry & History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Searchable repository of all verified field tests with cryptographic integrity records.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Records: <strong className="text-sky-400">{filteredRecords.length}</strong> of {records.length}
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Test ID (e.g. FT-00124), Case ID, Sample ID, or Officer..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          
          {/* Result Filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Result Status
            </label>
            <select
              value={selectedResult}
              onChange={(e) => setSelectedResult(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <option value="ALL">All Results ({records.length})</option>
              <option value="Presumptive Positive">Presumptive Positive</option>
              <option value="Negative">Negative</option>
              <option value="Inconclusive">Inconclusive</option>
            </select>
          </div>

          {/* Officer Filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Field Officer
            </label>
            <select
              value={selectedOfficer}
              onChange={(e) => setSelectedOfficer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <option value="ALL">All Officers</option>
              {officerOptions.map(([id, name]) => (
                <option key={id} value={id}>
                  {name} ({id})
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Log Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <option value="ALL">All Dates</option>
              {dateOptions.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Reset filters shortcut if any filter active */}
        {(searchQuery || selectedResult !== 'ALL' || selectedOfficer !== 'ALL' || selectedDate !== 'ALL') && (
          <div className="flex justify-end pt-1">
            <button
              onClick={handleResetFilters}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Records Table / Card List */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-slate-300 text-sm font-medium">No matching test records found.</p>
            <p className="text-slate-500 text-xs">Try adjusting your search criteria or resetting filters.</p>
            <button
              onClick={handleResetFilters}
              className="mt-3 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Test ID / Case</th>
                    <th className="py-3 px-4">Kit & Category</th>
                    <th className="py-3 px-4">Result</th>
                    <th className="py-3 px-4">Officer</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Integrity</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredRecords.map((t) => (
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
                        <span className="block text-xs text-slate-400">
                          {t.category} ({t.sampleType})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge result={t.result} size="sm" />
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 font-medium block">{t.officerName}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{t.officerId}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                        <div>{t.date}</div>
                        <div className="text-[11px] text-slate-400">{t.time}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{t.integrity}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-xs font-medium text-sky-400 group-hover:text-sky-300 inline-flex items-center gap-1">
                          View
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List */}
            <div className="sm:hidden divide-y divide-slate-800/80">
              {filteredRecords.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigate(`/record/${t.id}`)}
                  className="p-4 hover:bg-slate-800/40 active:bg-slate-800 transition-colors cursor-pointer space-y-2.5"
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
                    <p className="text-sm font-semibold text-slate-100">{t.testKit}</p>
                    <p className="text-xs text-slate-400">
                      {t.category} • <span className="font-mono">{t.sampleType}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-mono">
                    <span>
                      {t.date} • {t.time}
                    </span>
                    <span className="text-slate-300">
                      {t.officerId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

    </div>
  );
};
