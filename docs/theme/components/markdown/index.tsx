import React from 'react';
import { useLocation } from 'react-router-dom';
import useStyles from '../style';
import Title from '../title';
import { MarkdownProps } from 'docs/types';

import Doc from './doc';
import Api from './api';
import Guide from './guide';
import Changelog from './changelog';

const Markdown = (props: MarkdownProps) => {
  const { title, describe, examples, guides, api, changelog, header } = props;
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const activeTab = searchParams.get('tab');

  return (
    <div className={classes.pages}>
      <Title title={title} describe={describe} guides={guides}></Title>
      <React.Fragment key={header.name}>
        {activeTab === 'examples' && <Doc examples={examples} name={header.name}></Doc>}
        {activeTab === 'api' && <Api api={api}></Api>}
        {activeTab === 'guide' && <Guide guides={guides}></Guide>}
        {activeTab === 'changelog' && <Changelog changelog={changelog}></Changelog>}
      </React.Fragment>
    </div>
  );
};

export default Markdown;
