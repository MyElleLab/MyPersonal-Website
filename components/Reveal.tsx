"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal. Carried from the studio site unchanged, including the
 * threshold and the root margin, because those two numbers are the difference
 * between an element that animates as it arrives and one that has already
 * finished before you can see it.
 *
 * The observer unobserves on first intersection: this is an entrance, not a
 * state that tracks the scroll position. Re-animating on scroll back up reads
 * as a glitch.
 *
 * The visual half lives in app/globals.css under `.reveal`, including the
 * reduced-motion escape hatch. Do not add the transition here as well.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  /** Milliseconds. Stagger siblings by passing 60 to 120 per step. */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          /* Set the delay at reveal time rather than in the class, so a
             staggered group starts counting from when it enters the viewport
             and not from page load. */
          (e.target as HTMLElement).style.transitionDelay = `${delay}ms`;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
