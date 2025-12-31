import { useEffect } from 'react';
import classnames from 'clsx';
import { useSnapshot } from 'valtio';
import store, { dispatch, DocType } from '../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'shineout';
import useStyles from '../style';
import Locale from '../../locales';

const DocTabs = (props: { showGuide: boolean, showPlayground: boolean }) => {
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();
  const docsLocale = Locale({ locale: state.locales });
  const tabsLocale = docsLocale['shineout.tabs'];

  const classes = useStyles();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || state.doctab;

  const tabs: { name: string; path: DocType }[] = [
    { name: tabsLocale['exmples'], path: 'examples' },
    { name: tabsLocale['api'], path: 'api' },
    { name: tabsLocale['playground'], path: 'playground' },
    { name: tabsLocale['guide'], path: 'guide' },
    { name: tabsLocale['updateRecord'], path: 'changelog' },
  ];

  const handleChangeTab = (tab: DocType) => {
    dispatch.setDoctab(tab);

    navigate({
      search: `?tab=${tab}`,
    });
  };

  const renderTab = (name: string) => {
    return <div className={classnames(classes.tab)}>{name}</div>;
  };

  useEffect(() => {
    if (location.search) {
      if (activeTab && state.doctab !== activeTab) {
        dispatch.setDoctab(activeTab as DocType);
      }
    }
  }, [location.pathname]);
  return (
    <div className={classes.tabs}>
      <Tabs shape='fill' autoFill active={activeTab} onChange={handleChangeTab as (key: string | number) => void}>
        {tabs.map((tab, index) => {
          if (tab.path === 'guide' && !props.showGuide) return null;
          if (tab.path === 'playground' && !props.showPlayground) return null;

          return <Tabs.Panel key={index} tab={renderTab(tab.name)} id={tab.path}></Tabs.Panel>;
        })}
      </Tabs>
    </div>
  );
};

export default DocTabs;
