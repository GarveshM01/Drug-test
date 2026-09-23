import { TestResult } from '../types';

export function getResultBadgeStyles(result: TestResult) {
  switch (result) {
    case 'Presumptive Positive':
      return {
        bg: 'bg-rose-950/60',
        text: 'text-rose-300',
        border: 'border-rose-700/60',
        dot: 'bg-rose-400',
        accentBg: 'bg-rose-500/10'
      };
    case 'Negative':
      return {
        bg: 'bg-emerald-950/60',
        text: 'text-emerald-300',
        border: 'border-emerald-700/60',
        dot: 'bg-emerald-400',
        accentBg: 'bg-emerald-500/10'
      };
    case 'Inconclusive':
    default:
      return {
        bg: 'bg-amber-950/60',
        text: 'text-amber-300',
        border: 'border-amber-700/60',
        dot: 'bg-amber-400',
        accentBg: 'bg-amber-500/10'
      };
  }
}

export function getCurrentFormattedDateTime() {
  const now = new Date();
  const day = now.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 is 12

  return {
    date: `${day} ${month} ${year}`,
    time: `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`
  };
}

export function generateNextIds(existingCount: number) {
  const num = 125 + existingCount;
  return {
    testId: `FT-00${num}`,
    caseId: `CASE-2026-00${num}`,
    sampleId: `SMP-00${num}`,
    refNo: `REF-FLD-${num + 800}`
  };
}
