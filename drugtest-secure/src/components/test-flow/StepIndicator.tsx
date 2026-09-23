import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  steps?: { title: string; short: string }[];
}

const DEFAULT_STEPS = [
  { title: 'Select Kit', short: 'Kit' },
  { title: 'Substance Category', short: 'Substance' },
  { title: 'Sample & Case', short: 'Sample' },
  { title: 'Kit Details', short: 'Details' },
  { title: 'Instructions', short: 'Guide' },
  { title: 'Camera Scan', short: 'Scan' },
  { title: 'AI Analysis', short: 'Analysis' }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps = DEFAULT_STEPS
}) => {
  return (
    <div className="w-full">
      {/* Mobile Compact Progress Bar */}
      <div className="sm:hidden mb-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
          <span>Step {currentStep} of {steps.length}: <strong className="text-sky-400 font-semibold">{steps[currentStep - 1]?.title}</strong></span>
          <span className="font-mono text-slate-400">{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-sky-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Tablet & Desktop Step Train */}
      <div className="hidden sm:flex items-center justify-between relative mb-6">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-slate-800 z-0" />
        
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isDone = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step.title} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all border-2 ${
                  isDone
                    ? 'bg-sky-500 border-sky-400 text-white'
                    : isCurrent
                    ? 'bg-slate-900 border-sky-400 text-sky-400 ring-4 ring-sky-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : stepNumber}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-sky-300 font-semibold'
                    : isDone
                    ? 'text-slate-300'
                    : 'text-slate-400'
                }`}
              >
                {step.short}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
