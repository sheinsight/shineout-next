import { useState, useRef } from "react";
import useStyle from "../style";
import clsx from "clsx";

export interface ResizableProps {
  children?: [React.ReactNode, React.ReactNode];
  className?: string;
}

const Resizable = (props: ResizableProps) => {
  const { children, className } = props;

  const styles = useStyle();

  const containerRef = useRef<HTMLDivElement>(null);
  const [topHeight, setTopHeight] = useState(426);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const newHeight = e.clientY - containerRef.current.getBoundingClientRect().top;
    if (newHeight > 50 && newHeight < containerRef.current.offsetHeight - 50) {
      setTopHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className={clsx(styles.container, className)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className={styles.resizableTopBox}
        style={{ height: topHeight }}
      >
        {children?.[0]}
      </div>
      <div className={styles.divider} onMouseDown={handleMouseDown}/>
      <div className={styles.box}>
        {children?.[1]}
      </div>
    </div>
  )
}

export default Resizable;