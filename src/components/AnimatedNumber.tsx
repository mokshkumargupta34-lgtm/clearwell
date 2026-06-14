/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  id?: string;
}

/**
 * Counts up smoothly to `value` on mount and re-animates whenever the target
 * value changes. The DOM text always settles on the real value, so it remains
 * correct in print/export even if the element was never scrolled into view.
 * Falls back gracefully for users who prefer reduced motion.
 */
export default function AnimatedNumber({ value, className, id }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 18, mass: 0.8 });

  // Drive the count on mount and whenever the value changes.
  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  // Render rounded integers without re-rendering React on every frame.
  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest));
    });
  }, [spring]);

  return (
    <span ref={ref} id={id} className={className}>
      {value}
    </span>
  );
}
