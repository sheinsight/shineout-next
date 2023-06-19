import { useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import store, { Menu, Doc, dispatch } from '../../../store';
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

  const handleChangeDoc = (doc: Doc) => {
    const currentDoc: Doc = doc === 'shineout' ? 'base' : 'shineout';
    const nextPath = location.pathname.replace(`/${currentDoc}`, `/${doc}`);
    dispatch.setDoc(doc);
    dispatch.setMenu();
    navigate(nextPath);
  };

  useEffect(() => {
    dispatch.setMenu();
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
        <span
          className={state.doc === 'base' ? 'active' : ''}
          onClick={() => handleChangeDoc('base')}
        >
          BASE
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
