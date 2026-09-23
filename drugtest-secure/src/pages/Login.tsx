import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, KeyRound, AlertTriangle, ArrowRight, Shield, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [officerId, setOfficerId] = useState('OFF-1023');
  const [unitId, setUnitId] = useState('BPL-CENTRAL-01');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState<string | null>(null);

  // If already logged in, navigate straight to /dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!officerId.trim()) {
      setError('Please enter a valid Officer ID.');
      return;
    }
    if (!pin.trim()) {
      setError('Please enter your security PIN.');
      return;
    }

    const success = login(officerId, unitId, pin);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid credentials. Use demo credentials below.');
    }
  };

  const handleFillDemo = () => {
    setOfficerId('OFF-1023');
    setUnitId('BPL-CENTRAL-01');
    setPin('1234');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand / Emblem */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-950/80 border border-sky-500/30 text-sky-400 shadow-xl shadow-sky-950/50">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            DrugTest <span className="text-sky-400">Secure</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Drug Field-Test Digital Verification System
          </p>
        </div>

        {/* Prototype Banner */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
            Prototype Login — SIH Demonstration
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Authorized Field Officer Terminal Verification
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Officer ID Field */}
            <div>
              <label htmlFor="login-officer-id" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Officer ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="login-officer-id"
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. OFF-1023"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  required
                />
              </div>
            </div>

            {/* Batch / Unit ID Field */}
            <div>
              <label htmlFor="login-unit-id" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Batch / Unit ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Shield className="w-4 h-4" />
                </div>
                <input
                  id="login-unit-id"
                  type="text"
                  value={unitId}
                  onChange={(e) => setUnitId(e.target.value)}
                  placeholder="e.g. BPL-CENTRAL-01"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  required
                />
              </div>
            </div>

            {/* Password / PIN Field */}
            <div>
              <label htmlFor="login-pin" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password / PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="login-pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  maxLength={10}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-900/30 flex items-center justify-center gap-2 active:scale-[0.99] mt-1"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Credentials Info Box */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Demo Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-medium underline"
              >
                Auto-fill Demo
              </button>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs font-mono text-slate-300 space-y-1">
              <div>Officer ID: <span className="text-sky-400 font-bold">OFF-1023</span></div>
              <div>Batch / Unit ID: <span className="text-slate-100">BPL-CENTRAL-01</span></div>
              <div>PIN: <span className="text-slate-100 font-bold">1234</span></div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-slate-500 text-center">
          Encrypted Field Terminal • Forensic Protocol Compliance v2.4
        </p>

      </div>
    </div>
  );
};
