import { useState } from 'react';
import classnames from 'classnames';
import useStyles from '../style';

const Tabs = () => {
  const [active, setActive] = useState('示例');

  const classes = useStyles();
  const tabs = ['示例', 'API', '指南', '更新记录'];

  const handleChangeTab = (tab: string) => {
    setActive(tab);
  };

  return (
    <div className={classes.tabs}>
      {tabs.map((tab, index) => {
        return (
          <span
            key={index}
            onClick={() => handleChangeTab(tab)}
            className={classnames(classes.tab, tab === active && 'active')}
          >
            {tab}
          </span>
        );
      })}
    </div>
  );
};

export default Tabs;
