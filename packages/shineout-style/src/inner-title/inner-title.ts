import { JsStyles } from '../jss-style';

type Class = 'wrapper' | 'wrapperOpen' | 'title' | 'content' | 'place';

const innerTitleVar = {
  size: {
    paddingY: {
      default: '4px',
    },
  },
};

const innerTitle: JsStyles<Class> = {
  wrapper: {
    width: '100%',
    padding: `${innerTitleVar.size.paddingY.default} 0`,
    position: 'relative',
  },
  wrapperOpen: {
    display: 'block',
  },
  title: {
    visibility: 'hidden',
    height: 'initial',
  },
  place: {
    pointerEvents: 'none',
    position: 'absolute',
    visibility: 'visible',
    transition: 'all 150ms ease-in-out',
    top: `50%`,
    transform: 'translateY(-50%)',
    left: '0',
    width: '100%',
    '$wrapperOpen &': {
      top: innerTitleVar.size.paddingY.default,
      transform: 'translateY(0%)',
    },
  },
  content: {
    opacity: '0',
    '$wrapperOpen &': {
      opacity: '1',
    },
    display: 'block',
    '& > input, & > div': {
      padding: '0',
    },
  },
};

export default innerTitle;
