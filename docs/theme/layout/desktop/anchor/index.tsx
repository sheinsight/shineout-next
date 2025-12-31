import { useEffect } from 'react';
import classnames from 'clsx';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store, { dispatch } from '../../../store';
import useStyles from '../style';

interface AnchorProps {
  anchorName: string;
  data: string[];
}

const Anchor = (props: AnchorProps) => {
  const { anchorName, data } = props;
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSnapshot(store);

  const anchorClasses = classnames(
    classes.anchor,
    classes.customScrollbar,
    { [classes.stickyAnchor]: state.scroll }
  );

  const handleClick = (e: any) => {
    const hashes = e.target.hash.split('#');
    const hash = hashes?.[hashes.length - 1];
    const activeAnchor = decodeURIComponent(hash);
    location.hash = activeAnchor;
    e.preventDefault();
    const layout = document.getElementById('layout');
    const target = document.getElementById(`${anchorName}-${activeAnchor}`);
    layout?.scrollTo(0, (target?.offsetTop as number) + 125);
    dispatch.setActiveAnchor(activeAnchor, true);
    const params = new URLSearchParams(location.search);
    params.set(anchorName, activeAnchor);
    navigate({
      search: params.toString(),
    });
    setTimeout(() => {
      dispatch.setLocked(false);
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activeAnchor = params.get(anchorName);
    const target = document.getElementById(`${anchorName}-${activeAnchor}`);

    if (target) {
      const layout = document.getElementById('layout');
      setTimeout(() => {
        layout?.scrollTo(0, (target?.offsetTop as number) + 125);
        // layout?.scrollTo(0, (target?.offsetTop as number) - (anchorName === 'example' ? 10 : 267));
      }, 50);
    }
  }, []);

  return (
    <ul className={anchorClasses}>
      {data.map((item, index) => {
        if (!item) {
          return null;
        }
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
