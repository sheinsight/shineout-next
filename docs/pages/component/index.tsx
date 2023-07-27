import useStyles from '../style';

interface ComponentProps {
  children: React.ReactNode;
}

const Component = (props: ComponentProps) => {
  const classes = useStyles();

  return <div className={classes.component}>{props.children}</div>;
};

export default Component;
