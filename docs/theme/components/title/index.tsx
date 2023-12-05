import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import useStyles from '../style';
import store from '../../store';
import { Header as HeaderProps } from 'docs/types';
import Tabs from './tabs';

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);

  const { describe, title } = props;
  const headerClasses = classnames(classes.header, {
    // [classes.stickyHeader]: state.scroll,
    [classes.stickyHeader]: true,
  });
  return (
    <>
      <div className={headerClasses}>
        <h1 className={classnames('title')}>{title[state.locales]}</h1>
        <p className='subtitle'>{describe[state.locales]}</p>
        <Tabs></Tabs>
      </div>
    </>
  );
};

export default Header;
