import useStyles from '../style';
import ShineoutComponent from '../../../../pages/Component/index';

const Content = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <ShineoutComponent></ShineoutComponent>
    </div>
  );
};

export default Content;
