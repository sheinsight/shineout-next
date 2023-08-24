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
  const { title, describe, examples, guides, api } = props;
  const classes = useStyles();
  const state = useSnapshot(store);
  const apiObj = JSON.parse(api as any);
  return (
    <div className={classes.pages}>
      <Title title={title} describe={describe}></Title>
      {state.doctab === 'examples' && <Doc examples={examples}></Doc>}
      {state.doctab === 'api' && <Api api={apiObj}></Api>}
      {state.doctab === 'guide' && <Guide guides={guides}></Guide>}
      {state.doctab === 'changelog' && <Changelog></Changelog>}
    </div>
  );
};

export default Markdown;
