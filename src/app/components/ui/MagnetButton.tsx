import { motion, useMotionValue, useSpring } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface MagnetButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number; /** px of max magnetic pull, default 18 */
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function MagnetButton({
  children,
  className = '',
  strength = 18,
  onClick,
  type = 'button',
  disabled,
}: MagnetButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { type: 'spring', stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { type: 'spring', stiffness: 300, damping: 20, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35 * (strength / 18));
    y.set((e.clientY - cy) * 0.35 * (strength / 18));
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY, willChange: 'transform' }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
