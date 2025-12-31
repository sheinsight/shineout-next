import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useSnapshot } from 'valtio';
import store from '../../store';
import Code from './code';
import Copy from './copy';
import Open from './open';
import Debug from './debug';
import Tip from './tip';
import Codesandbox from './codesandbox';
import { Message } from 'shineout';

import { Example as ExampleProps } from 'docs/types';
import useStyles from './style';

const Example = (props: ExampleProps) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const hasDebug = !!searchParams.get('debug');

  const state = useSnapshot(store);
  const [open, setOpen] = useState(false);

  const { propName, propDescribe, component, code, className } = props;

  const defaultName = '';

  const Example = component;

  const describe = propDescribe[state.locales] || [];

  const onApiAnchorClick = (href: any) => {
    if(!href || href.startsWith('#')) return;
    navigate({
      search: `?tab=api&api=${href}`,
    });
  }

  const renderDescribe = (str: any) => {
    const regex = /(.*?)(<span>.*?<\/span>|$)/g;
    const result = [];
    for (const [, part, span] of str.matchAll(regex)) {
      if (part) {
        const textNode = (
          <React.Fragment
            key={result.length}
          >
            {part}
          </React.Fragment>
        );
        result.push(textNode);
      }
      if (span) {
        const spanRegex = /<span>(.*?)<\/span>/g;
        const spanMatch = spanRegex.exec(span);
        if (spanMatch) {
          const tipNode = <Tip key={result.length} text={spanMatch[1]} onClick={() => onApiAnchorClick(spanMatch[1])} />;
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
    Message.success('复制成功', 1, {
      hideClose: true,
    });
  };

  return (
    <div className={clsx(classes.example, className)}>
      <div className={classes.exampleHeader}>
        {(propName[state.locales] || defaultName) && (
          <h2
            className={clsx(classes.exampleTitle, 'anchor-title', classes.exampleAnchorTitle)}
            id={`example-${propName[state.locales] || defaultName}`}
          >
            {propName[state.locales] || defaultName}
          </h2>
        )}
      </div>
      <div className={classes.exampleDemo}>{Example && !hasDebug && <Example></Example>}</div>
      <div className={classes.exampleAction}>
        <div>
          {describe.map((item, index) => {
            return (
              <div className={classes.exampleDescribe} key={index}>
                {renderDescribe(item)}
              </div>
            );
          })}
        </div>
        <div className={classes.exampleActionButton}>
          <Codesandbox code={code} />
          <Debug example={Example} name={propName[state.locales] || defaultName}></Debug>
          <Copy onCopy={handleCopy}></Copy>
          <Open open={open} onClick={handleOpen}></Open>
        </div>
      </div>
      {open && (
        <div className={classes.exampleFooter}>
          <Code>{code}</Code>
        </div>
      )}
    </div>
  );
};

export default Example;
