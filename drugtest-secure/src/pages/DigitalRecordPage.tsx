import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTests } from '../context/TestContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Hash, 
  Copy, 
  Check, 
  Share2,
  FileCheck
} from 'lucide-react';

export const DigitalRecordPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecordById, records } = useTests();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const record = id ? getRecordById(id) : records[0];

  if (!record) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-400">Record not found.</p>
        <Link to="/history" className="text-sky-400 underline text-sm">
          Back to Test History
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(record.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Top Action Bar (Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <Link
          to="/history"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Test History</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-sky-950/40 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Printer className="w-4 h-4" />
            <span>Download / Print Record</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Container (Targeted by Print Styles) */}
      <div className="print-container bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative space-y-8">
        
        {/* Certificate Header Banner */}
        <div className="border-b-2 border-slate-700/80 pb-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>
          <span className="text-[11px] uppercase tracking-widest font-mono text-slate-400 block">
            CENTRAL FIELD INTERDICTION • DIGITAL FORENSIC CHAIN OF CUSTODY
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 uppercase">
            Colorimetric Field-Test Digital Verification Record
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
            <span>RECORD ID: <strong className="text-sky-400">{record.id}</strong></span>
            <span>•</span>
            <span>DOCKET: <strong className="text-slate-200">{record.caseId}</strong></span>
            <span>•</span>
            <span>PROTOCOL: <strong className="text-emerald-400">SIH-FT-v2.4</strong></span>
          </div>
        </div>

        {/* 2-Column Evidentiary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Test & Sample Information */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
                1. Test & Sample Information
              </span>
              <span className="text-[10px] font-mono text-slate-400">Chain Segment A</span>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              <div>
                <dt className="text-slate-400">Record ID</dt>
                <dd className="font-mono font-semibold text-slate-100">{record.id}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Case ID</dt>
                <dd className="font-mono font-semibold text-slate-100">{record.caseId}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Sample ID</dt>
                <dd className="font-mono font-semibold text-slate-100">{record.sampleId}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Reference Number</dt>
                <dd className="font-mono text-slate-200">{record.referenceNumber}</dd>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-800/60">
                <dt className="text-slate-400">Test Kit Deployed</dt>
                <dd className="font-medium text-slate-100">{record.testKit}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Test Category</dt>
                <dd className="font-semibold text-sky-300">{record.category}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Sample Type</dt>
                <dd className="font-medium text-slate-200">{record.sampleType}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Kit Batch Number</dt>
                <dd className="font-mono text-slate-200">{record.batchNumber}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Kit Expiry Date</dt>
                <dd className="font-mono text-slate-200">{record.expiryDate}</dd>
              </div>
            </dl>
          </div>

          {/* Section 2: Operator & Execution Telemetry */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
                2. Operator & Location Telemetry
              </span>
              <span className="text-[10px] font-mono text-slate-400">Chain Segment B</span>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              <div>
                <dt className="text-slate-400">Authorized Officer ID</dt>
                <dd className="font-mono font-semibold text-slate-100">{record.officerId}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Officer Name</dt>
                <dd className="font-medium text-slate-100">{record.officerName}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-400">Unit / Batch</dt>
                <dd className="font-medium text-slate-200">{record.unitId}</dd>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-800/60">
                <dt className="text-slate-400">Execution Date & Time</dt>
                <dd className="font-mono text-slate-200 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{record.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{record.time}</span>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-400">GPS Status & Geolocation</dt>
                <dd className="font-mono text-slate-200 flex items-start gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span>{record.gpsCoordinates} (Active Lock)</span>
                    <span className="block text-[11px] text-slate-400 font-sans">{record.location}</span>
                  </div>
                </dd>
              </div>
            </dl>
          </div>

        </div>

        {/* Section 3: Verified Result Finding */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Preliminary Verification Finding
            </span>
            <div className="flex items-center gap-3">
              <StatusBadge result={record.result} size="lg" />
              <span className="text-xs font-mono text-slate-300">
                Confidence: <strong className="text-sky-300">{record.confidence}%</strong>
              </span>
            </div>
            {record.notes && (
              <p className="text-xs text-slate-400 mt-2 max-w-xl">
                {record.notes}
              </p>
            )}
          </div>

          {/* QR Code Graphic Simulation */}
          <div className="text-center shrink-0 p-2.5 bg-white rounded-xl shadow-md border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="80" height="80">
              <rect width="100" height="100" fill="#ffffff" />
              <rect x="10" y="10" width="30" height="30" fill="#0f172a" />
              <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
              <rect x="20" y="20" width="10" height="10" fill="#0f172a" />
              
              <rect x="60" y="10" width="30" height="30" fill="#0f172a" />
              <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
              <rect x="70" y="20" width="10" height="10" fill="#0f172a" />

              <rect x="10" y="60" width="30" height="30" fill="#0f172a" />
              <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
              <rect x="20" y="70" width="10" height="10" fill="#0f172a" />

              <rect x="45" y="15" width="10" height="10" fill="#0f172a" />
              <rect x="45" y="35" width="10" height="10" fill="#0f172a" />
              <rect x="55" y="55" width="15" height="15" fill="#0f172a" />
              <rect x="75" y="65" width="15" height="15" fill="#0f172a" />
              <rect x="45" y="75" width="10" height="15" fill="#0f172a" />
            </svg>
            <span className="text-[9px] font-mono font-bold text-slate-800 block mt-1">
              DIGITAL SEAL
            </span>
          </div>
        </div>

        {/* Section 4: Cryptographic Image Integrity & SHA-256 Hash */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs uppercase font-bold text-slate-200 tracking-wider">
                Cryptographic Image Integrity Verification
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
              <span>Integrity Verified ✓</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 block font-medium">
              SHA-256 Image & Telemetry Digest:
            </span>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-3">
              <span className="font-mono text-xs sm:text-sm text-sky-300 break-all select-all flex-1">
                {record.hash}
              </span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="no-print p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                title="Copy SHA-256 Hash"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Simulation Notice: Record signature and image bytes are anchored to evidentiary hash sequence for court admissibility.
            </span>
          </div>

          {/* Captured Image Display */}
          {record.imageUrl && (
            <div className="pt-2">
              <span className="text-xs text-slate-400 block font-medium mb-2">
                Captured Colorimetric Photographic Frame:
              </span>
              <div className="rounded-xl overflow-hidden border border-slate-800 max-w-lg mx-auto bg-slate-950 flex items-center justify-center p-2 shadow-inner">
                <img
                  src={record.imageUrl}
                  alt="Captured colorimetric test kit and reference card"
                  className="w-full max-h-72 object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Statutory Legal Disclaimer */}
        <DisclaimerBanner />

        {/* Certificate Footer / Signature Blocks */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-8 text-xs font-mono">
          <div className="space-y-4">
            <div className="border-b border-dashed border-slate-700 pb-8 text-slate-500 text-[11px]">
              [ Digitally Recorded via Field App ]
            </div>
            <div>
              <p className="font-bold text-slate-200">{record.officerName}</p>
              <p className="text-slate-400">Reporting Field Officer (ID: {record.officerId})</p>
            </div>
          </div>

          <div className="space-y-4 text-right">
            <div className="border-b border-dashed border-slate-700 pb-8 text-slate-500 text-[11px]">
              [ SIH Prototype Digital Verification Registry ]
            </div>
            <div>
              <p className="font-bold text-slate-200">Narcotics Field Custody Protocol</p>
              <p className="text-slate-400">Timestamp: {record.date} {record.time}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
