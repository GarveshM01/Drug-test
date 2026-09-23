import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  return (
    <div className={`rounded-lg border border-amber-600/40 bg-amber-950/20 text-amber-200/90 ${compact ? 'p-2.5 text-xs' : 'p-3.5 text-xs sm:text-sm'} flex items-start gap-2.5 shadow-sm`}>
      <ShieldAlert className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-amber-400 shrink-0 mt-0.5`} />
      <div className="leading-relaxed">
        <span className="font-semibold text-amber-300">Mandatory Operational Notice:</span>{' '}
        This is a presumptive field-test result and does not replace laboratory confirmatory testing. All evidentiary seizures must adhere to standard forensic chain-of-custody protocols.
      </div>
    </div>
  );
};
