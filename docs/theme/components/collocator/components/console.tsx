import { useEffect, useRef } from 'react';
import useStyle from '../style';
import { IConsole } from '../types';

export interface ConsoleProps {
  messages: IConsole[]
}

const Console = (props: ConsoleProps) => {
  const { messages } = props;

  const endRef = useRef<HTMLDivElement>(null)

  const styles = useStyle();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  return (
    <div className={styles.console}>
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
      <div ref={endRef}></div>
    </div>
  )
}

export default Console;