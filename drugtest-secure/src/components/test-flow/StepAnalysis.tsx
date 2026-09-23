import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Cpu, ShieldCheck } from 'lucide-react';

interface StepAnalysisProps {
  capturedImage: string | null;
  onAnalysisComplete: () => void;
}

interface AnalysisStepItem {
  id: number;
  label: string;
  detail: string;
}

const ANALYSIS_STEPS: AnalysisStepItem[] = [
  { id: 1, label: 'Image captured & buffered', detail: 'Resolution 640x480 RGB array ingested' },
  { id: 2, label: 'Reference card detected', detail: '4/4 calibration fiducials located' },
  { id: 3, label: 'Image quality checked', detail: 'Exposure, contrast & glare thresholds validated' },
  { id: 4, label: 'Colour calibration', detail: 'White-point balanced; CIE L*a*b* space transformed' },
  { id: 5, label: 'Test area analysed', detail: 'Colorimetric shift matched against verified kit matrix' }
];

export const StepAnalysis: React.FC<StepAnalysisProps> = ({
  capturedImage,
  onAnalysisComplete
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex(prev => {
        if (prev < ANALYSIS_STEPS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  // When all steps are done, wait 600ms and trigger onAnalysisComplete
  useEffect(() => {
    if (activeStepIndex >= ANALYSIS_STEPS.length) {
      const timeout = setTimeout(() => {
        onAnalysisComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [activeStepIndex, onAnalysisComplete]);

  return (
    <div className="max-w-xl mx-auto space-y-6 py-4">
      <div className="text-center">
        <div className="inline-flex p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-3 shadow-inner">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          Colorimetric AI Analysis Simulation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Calibrating sample hue shift against standard reference reflectance profile.
        </p>
      </div>

      {/* Frame Preview with Scanning Overlay */}
      {capturedImage && (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
          <img
            src={capturedImage}
            alt="Sample Under Analysis"
            className="w-full h-full object-contain opacity-60"
          />
          {/* Animated Scan Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-bounce" />
          
          <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700 rounded-md px-2 py-0.5 text-[10px] font-mono text-sky-300">
            PROCESSING CV PIPELINE
          </div>
        </div>
      )}

      {/* Analysis Telemetry Checklist */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Verification Telemetry Checklist
          </span>
          <span className="text-[11px] font-mono text-sky-400">
            {Math.min(activeStepIndex, ANALYSIS_STEPS.length)} / {ANALYSIS_STEPS.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isCompleted = activeStepIndex > idx;
            const isProcessing = activeStepIndex === idx;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200'
                    : isProcessing
                    ? 'bg-sky-950/20 border-sky-800/50 text-slate-100 ring-1 ring-sky-500/30'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isProcessing ? (
                    <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-700" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-semibold ${
                      isCompleted ? 'text-emerald-300' : isProcessing ? 'text-sky-300' : 'text-slate-400'
                    }`}>
                      {isCompleted && '✓ '}{step.label}
                    </span>
                    {isProcessing && (
                      <span className="text-[10px] font-mono text-sky-400 animate-pulse">
                        Analyzing...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prototype Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
        <p className="text-[11px] text-slate-400">
          <strong className="text-slate-300">Prototype Notice:</strong> This is a mock AI analysis for the SIH frontend prototype. No unsupported medical or chemical detection claims are made.
        </p>
        <button
          onClick={onAnalysisComplete}
          className="mt-2 text-xs text-sky-400 hover:text-sky-300 underline font-mono"
        >
          [ Skip to Result ]
        </button>
      </div>
    </div>
  );
};
