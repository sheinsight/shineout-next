import { useEffect } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import store, { dispatch, DocType } from '../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'shineout';
import useStyles from '../style';
import { getLocale, useConfig } from 'base'; 

const DocTabs = (props: { showGuide: boolean }) => {
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useConfig();

  const classes = useStyles();
  const tabs: { name: string; path: DocType }[] = [
    { name: getLocale(locale, 'exmples'), path: 'examples' },
    { name: getLocale(locale, 'api'), path: 'api' },
    { name: getLocale(locale, 'guide'), path: 'guide' },
    { name: getLocale(locale, 'updateRecord'), path: 'changelog' },
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
      const searchParams = new URLSearchParams(location.search);
      const params = searchParams.get('tab');
      if (params) {
        dispatch.setDoctab(params as DocType);
      }
    }
  }, [location.pathname]);

  return (
    <div className={classes.tabs}>
      <Tabs shape='fill' autoFill active={state.doctab} onChange={handleChangeTab}>
        {tabs.map((tab, index) => {
          if (tab.path === 'guide' && !props.showGuide) return null;

          return <Tabs.Panel key={index} tab={renderTab(tab.name)} id={tab.path}></Tabs.Panel>;
        })}
      </Tabs>
    </div>
  );
};

export default DocTabs;
