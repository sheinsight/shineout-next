import { useState } from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import Code from './code';
import Copy from './copy';
import Open from './open';
import Codesandbox from './codesandbox';
import { Example as ExampleProps } from 'docs/types';
import useStyles from './style';

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
        {/* <p className='subtitle'>{propDescribe[state.locales] || `${defaultName} Describe`}</p> */}
      </div>
      <div className='demo'>
        <Example></Example>
      </div>
      <div className='action'>
        {propDescribe[state.locales] || `${defaultName} Describe`}
        <div className='btn'>
          <Codesandbox></Codesandbox>
          <Open onClick={handleOpen}></Open>
          <Copy onCopy={handleCopy}></Copy>
        </div>
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
