import useStyles from '../style';
import Title from '../title';
import { useSnapshot } from 'valtio';
import store from '../../store';
import { MarkdownProps } from 'docs/types';

import Doc from './doc';
import Api from './api';
import Guide from './guide';
import Changelog from './changelog';

const Markdown = (props: MarkdownProps) => {
  const { title, describe, examples, guides, api, changelog, header } = props;
  const classes = useStyles();
  const state = useSnapshot(store);
  return (
    <div className={classes.pages}>
      <Title title={title} describe={describe} guides={guides}></Title>
      {state.doctab === 'examples' && <Doc examples={examples} name={header.name}></Doc>}
      {state.doctab === 'api' && <Api api={api}></Api>}
      {state.doctab === 'guide' && <Guide guides={guides}></Guide>}
      {state.doctab === 'changelog' && <Changelog changelog={changelog}></Changelog>}
    </div>
  );
};

export default Markdown;
