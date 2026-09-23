import React from 'react';
import { MOCK_KITS } from '../../data/mockData';
import { TestKitDefinition } from '../../types';
import { FlaskConical, CheckCircle2, Info } from 'lucide-react';

interface StepKitSelectionProps {
  selectedKitId: string;
  onSelectKit: (kit: TestKitDefinition) => void;
  onNext: () => void;
}

export const StepKitSelection: React.FC<StepKitSelectionProps> = ({
  selectedKitId,
  onSelectKit,
  onNext
}) => {
  const currentSelected = MOCK_KITS.find(k => k.id === selectedKitId) || MOCK_KITS[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-sky-400" />
          <span>Step 1: Select Test Kit</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Choose the verified colorimetric field testing kit batch deployed for this operation.
        </p>
      </div>

      {/* Select Test Kit Dropdown & Card Selection */}
      <div className="space-y-3">
        <label htmlFor="test-kit-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Select Test Kit (Prototype Designation)
        </label>
        
        <select
          id="test-kit-select"
          value={selectedKitId}
          onChange={(e) => {
            const found = MOCK_KITS.find(k => k.id === e.target.value);
            if (found) onSelectKit(found);
          }}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 font-medium"
        >
          {MOCK_KITS.map(kit => (
            <option key={kit.id} value={kit.id} className="bg-slate-900 text-slate-100 py-2">
              {kit.name} — {kit.formulation}
            </option>
          ))}
        </select>
      </div>

      {/* Detailed Kit Option Cards */}
      <div className="grid grid-cols-1 gap-3.5 pt-1">
        {MOCK_KITS.map(kit => {
          const isSelected = kit.id === selectedKitId;
          return (
            <div
              key={kit.id}
              onClick={() => onSelectKit(kit)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-sky-950/25 border-sky-500 ring-1 ring-sky-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100 text-sm sm:text-base">
                      {kit.name}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                      Standard Batch: {kit.defaultBatch}
                    </span>
                  </div>
                  <p className="text-xs text-sky-400/90 font-medium font-mono">
                    {kit.formulation}
                  </p>
                  <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                    {kit.description}
                  </p>
                </div>
                <div className="shrink-0 mt-0.5">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-600'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Compatible Category Tags */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Supported Categories:</span>
                {kit.compatibleCategories.map(cat => (
                  <span
                    key={cat}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <p>
          Kit profiles are calibrated against government standard reference color cards. Substance category options in the next step are dynamically filtered to match {currentSelected.name}.
        </p>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md shadow-sky-900/20 active:scale-[0.98]"
        >
          Confirm Kit & Continue →
        </button>
      </div>
    </div>
  );
};
