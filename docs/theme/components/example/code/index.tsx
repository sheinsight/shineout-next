import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Prism from 'prismjs';
import useStyles from '../style';
import 'prismjs/components/prism-jsx';

const Code = (props) => {
  const target = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={classes.code}>
      {/* <div className={classes.codeFile}></div> */}
      <pre className={classes.codeWrapper}>
        <code ref={target} className={clsx('language-jsx')}>
          {props.children}
        </code>
      </pre>
    </div>
  );
};

export default Code;
