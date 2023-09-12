import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import Code from './code';
import Copy from './copy';
import Open from './open';
import Tip from './tip';
import Codesandbox from './codesandbox';
import { Example as ExampleProps } from 'docs/types';
import useStyles from './style';

const Example = (props: ExampleProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const [open, setOpen] = useState(false);

  const { propName, propDescribe, component, code } = props;

  const defaultName = '';

  const Example = component;

  const describe = propDescribe[state.locales] || [];

  const renderDescribe = (str: any) => {
    const regex = /(.*?)(<span>.*?<\/span>|$)/g;
    const result = [];
    for (const [, part, span] of str.matchAll(regex)) {
      if (part) {
        const textNode = <React.Fragment key={result.length}>{part}</React.Fragment>;
        result.push(textNode);
      }
      if (span) {
        const spanRegex = /<span>(.*?)<\/span>/g;
        const spanMatch = spanRegex.exec(span);
        if (spanMatch) {
          const tipNode = <Tip key={result.length} text={spanMatch[1]}></Tip>;
          result.push(tipNode);
        }
      }
    }
    return result;
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCopy = () => {
    navigator?.clipboard?.writeText(code);
  };

  return (
    <div className={classes.example}>
      <div className='header'>
        <h2 className='title anchor-title' id={propName[state.locales] || defaultName}>
          {propName[state.locales] || defaultName}
        </h2>
      </div>
      <div className='demo'>{Example && <Example></Example>}</div>
      <div className='action'>
        <div>
          {describe.map((item, index) => {
            return (
              <p className='describe' key={index}>
                {renderDescribe(item)}
              </p>
            );
          })}
        </div>
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
