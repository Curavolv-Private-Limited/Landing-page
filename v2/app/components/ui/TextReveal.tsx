import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** 'words' (default) splits by word; 'chars' splits by character */
  mode?: 'words' | 'chars';
  staggerMs?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const ease = [0.22, 1, 0.36, 1] as const;

export function TextReveal({
  text,
  className,
  style,
  delay = 0,
  mode = 'words',
  staggerMs = 80,
  as: Tag = 'span',
}: TextRevealProps) {
  const tokens = mode === 'chars' ? text.split('') : text.split(' ');
  const staggerSec = staggerMs / 1000;

  return (
    // @ts-ignore — polymorphic tag
    <Tag className={className} style={{ ...style, overflow: 'hidden', display: 'block' }}>
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: delay + i * staggerSec, ease }}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {token}{mode === 'words' && i < tokens.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}
