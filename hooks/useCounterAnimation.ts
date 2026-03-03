'use client';

import { useEffect, useRef } from 'react';

function easeOutQuart(t: number): number {
  return 1 - --t * t * t * t;
}

export function useCounterAnimation(containerSelector: string, valueSelector: string, duration = 1800) {
  const ran = useRef(false);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    const values = document.querySelectorAll<HTMLElement>(valueSelector);
    if (!container || !values.length) return;

    function animateValue(el: HTMLElement, target: number, suffix: string) {
      let startTime: number | null = null;
      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || ran.current) return;
          ran.current = true;
          values.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            const suffix = el.getAttribute('data-suffix') || '';
            if (isNaN(target)) return;
            animateValue(el, target, suffix);
          });
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerSelector, valueSelector, duration]);
}
