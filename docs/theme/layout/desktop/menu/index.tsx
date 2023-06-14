import { useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import store, { Menu, Menus } from '../../../store';
import { useNavigate, useLocation } from 'react-router-dom';

import useStyles from '../style';

const MenuComponent = () => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (component: Menu) => {
    navigate({
      pathname: `/${state.locales}/component/${state.doc}/${component.name}`,
    });
  };

  const handleChangeDoc = (doc: 'shineout' | 'ui') => {
    const currentDoc = doc === 'shineout' ? 'ui' : 'shineout';
    const nextPath = location.pathname.replace(`/${currentDoc}`, `/${doc}`);
    store.doc = doc;
    navigate(nextPath);
  };

  useEffect(() => {
    const menus: Menus[] = [];

    // @ts-ignore
    const files = require.context('../../../../chunk/shineout', false, /\.tsx$/).keys() as string[];
    files.forEach((file) => {
      const menu: Menu = {
        name: '',
        title: {
          en: '',
          cn: '',
        },
      };
      const component = require(`../../../../chunk/shineout/${file.split('/')[1]}`);
      const group = menus.find((item) => item.group === component.header.group);
      if (!group) {
        menus.push({
          group: component.header.group,
          components: [],
        });
      }
      menu.group = component.header.group;
      menu.name = component.header.name;
      menu.title = component.title;
      menus.find((item) => item.group === component.header.group)?.components.push(menu);
    });
    store.menu = menus;
  }, []);

  const active = useMemo(() => {
    const paths = location.pathname.split('/');
    const componentName = paths.at(-1);
    return componentName;
  }, [location.pathname]);

  return (
    <ul className={classes.menu}>
      <li className='doc'>
        <span
          className={state.doc === 'shineout' ? 'active' : ''}
          onClick={() => handleChangeDoc('shineout')}
        >
          SHINEOUT
        </span>
        <span className={state.doc === 'ui' ? 'active' : ''} onClick={() => handleChangeDoc('ui')}>
          UI
        </span>
      </li>
      {state.menu.map((item, index) => {
        return (
          <li key={index}>
            <div className='group'>{item.group}</div>
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
