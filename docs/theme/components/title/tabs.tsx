import { useEffect } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import store, { dispatch, DocType } from '../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from '../style';

const Tabs = () => {
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

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const params = searchParams.get('tab');
      if (params) {
        dispatch.setDoctab(params as DocType);
      }
    }
  }, []);

  return (
    <div className={classes.tabs}>
      {tabs.map((tab, index) => {
        return (
          <span
            key={index}
            onClick={() => handleChangeTab(tab.path)}
            className={classnames(classes.tab, tab.path === state.doctab && 'active')}
          >
            {tab.name}
          </span>
        );
      })}
    </div>
  );
};

export default Tabs;
