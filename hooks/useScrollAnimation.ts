'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
  selector: string;
  from: gsap.TweenVars;
  trigger?: string;
  triggerStart?: string;
  delay?: number;
}

export function useScrollAnimations(animations: AnimationConfig[]) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animations.forEach(({ selector, from, trigger, triggerStart, delay }) => {
        const config: gsap.TweenVars = { ...from };

        if (trigger) {
          config.scrollTrigger = {
            trigger,
            start: triggerStart || 'top 85%',
          };
        }

        if (delay !== undefined) {
          config.delay = delay;
        }

        gsap.from(selector, config);
      });
    });

    return () => ctx.revert();
  }, [animations]);
}
