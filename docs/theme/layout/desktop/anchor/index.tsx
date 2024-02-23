import classnames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
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
  const state = useSnapshot(store);

  const anchorClasses = classnames(classes.anchor, {
    [classes.stickyAnchor]: state.scroll,
  });

  const handleClick = (e: any) => {
    const hashes = e.target.hash.split('#');
    const hash = hashes?.[hashes.length - 1];
    const activeAnchor = decodeURIComponent(hash);
    location.hash = activeAnchor;
    e.preventDefault();
    const layout = document.getElementById('layout');
    const target = document.getElementById(`${anchorName}-${activeAnchor}`);
    layout?.scrollTo(0, (target?.offsetTop as number) - (anchorName === 'example' ? 10 : 200));

    dispatch.setActiveAnchor(activeAnchor, true);
    setTimeout(() => {
      dispatch.setLocked(false);
    });
  };

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
