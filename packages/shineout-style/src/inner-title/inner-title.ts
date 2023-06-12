import { JsStyles } from '../jss-style';

type Class =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperOpen'
  | 'title'
  | 'content'
  | 'place';

const innerTitleVar = {
  size: {
    paddingY: {
      default: '4px',
      small: '2px',
      large: '4px',
    },
    paddingX: {
      default: '8px',
      small: '8px',
      large: '8px',
    },
  },
};

const innerTitle: JsStyles<Class> = {
  wrapper: {
    width: '100%',
    padding: `${innerTitleVar.size.paddingY.default} ${innerTitleVar.size.paddingX.default}`,
    position: 'relative',
  },
  wrapperSmall: {
    padding: `${innerTitleVar.size.paddingY.small} ${innerTitleVar.size.paddingX.small}`,
  },
  wrapperLarge: {
    padding: `${innerTitleVar.size.paddingY.large} ${innerTitleVar.size.paddingX.large}`,
    '& $content  > input, & $content > div, & $title': {
      lineHeight: '1.5',
    },
  },
  wrapperOpen: {
    display: 'block',
  },
  title: {
    visibility: 'hidden',
    height: 'initial',
    padding: 'inherit',
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
    '&& > input, && > div': {
      padding: '0',
    },
  },
};

export default innerTitle;
