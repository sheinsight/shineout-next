import { useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import store, { Menu, dispatch } from '../../../store';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Locale from '../../../locales';
import { setConfig } from 'shineout';

import useStyles from '../style';

const MenuComponent = () => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const docsLocale = Locale({ locale: state.locales });
  const lan = params.lan === 'en' ? 'en-US' : 'zh-CN';
  const groupLocale = docsLocale['shineout.menu.group'];

  const handleClick = (component: Menu) => {
    dispatch.setDoctab('examples');
    navigate({
      pathname: `/${state.locales}/component/${state.doc}/${component.name}`,
      search: `?tab=examples`,
    });
    document.getElementById('layout')?.scrollTo(0, 0);
  };
  useEffect(() => {
    setConfig({ locale: lan });
  }, [lan]);

  useEffect(() => {
    dispatch.setMenu();
  }, []);

  const active = useMemo(() => {
    const paths = location.pathname.split('/');
    const componentName = paths[paths.length - 1];
    return componentName;
  }, [location.pathname]);
  return (
    <ul className={classes.menu}>
      {/* <li className='doc'>使用指南</li> */}
      {state.menu.map((item, index) => {
        return (
          <li key={index}>
            <div className={classnames('group', index === 0 ? 'first' : '')}>
              {groupLocale[item.group as keyof typeof groupLocale]}
            </div>
            <ul>
              {item.components.map((component, index) => {
                return (
                  component &&
                  component.title && (
                    <li
                      key={index}
                      onClick={() => handleClick(component)}
                      className={active === component.name ? 'active' : ''}
                    >
                      {component.title[state.locales]}
                    </li>
                  )
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuComponent;
