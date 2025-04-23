import useStyles from '../style';
import { Tag } from 'shineout';

interface TipProps {
  text: string;
  onClick: () => void;
}

const Tip = (props: TipProps) => {
  const { text } = props;
  const classes = useStyles();

  // return <code className={classes.tip}>{text}</code>;
  return (
    <Tag className={classes.tip} size='small' color='info' onClick={props.onClick}>
      {text}
    </Tag>
  );
};

export default Tip;
