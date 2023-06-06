import { useState } from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import Code from './code';
import Copy from './copy';
import Ue from './ue';
import Open from './open';
import Codesandbox from './codesandbox';

import useStyles from './style';

interface ExampleProps {
  example: any;
}

const Example = (props: ExampleProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const [open, setOpen] = useState(false);

  const { example } = props;
  const { prop, propName = { en: '', cn: '' }, propDescribe, code } = example;

  const Example = example.component.default;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCopy = () => {
    navigator?.clipboard?.writeText(code);
  };

  return (
    <div className={classes.example}>
      <div className='header'>
        <h2 className='title' id={propName[state.locales]}>
          {propName[state.locales]}
        </h2>
        <p className='subtitle'>{propDescribe[state.locales]}</p>
      </div>
      <div className='demo'>
        <span className='prop'>{prop}</span>
        <Example></Example>
      </div>
      <div className='action'>
        <Open onClick={handleOpen}></Open>
        <Copy onCopy={handleCopy}></Copy>
        <Codesandbox></Codesandbox>
        {state.env === 'SHEIN' && <Ue></Ue>}
      </div>
      {open && (
        <div className='footer'>
          <Code>{code}</Code>
        </div>
      )}
    </div>
  );
};

export default Example;
