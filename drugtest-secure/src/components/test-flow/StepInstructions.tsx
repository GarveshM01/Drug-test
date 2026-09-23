import React from 'react';
import { Camera, ArrowLeft, CheckCircle2, ScanLine } from 'lucide-react';

interface StepInstructionsProps {
  onOpenCamera: () => void;
  onBack: () => void;
}

export const StepInstructions: React.FC<StepInstructionsProps> = ({
  onOpenCamera,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ScanLine className="w-5 h-5 text-sky-400" />
          <span>Step 5: Test Alignment Instructions</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Prepare the chemical reaction and align items before launching camera scan.
        </p>
      </div>

      {/* Primary Instruction Banner */}
      <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-800/40 text-sky-200 text-sm">
        <p className="font-semibold text-sky-300 text-base">
          "Place the test kit and reference colour card properly inside the camera frame."
        </p>
        <p className="text-xs text-sky-300/80 mt-1">
          The computer vision pipeline uses the reference card to normalize ambient lighting, glare, and shadow variations.
        </p>
      </div>

      {/* Visual Alignment Placeholder Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Frame Boundary Diagram */}
        <div className="w-full max-w-md aspect-video border-2 border-dashed border-sky-500/50 rounded-xl relative p-4 flex items-center justify-around bg-slate-950/80 shadow-2xl">
          
          {/* Corner Guides */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sky-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sky-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sky-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sky-400" />

          {/* Target 1: Reference Colour Card */}
          <div className="w-28 sm:w-36 h-36 sm:h-44 bg-slate-800 border-2 border-sky-400/80 rounded-lg p-2.5 flex flex-col justify-between shadow-lg shadow-sky-950/40">
            <div className="text-[10px] font-bold text-sky-300 uppercase tracking-wider text-center border-b border-slate-700 pb-1">
              REF CARD
            </div>
            {/* Color Swatch Indicators */}
            <div className="grid grid-cols-2 gap-1.5 py-1">
              <div className="h-5 rounded bg-white" />
              <div className="h-5 rounded bg-slate-400" />
              <div className="h-5 rounded bg-sky-500" />
              <div className="h-5 rounded bg-purple-600" />
            </div>
            <div className="text-[9px] font-mono text-slate-400 text-center">
              [ CALIBRATION ]
            </div>
          </div>

          {/* Target 2: Test Kit Reaction Tube */}
          <div className="w-24 sm:w-28 h-36 sm:h-44 bg-slate-800 border-2 border-emerald-400/80 rounded-lg p-2 flex flex-col items-center justify-between shadow-lg">
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider text-center border-b border-slate-700 pb-1 w-full">
              TEST KIT
            </div>
            
            {/* Test Ampoule diagram */}
            <div className="w-6 h-20 rounded-full border border-slate-500 bg-slate-900/80 relative flex items-end overflow-hidden p-0.5">
              <div className="w-full h-10 rounded-b-full bg-purple-600/90" />
            </div>

            <div className="text-[9px] font-mono text-emerald-400 text-center">
              [ REACTION ZONE ]
            </div>
          </div>

          {/* Alignment Crosshairs Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-8 h-8 border border-sky-400/40 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded border border-sky-400 bg-sky-950/60" />
            <span>Position Reference Card on Left</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded border border-emerald-400 bg-emerald-950/60" />
            <span>Hold Kit Ampoule on Right</span>
          </div>
        </div>
      </div>

      {/* Quick Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-400">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Even diffuse lighting</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Avoid harsh glare on glass</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Keep steady for 2 seconds</span>
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
          onClick={onOpenCamera}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md shadow-sky-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          <span>Open Camera</span>
        </button>
      </div>
    </div>
  );
};
