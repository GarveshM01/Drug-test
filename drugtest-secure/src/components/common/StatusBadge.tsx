import React from 'react';
import { TestResult } from '../../types';
import { getResultBadgeStyles } from '../../utils/formatters';

interface StatusBadgeProps {
  result: TestResult;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  result,
  size = 'md',
  showDot = true
}) => {
  const styles = getResultBadgeStyles(result);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-2',
    lg: 'text-sm sm:text-base px-3.5 py-1.5 gap-2.5 font-medium'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${styles.dot} animate-pulse`} />
      )}
      <span>{result}</span>
    </span>
  );
};
