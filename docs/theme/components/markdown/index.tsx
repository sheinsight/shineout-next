import useStyles from '../style';
import Title from '../title';
import { MarkdownProps } from 'docs/types';
import Example from '../example';

const Markdown = (props: MarkdownProps) => {
  const { title, describe, examples } = props;
  const classes = useStyles();
  return (
    <div className={classes.pages}>
      <Title title={title} describe={describe}></Title>
      {examples.map((example, index) => {
        return <Example key={index} {...example}></Example>;
      })}
    </div>
  );
};

export default Markdown;
