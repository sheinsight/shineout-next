import { useState, useEffect, useRef } from "react";
import { Progress, TYPE } from "shineout";

type PropgressType = TYPE.Progress.Props['type'];

export interface AutoProgressProps {
  target: number
  type: PropgressType
}

const AutoProgress = (props: AutoProgressProps) => {
  const { target, type } = props;
  const [value, setValue] = useState<number>(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const current = Math.floor(startValue + (target - startValue) * easeProgress);
      setValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target]);

  return (
    <Progress value={value} shape='line-inner' type={type}>{`${value}%`}</Progress>
  );
};

export default AutoProgress;