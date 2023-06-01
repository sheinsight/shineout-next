import { useSnapshot } from 'valtio';
import store from '../../store';

import useStyles from './style';

interface ExampleProps {
  example: any;
}

const Example = (props: ExampleProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);

  const { example } = props;
  const { prop, propName = { en: '', cn: '' }, propDescribe } = example;

  const Example = example.component.default;

  return (
    <div className={classes.example}>
      <div className='header'>
        <h2 className='title'>{propName[state.locales]}</h2>
        <p className='subtitle'>{propDescribe[state.locales]}</p>
      </div>
      <div className='demo'>
        <span className='prop'>{prop}</span>
        <Example></Example>
      </div>
      <div className='footer'></div>
    </div>
  );
};

export default Example;
