import React from 'react';
import { useLocation } from 'react-router-dom';
import useStyles from '../style';
import Title from '../title';
import { MarkdownProps } from 'docs/types';

import Doc from './doc';
import Api from './api';
import Playground from './playground';
import Guide from './guide';
import Changelog from './changelog';
import Semantic from './semantic';

const Markdown = (props: MarkdownProps) => {
  const { title, describe, examples, guides, api, changelog, header, semantic } = props;
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const activeTab = searchParams.get('tab');

  return (
    <div className={classes.pages}>
      <Title
        title={title}
        describe={describe}
        guides={guides}
        hasSemantic={!!semantic}
      ></Title>
      <React.Fragment key={header.name}>
        {activeTab === 'examples' && <Doc examples={examples} name={header.name}></Doc>}
        {activeTab === 'api' && <Api api={api}></Api>}
        {activeTab === 'guide' && <Guide guides={guides}></Guide>}
        {activeTab === 'changelog' && <Changelog changelog={changelog}></Changelog>}
        {activeTab === 'playground' && <Playground examples={examples[0]} api={api} name={header.name} />}
        {activeTab === 'semantic' && semantic && <Semantic schema={semantic} name={header.name} />}
      </React.Fragment>
    </div>
  );
};

export default Markdown;
