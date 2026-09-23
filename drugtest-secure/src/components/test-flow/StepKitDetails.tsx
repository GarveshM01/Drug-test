import React from 'react';
import { MOCK_KITS } from '../../data/mockData';
import { PackageCheck, ArrowLeft, ArrowRight, ShieldCheck, Calendar, Hash } from 'lucide-react';

interface StepKitDetailsProps {
  kitId: string;
  category: string;
  batchNumber: string;
  expiryDate: string;
  onChangeField: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepKitDetails: React.FC<StepKitDetailsProps> = ({
  kitId,
  category,
  batchNumber,
  expiryDate,
  onChangeField,
  onNext,
  onBack
}) => {
  const currentKit = MOCK_KITS.find(k => k.id === kitId) || MOCK_KITS[0];
  const isFormValid = batchNumber.trim() !== '' && expiryDate.trim() !== '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-sky-400" />
          <span>Step 4: Kit Details & Verification</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Verify reagent expiration and batch numbers to guarantee forensic admissibility.
        </p>
      </div>

      {/* Confirmation Summary Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4.5 space-y-3 shadow-inner">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Test Configuration Review</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Profile
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block">Selected Test Kit:</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{currentKit.name}</span>
            <span className="text-[11px] text-slate-400 font-mono">{currentKit.formulation}</span>
          </div>

          <div>
            <span className="text-slate-400 block">Target Substance Category:</span>
            <span className="font-semibold text-sky-400 mt-0.5 block">{category}</span>
            <span className="text-[11px] text-slate-400">Dynamic kit-calibrated mode</span>
          </div>
        </div>
      </div>

      {/* Batch & Expiry Inputs */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        
        {/* Kit Batch Number */}
        <div>
          <label htmlFor="batch-number" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Kit Batch Number <span className="text-rose-400">*</span></span>
            <button
              type="button"
              onClick={() => onChangeField('batchNumber', currentKit.defaultBatch)}
              className="text-[11px] text-sky-400 hover:text-sky-300 font-mono"
            >
              Autofill Standard ({currentKit.defaultBatch})
            </button>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Hash className="w-4 h-4" />
            </div>
            <input
              id="batch-number"
              type="text"
              value={batchNumber}
              onChange={(e) => onChangeField('batchNumber', e.target.value)}
              placeholder="e.g. KIT-B24-018"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              required
            />
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label htmlFor="expiry-date" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Kit Expiry Date <span className="text-rose-400">*</span></span>
            <button
              type="button"
              onClick={() => onChangeField('expiryDate', currentKit.defaultExpiry)}
              className="text-[11px] text-sky-400 hover:text-sky-300 font-mono"
            >
              Autofill ({currentKit.defaultExpiry})
            </button>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              id="expiry-date"
              type="date"
              value={expiryDate}
              onChange={(e) => onChangeField('expiryDate', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              required
            />
          </div>
          <span className="text-[11px] text-emerald-400/90 mt-1 block">
            Reagents within active shelf-life retain calibrated color response.
          </span>
        </div>

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
          disabled={!isFormValid}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-md ${
            isFormValid
              ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/20 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Continue to Test Instructions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
