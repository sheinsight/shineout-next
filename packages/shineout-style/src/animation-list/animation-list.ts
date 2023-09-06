import { JsStyles } from '../jss-style';

export type animationListClass =
  | 'animation-240'
  | 'animation-360'
  | 'animation-480'
  | 'fade-animation-240'
  | 'fade-animation-360'
  | 'fade-animation-480'
  | 'scale-y'
  | 'fade'
  | 'collapse'
  | 'show';

const animationList: JsStyles<animationListClass> = {
  'animation-240': {
    transition: 'height 0.24s ease-in-out, opacity 0.24s ease-in-out, transform 0.24s ease-in-out',
  },
  'animation-360': {
    transition: 'height 0.36s ease-in-out, opacity 0.36s ease-in-out, transform 0.36s ease-in-out',
  },
  'animation-480': {
    transition: 'height 0.48s ease-in-out, opacity 0.48s ease-in-out, transform 0.48s ease-in-out',
  },
  'fade-animation-240': {
    transition: 'height 0.24s ease-in-out, opacity 0.24s ease-in-out',
  },
  'fade-animation-360': {
    transition: 'height 0.36s ease-in-out, opacity 0.36s ease-in-out',
  },
  'fade-animation-480': {
    transition: 'height 0.48s ease-in-out, opacity 0.48s ease-in-out',
  },
  show: {},
  'scale-y': {
    transform: 'scaleY(0)',
    '$show&': {
      transform: 'scaleY(1)',
    },
  },
  fade: {
    '$show&': {
      opacity: 1,
    },
  },
  collapse: {
    opacity: 1,
  },
};

export default animationList;
