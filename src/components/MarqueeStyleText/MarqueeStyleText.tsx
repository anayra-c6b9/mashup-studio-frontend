import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./MarqueeStyleText.module.css";

interface MarqueeStyleTextProps {
  text: string;
  speed?: number;
  className: string;
}

const MarqueeStyleText: FC<MarqueeStyleTextProps> = ({
  text,
  speed = 60,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [duration, setDuration] = useState(0);

  const measure = () => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const overflow = textEl.scrollWidth > container.clientWidth + 1;
    setIsOverflowing(overflow);

    if (overflow) {
      const distance = textEl.scrollWidth + container.clientWidth;
      setDuration(distance / speed);
    } else {
      setDuration(0);
    }
  };

  useLayoutEffect(() => {
    measure();
  }, [text, speed]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className + " " + styles.container}
      style={{ ["--rmc-duration" as any]: `${duration}s` }}
    >
      <div
        ref={textRef}
        className={`${styles.text} ${isOverflowing ? styles.animate : ""}`}
      >
        {text}
      </div>
    </div>
  );
};
export default MarqueeStyleText;
