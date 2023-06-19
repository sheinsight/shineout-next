import { useState } from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import Code from './code';
import Copy from './copy';
import Ue from './ue';
import Open from './open';
import Codesandbox from './codesandbox';
import { Example as ExampleProps } from 'docs/types';
import useStyles from './style';
import { StyleProvider } from '@sheinx/shineout-style';

const Example = (props: ExampleProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const [open, setOpen] = useState(false);

  const { propName, propDescribe, component, code, index } = props;

  const defaultName = `Example ${index + 1}`;

  const Example = component;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCopy = () => {
    navigator?.clipboard?.writeText(code);
  };

  return (
    <div className={classes.example}>
      <div className='header'>
        <h2 className='title' id={propName[state.locales] || defaultName}>
          {propName[state.locales] || defaultName}
        </h2>
        <p className='subtitle'>{propDescribe[state.locales] || `${defaultName} Describe`}</p>
      </div>
      <div className='demo'>
        {/* <span className='prop'>{prop}</span> */}
        <StyleProvider>
          <Example></Example>
        </StyleProvider>
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
