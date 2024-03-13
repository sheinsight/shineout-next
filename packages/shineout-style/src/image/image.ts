import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

export interface ImageClasses {
  image: string;
  img: string;
  inner: string;
  circle: string;
  rounded: string;
  thumbnail: string;
  fill: string;
  center: string;
  fit: string;
  stretch: string;
  href: string;
  placeholder: string;
  defaultPlaceholder: string;
  error: string;
  defaultError: string;
  preview: string;
  previewMask: string;
  download: string;

  overlay: string;
  magnify: string;
  close: string;

  gallery: string;
  galleryCurrent: string;
  galleryInit: string;
  galleryForward: string;
  galleryBackward: string;
  galleryCenter: string;
  galleryLeft: string;
  galleryRight: string;

  group: string;
  groupPile: string;
  groupPileItem: string;
  groupCount: string;
  '@keyframes keyframe-f2c': string;
  '@keyframes keyframe-c2b': string;
  '@keyframes keyframe-c2f': string;
  '@keyframes keyframe-b2c': string;
}

type ImageClass = keyof ImageClasses;

const ImageStyle: JsStyles<ImageClass> = {
  '@keyframes keyframe-f2c': {
    '0%': {
      left: '100%',
      marginLeft: '-80px',
      transform: 'translate(0, -50%)',
    },
    '100%': {
      left: '50%',
      marginLeft: 0,
      transform: 'translate(-50%, -50%)',
    },
  },

  '@keyframes keyframe-c2b': {
    '0%': {
      right: '50%',
      marginRight: 0,
      transform: 'translate(50%, -50%)',
    },

    '100%': {
      right: '100%',
      marginRight: '-80px',
      transform: 'translate(0, -50%)',
    },
  },

  '@keyframes keyframe-c2f': {
    '0%': {
      left: ' 50%',
      marginLeft: 0,
      transform: 'translate(-50%, -50%)',
    },

    '100%': {
      left: '100%',
      marginLeft: '-80px',
      transform: 'translate(0, -50%)',
    },
  },

  '@keyframes keyframe-b2c': {
    '0%': {
      right: '100%',
      marginRight: '-80px',
      transform: 'translate(0, -50%)',
    },

    '100%': {
      right: '50%',
      marginRight: 0,
      transform: 'translate(50%, -50%)',
    },
  },
  // image
  href: {
    outline: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  image: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    boxSizing: 'border-box',

    background: Token.imageBackgroundColor,

    '& > *': {
      position: 'absolute',
    },
  },

  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderStyle: 'none',
  },
  inner: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  fit: {
    '& $inner': {
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
    },
  },

  fill: {
    '& $inner': {
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
    },
  },

  previewMask: {
    display: 'none',
    // icon
    '& svg': {
      width: 16,
      height: 16,
      color: '#fff',
    },
  },

  download: {
    // hover
    '&:hover': {
      // after
      '& $previewMask': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: Token.imageMaskBackgroundColor,
      },
    },
  },

  preview: {
    '&:hover': {
      '& $previewMask': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: Token.imageMaskBackgroundColor,
      },
    },
  },

  center: {
    '& $img': {
      margin: 'auto',
    },
    '& $inner': {
      display: 'flex',
    },
  },

  stretch: {
    '& $img': {
      width: '100%',
      height: '100%',
    },
  },

  circle: {
    borderRadius: Token.imageCircleBorderRadius,
    border: `1px solid ${Token.imageCircleBorderColor}`,
  },

  rounded: {
    borderRadius: Token.imageRoundedBorderRadius,
    border: `1px solid ${Token.imageRoundedBorderColor}`,
  },

  thumbnail: {
    borderRadius: Token.imageThumbnailBorderRadius,
    backgroundColor: '#FFFFFF',
    border: `1px solid ${Token.imageThumbnailBorderColor}`,

    '& $inner': {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4,
    },
  },

  placeholder: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    backgroundColor: Token.imagePlaceholderBackgroundColor,
  },

  defaultPlaceholder: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Token.imagePlaceholderBackgroundColor,
  },

  defaultError: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: Token.imageErrorFontColor,
    fontSize: Token.imageErrorFontSize,
    backgroundColor: Token.imageErrorBackgroundColor,
    // icon
    '& svg': {
      width: 16,
      height: 16,
      color: '#B3B7C1',
    },
  },

  error: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    backgroundColor: Token.imageErrorBackgroundColor,
  },

  overlay: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: Token.imageMaskBackgroundColor,
  },

  magnify: {
    display: 'inline-block',
    margin: 'auto',
    boxSizing: 'content-box',
    '& img': {
      position: 'relative',
      display: 'block',
      borderStyle: 'none',
    },
  },

  close: {
    position: 'absolute',
    top: -15,
    right: -15,
    zIndex: 1,
    cursor: 'pointer',
    outline: 'none',
    width: 32,
    height: 32,
    color: '#666C7C',
    // hover
    '&:hover': {
      color: '#666C7C',
    },
  },

  // gallery
  gallery: {
    position: 'fixed',
    zIndex: 1100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  galleryCurrent: {
    zIndex: 1100,
  },

  galleryInit: {
    transform: 'translate(-50%,-50%)',
  },

  galleryForward: {
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    position: 'absolute',
  },

  galleryBackward: {
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    position: 'absolute',
  },

  galleryCenter: {
    cursor: 'zoom-in',
    position: 'absolute',
    display: 'flex',
    zIndex: 1101,
    minWidth: 100,
    minHeight: 100,
    background: '#fff',

    top: '50%',

    '&$galleryInit': {
      left: '50%',
    },

    '&$galleryForward': {
      animation: '$keyframe-f2c 0.5s ease-in-out',
    },
    '&$galleryBackward': {
      animation: '$keyframe-b2c 0.5s ease-in-out',
    },
  },

  galleryLeft: {
    marginRight: '-80px',
    opacity: 0.4,
    transform: 'translateY(-50%)',
    display: 'flex',
    position: 'absolute',
    zIndex: 1100,

    right: '100%',
    top: '50%',

    '&$galleryForward': {
      animation: '$keyframe-c2b 0.5s ease-in-out',
    },
  },

  galleryRight: {
    marginLeft: '-80px',
    opacity: 0.4,
    transform: 'translateY(-50%)',
    display: 'flex',
    position: 'absolute',
    zIndex: 1100,

    left: '100%',
    top: '50%',

    '&$galleryBackward': {
      animation: '$keyframe-c2f 0.5s ease-in-out',
    },
  },

  // group
  group: {
    lineHeight: 1,
    display: 'inline-block',
    '& $image': {
      marginRight: Token.imageGroupNearlyMargin,
    },
  },

  groupPile: {
    position: 'relative',
    '& $image': {
      marginRight: 0,
    },
    '& $image:nth-child(1)': {
      // zIndex: 3,
    },
    '& $groupPileItem:nth-child(2)': {
      position: 'absolute',
      borderWidth: 0,
      top: 1,
      zIndex: -1,
      marginLeft: 0,
      transform: 'scale(0.9375)',
      background: '#CCCFD7',
      borderRadius: 2,
      right: '-6%',
    },
    '& $groupPileItem:nth-child(3)': {
      position: 'absolute',
      borderWidth: 0,
      top: 1,
      zIndex: -2,
      marginLeft: 0,
      transform: 'scale(0.875)',
      background: '#E8EBF0',
      borderRadius: 2,
      right: '-12%',
    },
  },

  groupPileItem: {
    position: 'absolute',
  },

  groupCount: {
    position: 'absolute',
    right: 1,
    bottom: 3,
    minWidth: 20,
    height: 20,
    backgroundColor: 'rgba(2, 11, 24, 0.3)',
    borderRadius: '4px 0 4px 0',
    padding: 4,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // span
    '& > span': {
      fontSize: 12,
      color: '#fff',
      marginLeft: 4,
    },

    // icon
    '& > svg': {
      width: 12,
      height: 12,
      color: '#fff',
    },
  },
};

export default ImageStyle;
