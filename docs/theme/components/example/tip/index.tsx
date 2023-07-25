import useStyles from '../style';

interface TipProps {
  text: string;
}

const Tip = (props: TipProps) => {
  const { text } = props;
  const classes = useStyles();

  return <code className={classes.tip}>{text}</code>;
};

export default Tip;
