import { useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import store, { Menu, dispatch } from '../../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import Locale from '../../../locales';
import { Tag, setConfig } from 'shineout';
import FloatMenu from '../float/menu';

import useStyles from '../style';

const devGuide = [
  {
    title: {
      cn: '快速上手',
      en: 'Quick Start',
    },
    name: 'start',
  },
  {
    title: {
      cn: 'SSR',
      en: 'SSR',
    },
    name: 'ssr',
  },
  {
    title: {
      cn: '国际化',
      en: 'Internationalization',
    },
    name: 'i18n',
  },
  {
    title: {
      cn: '自定义 Icon',
      en: 'Custom Icon',
    },
    name: 'icons',
  },
  {
    title: {
      cn: '全局配置',
      en: 'Config',
    },
    name: 'config',
  },
  {
    title: {
      cn: '主题配置',
      en: 'Theme',
    },
    name: 'theme',
  },
  {
    title: {
      cn: '更新日志',
      en: 'Changelog',
    },
    name: 'changelog',
  },
  {
    title: {
      cn: '迁移指南',
      en: 'Migration',
    },
    name: 'migration',
  },
];

const MenuComponent = () => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();
  // const params = useParams();
  const docsLocale = Locale({ locale: state.locales });
  // const lan = params.lan === 'en' ? 'en-US' : 'zh-CN';
  const groupLocale = docsLocale['shineout.menu.group'];

  const handleClick = (component: Menu) => {
    dispatch.setDoctab('examples');
    const params = new URLSearchParams(location.search);
    params.set('tab', 'examples');
    navigate({
      pathname: `/${state.locales}/component/${state.doc}/${component.name}`,
      search: params.toString(),
    });
    document.getElementById('layout')?.scrollTo(0, 0);
  };

  const handleDocClick = (name: string) => {
    const params = new URLSearchParams(location.search);
    params.delete('tab');
    navigate({
      pathname: `/${state.locales}/doc/${state.doc}/${name}`,
      search: params.toString(),
    });
    document.getElementById('layout')?.scrollTo(0, 0);
  };
  useEffect(() => {
    setConfig({
      locale: 'en-US',
      spin: {
        name: 'ring',
      },
      popupContainer: () => document.getElementById('layout'),
    });
  }, []);

  useEffect(() => {
    dispatch.setMenu();
  }, []);

  const active = useMemo(() => {
    const paths = location.pathname.split('/');
    const componentName = paths[paths.length - 1];
    return componentName;
  }, [location.pathname]);

  const menuFloat = state.menuFloat
  const menuCollapsed = state.menuCollapsed

  const rootClass = classnames(classes.menuContainer, {
    [classes.menuFloat]: menuFloat,
    [classes.collapsed]: menuCollapsed,
  });

  return (
    <aside className={rootClass}>
      <ul className={classnames(classes.menu, classes.customScrollbar)}>
        <li>
          <div className={classnames('group', 'first')}>
            {docsLocale['shineout.menu.group.guide']}
          </div>
          <ul>
            {devGuide.map((component, index) => {
              return (
                component &&
                component.title && (
                  <li
                    key={index}
                    onClick={() => handleDocClick(component.name)}
                    className={active === component.name ? 'active' : ''}
                  >
                    {component.title[state.locales]}
                  </li>
                )
              );
            })}
          </ul>
        </li>

        {state.menu.map((item, index) => {
          return (
            <li key={index}>
              <div className={classnames('group')}>
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

                        {component.version && <Tag color='success'>{component.version}</Tag>}
                      </li>
                    )
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <FloatMenu />
    </aside>
  );
};

export default MenuComponent;
