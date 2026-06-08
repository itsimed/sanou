import { motion } from 'framer-motion';

export function CalendarNavigationButton({
  direction,
  onClick,
  disabled = false,
  ariaLabel,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      aria-label={ariaLabel}
      className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all ${
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : 'cursor-pointer hover:bg-white/10 focus:outline-2 focus:outline-violet-400'
      } border border-white/20 text-white`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="scale-150">
        <polyline points={direction === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}></polyline>
      </svg>
    </motion.button>
  );
}
