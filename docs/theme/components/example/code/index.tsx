import { useEffect, useRef } from 'react';
import Prism from 'prismjs';

const Code = (props) => {
  const target = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <pre>
      <code ref={target} className='language-jsx'>
        {props.children}
      </code>
    </pre>
  );
};

export default Code;
