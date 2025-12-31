import { useState, useEffect } from 'react';
import classnames from 'clsx';
import Example from '../example';
import store, { dispatch } from '../../store';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { Example as ExampleType } from 'docs/types';
import Anchor from 'docs/theme/layout/desktop/anchor';
import useStyles from '../style';

interface DocProps {
  examples: ExampleType[];
  name: string;
}

const Doc = (props: DocProps) => {
  const { examples } = props;
  const classes = useStyles();
  const [anchor, setAnchor] = useState<string[]>([]);
  const [, setHash] = useState('');
  const location = useLocation();
  const state = useSnapshot(store);

  useEffect(() => {
    const anchors = examples.map((i) => i.propName[state.locales]);
    setAnchor(anchors);
    if (location.pathname.indexOf('/component') === -1) return;
    const hash = decodeURIComponent(location.hash)?.replace('#', '');
    const target = document.getElementById(`example-${hash}`);
    const layout = document.getElementById('layout');

    if (!hash) {
      setHash('');
      dispatch.setActiveAnchor('');
      if (target && layout) {
        layout?.scrollTo(0, 0);
      }
      return;
    }
    dispatch.setActiveAnchor(hash);
    setHash(hash);

    if (target && layout) {
      layout?.scrollTo(0, target?.offsetTop - 200);
    }
  }, [location]);

  return (
    <div className={classes.doc} id='doc'>
      <div className='examples' id={`examples-${props.name.toLocaleLowerCase()}`}>
        {examples.map((example, index) => {
          return (
            <Example
              className={classnames(
                examples[index + 1]?.propName[state.locales] ? '' : 'nearly',
                index === 0 ? 'first' : '',
                index === examples.length - 1 ? 'last' : '',
              )}
              key={index}
              {...example}
              index={index}
            ></Example>
          );
        })}
      </div>
      <div className='anchor'>
        <Anchor anchorName='example' data={anchor}></Anchor>
      </div>
    </div>
  );
};

export default Doc;
