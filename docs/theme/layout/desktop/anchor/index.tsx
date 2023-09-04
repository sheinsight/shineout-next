import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store from '../../../store';
import useStyles from '../style';

const Anchor = () => {
  const classes = useStyles();
  const location = useLocation();
  const state = useSnapshot(store);

  const [anchor, setAnchor] = useState([]);
  const [hash, setHash] = useState('');

  const handleClick = (e: any) => {
    const hash = e.target.hash.split('#')?.at(-1);
    const target = document.getElementById(decodeURIComponent(hash));
    if (target) target.scrollIntoView();
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
    <ul className={classes.anchor}>
      {anchor.map((item, index) => {
        return (
          <li key={index}>
            <Link to={`#${item}`} onClick={handleClick} className={item === hash ? 'active' : ''}>
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Anchor;
