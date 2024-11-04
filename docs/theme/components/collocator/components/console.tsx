import { useEffect, useRef } from 'react';
import useStyle from '../style';
import { IConsole } from '../types';

export interface ConsoleProps {
  messages: IConsole[]
}

const Console = (props: ConsoleProps) => {
  const { messages } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const styles = useStyle();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div ref={containerRef} className={styles.console}>
      <div className={styles.consoleItem}>
        {
          `> Console.log...`
        }
      </div>
      {
        messages.map((item, index) => (
          <div key={index} className={styles.consoleItem}>
            {`> ${item.message}`}
          </div>
        ))
      }
    </div>
  )
}

export default Console;