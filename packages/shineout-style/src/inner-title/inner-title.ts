import { JsStyles } from '../jss-style';
import cssvar from '../cssvar';
type Class =
  | 'wrapper'
  | 'wrapperSmall'
  | 'wrapperLarge'
  | 'wrapperOpen'
  | 'title'
  | 'content'
  | 'place';

const innerTitle: JsStyles<Class> = {
  wrapper: {
    width: '100%',
    padding: `${cssvar.innerTitlePaddingY} ${cssvar.innerTitlePaddingX}`,
    position: 'relative',
  },
  wrapperSmall: {
    padding: `${cssvar.innerTitlePaddingYSmall} ${cssvar.innerTitlePaddingXSmall}`,
  },
  wrapperLarge: {
    padding: `${cssvar.innerTitlePaddingYLarge} ${cssvar.innerTitlePaddingXLarge}`,
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
      top: cssvar.innerTitlePaddingY,
      transform: 'translateY(0%)',
    },
    '$wrapperSmall$wrapperOpen &': {
      top: cssvar.innerTitlePaddingYSmall,
    },
    '$wrapperLarge$wrapperOpen &': {
      top: cssvar.innerTitlePaddingYLarge,
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
