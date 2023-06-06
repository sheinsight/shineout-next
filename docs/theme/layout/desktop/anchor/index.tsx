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

  useEffect(() => {
    if (location.pathname.indexOf('/component') === -1) return;

    const chunk = location.pathname.split('/').at(-1);
    if (chunk) {
      let component;
      try {
        component = require(`../../../../chunk/${chunk.toLocaleLowerCase()}`)?.default;
      } catch (error) {
        component = null;
        setHash('');
        return;
      }

      if (component && component.examples) {
        const anchorNames = component.examples.map((item: { propName: any }) => {
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
  }, [location]);

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
