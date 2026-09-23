import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  subtext?: string;
  tone?: 'default' | 'positive' | 'negative' | 'warning' | 'info';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  subtext,
  tone = 'default'
}) => {
  const toneMap = {
    default: {
      card: 'bg-slate-900/80 border-slate-800 text-slate-100',
      iconBg: 'bg-slate-800 text-slate-300',
      valueColor: 'text-slate-100'
    },
    positive: {
      card: 'bg-rose-950/20 border-rose-900/30 text-rose-100',
      iconBg: 'bg-rose-950/60 text-rose-400 border border-rose-800/40',
      valueColor: 'text-rose-400'
    },
    negative: {
      card: 'bg-emerald-950/20 border-emerald-900/30 text-emerald-100',
      iconBg: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40',
      valueColor: 'text-emerald-400'
    },
    warning: {
      card: 'bg-amber-950/20 border-amber-900/30 text-amber-100',
      iconBg: 'bg-amber-950/60 text-amber-400 border border-amber-800/40',
      valueColor: 'text-amber-400'
    },
    info: {
      card: 'bg-sky-950/20 border-sky-900/30 text-sky-100',
      iconBg: 'bg-sky-950/60 text-sky-400 border border-sky-800/40',
      valueColor: 'text-sky-400'
    }
  }[tone];

  return (
    <div className={`rounded-xl border p-4 sm:p-5 transition-all shadow-sm ${toneMap.card}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2 rounded-lg ${toneMap.iconBg}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-2xl sm:text-3xl font-bold tracking-tight font-mono ${toneMap.valueColor}`}>
          {value}
        </span>
      </div>
      {subtext && (
        <p className="mt-1 text-xs text-slate-400">
          {subtext}
        </p>
      )}
    </div>
  );
};
