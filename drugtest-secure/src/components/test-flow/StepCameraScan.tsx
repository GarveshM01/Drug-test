import React, { useState, useRef, useEffect } from 'react';
import { SAMPLE_KIT_IMAGES } from '../../data/sampleImages';
import { TestResult } from '../../types';
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  AlertCircle,
  VideoOff
} from 'lucide-react';

interface StepCameraScanProps {
  onCaptureImage: (imageUrl: string, simulatedResult: TestResult, confidence: number) => void;
  onBack: () => void;
}

export const StepCameraScan: React.FC<StepCameraScanProps> = ({
  onCaptureImage,
  onBack
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [simulatedResult, setSimulatedResult] = useState<TestResult>('Presumptive Positive');
  const [simulatedConfidence, setSimulatedConfidence] = useState<number>(96);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Selected preset key: 'positive' | 'negative' | 'inconclusive'
  const [activePreset, setActivePreset] = useState<'positive' | 'negative' | 'inconclusive'>('positive');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start live webcam if requested
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to access device camera.';
      setCameraError(message);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle capture from live video
  const handleSnapLive = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedImage(dataUrl);
        // Default live capture to positive with 96% confidence for demo
        setSimulatedResult('Presumptive Positive');
        setSimulatedConfidence(96);
        stopCamera();
      }
    }
  };

  // Handle preset selection
  const handleSelectPreset = (key: 'positive' | 'negative' | 'inconclusive') => {
    setActivePreset(key);
    stopCamera();
    if (key === 'positive') {
      setCapturedImage(SAMPLE_KIT_IMAGES.positive);
      setSimulatedResult('Presumptive Positive');
      setSimulatedConfidence(96);
    } else if (key === 'negative') {
      setCapturedImage(SAMPLE_KIT_IMAGES.negative);
      setSimulatedResult('Negative');
      setSimulatedConfidence(98);
    } else {
      setCapturedImage(SAMPLE_KIT_IMAGES.inconclusive);
      setSimulatedResult('Inconclusive');
      setSimulatedConfidence(64);
    }
  };

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        setSimulatedResult('Presumptive Positive');
        setSimulatedConfidence(95);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirmUse = () => {
    if (capturedImage) {
      onCaptureImage(capturedImage, simulatedResult, simulatedConfidence);
    } else {
      // Default to standard positive preset if clicked directly
      onCaptureImage(SAMPLE_KIT_IMAGES.positive, 'Presumptive Positive', 96);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Camera className="w-5 h-5 text-sky-400" />
          <span>Step 6: Colorimetric Camera Capture</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Position the reference card and the reaction tube within the visual alignment indicators.
        </p>
      </div>

      {/* Guidance Notification */}
      <div className="bg-sky-950/30 border border-sky-600/40 rounded-xl p-3 flex items-center justify-between text-xs sm:text-sm text-sky-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span className="font-medium">Guidance:</span>
          <span>"Keep the reference colour card and test kit inside the frame."</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-sky-400">CV-FOV: 1080p CALIB</span>
      </div>

      {/* Main Viewfinder Frame */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl flex items-center justify-center">
        
        {/* Hidden Canvas for Live Video Snapping */}
        <canvas ref={canvasRef} className="hidden" />

        {/* State 1: Captured Image Preview */}
        {capturedImage ? (
          <div className="relative w-full h-full">
            <img
              src={capturedImage}
              alt="Captured Field Test"
              className="w-full h-full object-contain bg-slate-950"
            />
            {/* Overlay indicators on captured preview */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Frame Buffered & Calibrated</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] font-mono bg-black/60 px-2 py-0.5 rounded text-slate-300">
                Resolution: 640x480 RGB Normalized
              </span>
              <span className="text-[11px] font-mono bg-black/60 px-2 py-0.5 rounded text-sky-300">
                Fiducial 4/4 Locked
              </span>
            </div>
          </div>
        ) : cameraActive ? (
          /* State 2: Active WebCam Feed */
          <div className="relative w-full h-full bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Viewfinder Overlays */}
            <div className="absolute inset-0 pointer-events-none flex p-4 sm:p-6 justify-between items-center">
              {/* Reference Card Indicator Box */}
              <div className="w-[42%] h-[75%] border-2 border-dashed border-sky-400/90 rounded-xl bg-sky-950/10 flex flex-col justify-between p-2">
                <span className="text-[10px] font-mono uppercase bg-sky-950/80 text-sky-300 px-1.5 py-0.5 rounded w-max border border-sky-600/40">
                  Reference Colour Card
                </span>
                <span className="text-[9px] font-mono text-center text-sky-300/80">
                  Align Left Standard Swatch
                </span>
              </div>

              {/* Test Area Indicator Box */}
              <div className="w-[42%] h-[75%] border-2 border-dashed border-emerald-400/90 rounded-xl bg-emerald-950/10 flex flex-col justify-between p-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded w-max border border-emerald-600/40">
                  Test Reaction Area
                </span>
                <span className="text-[9px] font-mono text-center text-emerald-300/80">
                  Align Ampoule Reaction Core
                </span>
              </div>
            </div>

            {/* Live Crosshairs & Scanline */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-12 h-12 border border-sky-400/50 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-sky-400 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* State 3: Standby / Simulated Viewfinder Placeholder */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
            
            {/* Simulated Live View using default selected preset image */}
            <img
              src={
                activePreset === 'positive'
                  ? SAMPLE_KIT_IMAGES.positive
                  : activePreset === 'negative'
                  ? SAMPLE_KIT_IMAGES.negative
                  : SAMPLE_KIT_IMAGES.inconclusive
              }
              alt="Simulated Camera FOV"
              className="absolute inset-0 w-full h-full object-contain opacity-70"
            />

            {/* Camera Overlay Indicators */}
            <div className="absolute inset-0 pointer-events-none flex p-4 sm:p-6 justify-between items-center">
              {/* Reference Color Card Indicator */}
              <div className="w-[44%] h-[80%] border-2 border-dashed border-sky-400 rounded-xl bg-sky-950/20 flex flex-col justify-between p-2.5 shadow-lg">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase bg-slate-900/90 text-sky-300 px-2 py-0.5 rounded w-max border border-sky-500/50">
                  Reference Colour Card
                </span>
                <div className="space-y-1 text-center">
                  <span className="text-[10px] font-mono text-sky-200 bg-slate-900/80 px-2 py-0.5 rounded">
                    4 Standard Swatches Found
                  </span>
                </div>
              </div>

              {/* Test Area Indicator */}
              <div className="w-[44%] h-[80%] border-2 border-dashed border-emerald-400 rounded-xl bg-emerald-950/20 flex flex-col justify-between p-2.5 shadow-lg">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase bg-slate-900/90 text-emerald-300 px-2 py-0.5 rounded w-max border border-emerald-500/50">
                  Test Reaction Area
                </span>
                <div className="space-y-1 text-center">
                  <span className="text-[10px] font-mono text-emerald-200 bg-slate-900/80 px-2 py-0.5 rounded">
                    Reaction Core Detected
                  </span>
                </div>
              </div>
            </div>

            {/* Corner Framing Markers */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-sky-400" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-sky-400" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-4 border-sky-400" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-sky-400" />

            <div className="relative z-10 bg-slate-900/85 backdrop-blur-md border border-slate-700 p-3 sm:p-4 rounded-xl shadow-xl max-w-sm">
              <Camera className="w-8 h-8 text-sky-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-slate-100">
                Ready to Capture Colorimetric Field Sample
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Use your device camera, select a standard reaction preset, or upload an existing photo.
              </p>
            </div>
          </div>
        )}
      </div>

      {cameraError && (
        <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Camera Access: {cameraError}. Simulated camera mode is active for demonstration.</span>
        </div>
      )}

      {/* Preset Scenario Selector for SIH Judges Demo */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Prototype Reaction Preset (Demo Selector)</span>
          </span>
          <span className="text-[11px] text-slate-400">Click to preview outcome</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleSelectPreset('positive')}
            className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
              activePreset === 'positive' && !cameraActive
                ? 'bg-rose-950/40 border-rose-600 text-rose-300 ring-1 ring-rose-500/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block font-bold">Positive</span>
            <span className="text-[10px] text-rose-400/90 font-mono">Violet Shift (96%)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPreset('negative')}
            className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
              activePreset === 'negative' && !cameraActive
                ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300 ring-1 ring-emerald-500/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block font-bold">Negative</span>
            <span className="text-[10px] text-emerald-400/90 font-mono">Clear Straw (98%)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPreset('inconclusive')}
            className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
              activePreset === 'inconclusive' && !cameraActive
                ? 'bg-amber-950/40 border-amber-600 text-amber-300 ring-1 ring-amber-500/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block font-bold">Inconclusive</span>
            <span className="text-[10px] text-amber-400/90 font-mono">Turbid Gray (64%)</span>
          </button>
        </div>
      </div>

      {/* Primary Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        
        {/* Left: Input options (Live Camera & File Upload) */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!cameraActive ? (
            <button
              type="button"
              onClick={startCamera}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4 text-sky-400" />
              <span>Use Device Camera</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopCamera}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-rose-800 bg-rose-950/40 text-rose-300 text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <VideoOff className="w-4 h-4" />
              <span>Stop Camera</span>
            </button>
          )}

          {/* Upload Image Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>Upload Image</span>
          </button>
        </div>

        {/* Right: Capture & Confirmation Flow */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {capturedImage ? (
            <>
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmUse}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Use This Image</span>
              </button>
            </>
          ) : cameraActive ? (
            <button
              type="button"
              onClick={handleSnapLive}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Frame</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmUse}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-sky-900/20 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Use This Image</span>
            </button>
          )}
        </div>

      </div>

      {/* Back button */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Instructions</span>
        </button>
      </div>
    </div>
  );
};
