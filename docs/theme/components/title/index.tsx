import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import useStyles from '../style';
import store from '../../store';
import { Header as HeaderProps } from 'docs/types';
import Tabs from './tabs';

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);

  const { describe, title, guides } = props;
  const headerClasses = classnames(classes.header, {
    [classes.stickyHeader]: state.scroll,
    // [classes.stickyHeader]: true,
  });
  const showGuide = guides && guides[state.locales] && guides[state.locales].length > 0;
  return (
    <>
      <div className={headerClasses} 
        // @ts-ignore
        style={window.__ALITA__ ? {top: '64px'} : {}}>
        <h1 className={classnames('title')}>{title[state.locales]}</h1>
        <p className='subtitle'>{describe[state.locales]}</p>
        <Tabs showGuide={showGuide}></Tabs>
      </div>
    </>
  );
};

export default Header;
