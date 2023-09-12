import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store, { dispatch } from '../../../store';
import useStyles from '../style';

const Anchor = () => {
  const classes = useStyles();
  const location = useLocation();
  const state = useSnapshot(store);

  const [anchor, setAnchor] = useState([]);
  const [, setHash] = useState('');

  const anchorClasses = classnames(classes.anchor, {
    [classes.stickyAnchor]: state.scroll,
  });

  const handleClick = (e: any) => {
    const hash = e.target.hash.split('#')?.at(-1);
    const activeAnchor = decodeURIComponent(hash);
    const target = document.getElementById(activeAnchor);
    if (target) target.scrollIntoView();
    dispatch.setActiveAnchor(activeAnchor);
  };

  const toKebabCase = (str?: string) => {
    const newStr = str?.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (newStr?.startsWith('-')) {
      return newStr?.slice(1);
    }
    return newStr;
  };

  useEffect(() => {
    if (location.pathname.indexOf('/component') === -1) return;

    const chunk = toKebabCase(location.pathname.split('/').at(-1));
    if (chunk) {
      let component;
      try {
        component = require(`../../../../chunk/${state.doc}/${chunk.toLocaleLowerCase()}`);
      } catch (error) {
        component = null;
        setAnchor([]);
        setHash('');
        return;
      }

      if (component && component.examples) {
        const anchorNames = component.examples
          .filter((item: { propName: any }) => item.propName[state.locales])
          .map((item: { propName: any }) => {
            return item.propName[state.locales];
          });

        setAnchor(anchorNames);
      }
    }

    const hash = decodeURIComponent(location.hash)?.replace('#', '');
    if (!hash) {
      setHash('');
      return;
    }
    setHash(hash);
    const target = document.getElementById(hash);
    if (target) target.scrollIntoView();
  }, [location, state.locales]);

  return (
    <ul className={anchorClasses}>
      {anchor.map((item, index) => {
        return (
          <li key={index} className='anchor-item'>
            <Link
              to={`#${item}`}
              onClick={handleClick}
              className={item === state.activeAnchor ? 'active' : ''}
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Anchor;
