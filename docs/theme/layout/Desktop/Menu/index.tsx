import { useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import store, { Menu, Menus } from '../../../store';
import { useNavigate, useLocation } from 'react-router-dom';

import useStyles from '../style';

export interface MarkdownComponent {
  title: {
    title: string;
    group: string;
    order: number;
  };
  header: {
    title: {
      en: string;
      cn: string;
    };
    describe: {
      en: string;
      cn: string;
    };
  };
  examples: any[];
}

const MenuComponent = () => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (component: Menu) => {
    navigate({
      pathname: `/component/${component.name}`,
    });
  };

  useEffect(() => {
    const menus: Menus[] = [];

    // @ts-ignore
    const files = require.context('../../../../chunk', false, /\.ts$/).keys() as string[];
    files.forEach((file) => {
      const menu: Menu = {
        name: '',
        title: {
          en: '',
          cn: '',
        },
      };

      const component = require(`../../../../chunk/${file.split('/')[1]}`)
        .default as MarkdownComponent;
      const group = menus.find((item) => item.group === component.title.group);
      if (!group) {
        menus.push({
          group: component.title.group,
          components: [],
        });
      }
      menu.group = component.title.group;
      menu.title = component.header.title;
      menu.name = component.title.title;
      menus.find((item) => item.group === component.title.group)?.components.push(menu);
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
      {state.menu.map((item, index) => {
        return (
          <li key={index}>
            <div className='group'>{item.group}</div>
            <ul>
              {item.components.map((component, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleClick(component)}
                    className={active === component.name ? 'active' : ''}
                  >
                    {component.title[state.locales]}
                  </li>
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
