import useStyles from '../style';
import Title from '../title';
import Anchor from 'docs/theme/layout/desktop/anchor';
import { MarkdownProps } from 'docs/types';
import Example from '../example';

const Markdown = (props: MarkdownProps) => {
  const { title, describe, examples } = props;
  const classes = useStyles();
  return (
    <div className={classes.pages}>
      <Title title={title} describe={describe}></Title>
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
    </div>
  );
};

export default Markdown;
