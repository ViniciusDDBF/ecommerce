import type { CinematicTitleProps, FC } from '@/types';
import { useEffect, useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';

export const CinematicTitle: FC<CinematicTitleProps> = ({
  text,
  className = '',
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const spans = titleRef.current?.querySelectorAll('span');
    spans?.forEach((span, i) => {
      span.style.setProperty('--delay', `${i * 0.05}s`);
    });
  }, []);

  return (
    <h1
      className={`text-charcoal-900 inline-flex text-4xl leading-tight font-bold tracking-tight wrap-break-word ${className}`}
      ref={titleRef}
    >
      {typeof text === 'string' &&
        text.split('').map((char) => (
          <span className="relative inline-block" key={nanoid()}>
            {/* ---------- Shadow behind letter ---------- */}
            <span
              className="absolute"
              style={{
                transform: 'translate(4px, 4px)',
                zIndex: -1,
                opacity: 0.7,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>

            {/* ---------- Actual letter with ember gradient ---------- */}
            <span className="text-gradient-ember">
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
    </h1>
  );
};
