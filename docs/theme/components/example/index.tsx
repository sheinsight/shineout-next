import { useSnapshot } from 'valtio';
import store from '../../store';
import Code from './code';
import Copy from './copy';
import Ue from './ue';
import Codesandbox from './codesandbox';

import useStyles from './style';

interface ExampleProps {
  example: any;
}

const Example = (props: ExampleProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);

  const { example } = props;
  const { prop, propName = { en: '', cn: '' }, propDescribe, code } = example;

  const Example = example.component.default;

  return (
    <div className={classes.example}>
      <div className='header'>
        <h2 className='title' id={propName[state.locales]}>
          {propName[state.locales]}
        </h2>
        <p className='subtitle'>{propDescribe[state.locales]}</p>
      </div>
      <div className='demo'>
        <span className='prop'>{prop}</span>
        <Example></Example>
      </div>
      <div className='action'>
        <Copy></Copy>
        <Codesandbox></Codesandbox>
        {state.env === 'SHEIN' && <Ue></Ue>}
      </div>
      <div className='footer'>
        <Code>{code}</Code>
      </div>
    </div>
  );
};

export default Example;
