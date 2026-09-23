import React from 'react';
import { SampleType } from '../../types';
import { FileText, ArrowLeft, ArrowRight, Hash } from 'lucide-react';

interface StepSampleCaseProps {
  caseId: string;
  sampleId: string;
  sampleType: SampleType;
  referenceNumber: string;
  onChangeField: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const SAMPLE_TYPES: SampleType[] = [
  'Powder',
  'Tablet',
  'Plant Material',
  'Liquid',
  'Other'
];

export const StepSampleCase: React.FC<StepSampleCaseProps> = ({
  caseId,
  sampleId,
  sampleType,
  referenceNumber,
  onChangeField,
  onNext,
  onBack
}) => {
  const isFormValid = caseId.trim() !== '' && sampleId.trim() !== '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Step 3: Sample & Case Details</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Enter official evidentiary chain-of-custody identifiers. No unnecessary personal info requested.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        
        {/* Case ID */}
        <div>
          <label htmlFor="case-id" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Case ID / FIR Number <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              id="case-id"
              type="text"
              value={caseId}
              onChange={(e) => onChangeField('caseId', e.target.value)}
              placeholder="e.g. CASE-2026-00125"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              required
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Station seizure registry or incident docket reference.
          </span>
        </div>

        {/* Sample ID & Reference No */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sample-id" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Sample ID <span className="text-rose-400">*</span>
            </label>
            <input
              id="sample-id"
              type="text"
              value={sampleId}
              onChange={(e) => onChangeField('sampleId', e.target.value)}
              placeholder="e.g. SMP-00125"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              required
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Physical evidence pouch barcode or tag.
            </span>
          </div>

          <div>
            <label htmlFor="reference-number" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Reference Number
            </label>
            <input
              id="reference-number"
              type="text"
              value={referenceNumber}
              onChange={(e) => onChangeField('referenceNumber', e.target.value)}
              placeholder="e.g. REF-FLD-925"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Internal field dispatch or interdiction code.
            </span>
          </div>
        </div>

        {/* Sample Type Dropdown */}
        <div>
          <label htmlFor="sample-type" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Sample Physical Type <span className="text-rose-400">*</span>
          </label>
          <select
            id="sample-type"
            value={sampleType}
            onChange={(e) => onChangeField('sampleType', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/50 font-medium"
          >
            {SAMPLE_TYPES.map(type => (
              <option key={type} value={type} className="bg-slate-900 text-slate-100">
                {type}
              </option>
            ))}
          </select>
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
          <span>Continue to Kit Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
