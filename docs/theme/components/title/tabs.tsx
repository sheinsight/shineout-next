import { useEffect } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import store, { dispatch, DocType } from '../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'shineout';
import useStyles from '../style';

const DocTabs = (props: { showGuide: boolean }) => {
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();

  const classes = useStyles();
  const tabs: { name: string; path: DocType }[] = [
    { name: '示例', path: 'examples' },
    { name: 'API', path: 'api' },
    { name: '指南', path: 'guide' },
    { name: '更新记录', path: 'changelog' },
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
