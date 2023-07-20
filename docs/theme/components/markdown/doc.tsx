import Example from '../example';
import { Example as ExampleType } from 'docs/types';
import Anchor from 'docs/theme/layout/desktop/anchor';

interface DocProps {
  examples: ExampleType[];
}

const Doc = (props: DocProps) => {
  const { examples } = props;

  return (
    <div style={{ display: 'flex' }}>
      <div className='examples' style={{ flex: 1 }}>
        {examples.map((example, index) => {
          return <Example key={index} {...example} index={index}></Example>;
        })}
      </div>
      <div style={{ width: 192 }}>
        <Anchor></Anchor>
      </div>
    </div>
  );
};

export default Doc;
