import { useEffect, useRef } from 'react';

export interface UpNumProps {
  target: number;
  isVisible: boolean;
}

const UpNum = (props: UpNumProps) => {
  const { target: targetOrigin, isVisible } = props;

  const numberRefs = useRef<HTMLElement | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isVisible || !targetOrigin) return
    const target = targetOrigin.toString().length > 4 ? parseFloat(targetOrigin.toString().slice(0, 2)) : targetOrigin

    const duration = 3000;
    const startTime = Date.now();
    const startValue = 0;
    const numberElement = numberRefs.current

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(startValue + (target - startValue) * easeProgress);

      if (numberElement) {
        let displayNum = current.toString();

        numberElement.textContent = displayNum;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isVisible, targetOrigin])
  
  return (
    <span ref={numberRefs}>0</span>
  )
}

export default UpNum;