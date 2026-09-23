import React from 'react';
import { MOCK_KITS, MOCK_SUBSTANCE_CATEGORIES } from '../../data/mockData';
import { Layers, ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface StepSubstanceProps {
  selectedKitId: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepSubstance: React.FC<StepSubstanceProps> = ({
  selectedKitId,
  selectedCategory,
  onSelectCategory,
  onNext,
  onBack
}) => {
  const currentKit = MOCK_KITS.find(k => k.id === selectedKitId) || MOCK_KITS[0];

  // Dynamically filter categories compatible with this selected kit
  const filteredCategories = MOCK_SUBSTANCE_CATEGORIES.filter(cat =>
    cat.compatibleKitIds.includes(selectedKitId)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>Step 2: Select Substance / Test Category</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Options dynamically calibrated for <strong className="text-slate-200">{currentKit.name}</strong>.
        </p>
      </div>

      {/* Selected Kit Context Pill */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">Active Kit Selection:</span>
        <span className="font-semibold text-sky-400 font-mono">{currentKit.name} ({currentKit.formulation})</span>
      </div>

      {/* Select Dropdown */}
      <div className="space-y-2">
        <label htmlFor="substance-category-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Target Substance Category (Prototype Profile)
        </label>
        <select
          id="substance-category-select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 font-medium"
        >
          {filteredCategories.map(cat => (
            <option key={cat.id} value={cat.name} className="bg-slate-900 text-slate-100">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 gap-3">
        {filteredCategories.map(cat => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-sky-950/25 border-sky-500 ring-1 ring-sky-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100 text-sm sm:text-base">
                      {cat.name}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cat.sampleReactionColor }} />
                    <span>Expected Positive Shift: {cat.positiveReactionDesc}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-600'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 flex items-start gap-2 text-xs text-amber-300/90">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          Prototype Notice: These representative categories simulate preliminary chemical screening in field conditions. Final identification requires central forensic laboratory GC-MS analysis.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md shadow-sky-900/20 active:scale-[0.98]"
        >
          Confirm Category →
        </button>
      </div>
    </div>
  );
};
