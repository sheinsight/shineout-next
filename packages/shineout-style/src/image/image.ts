import { JsStyles } from '../jss-style';
import Token from '@sheinx/theme';

type ImageClass =
  // image
  | 'href'
  | 'image'
  | 'img'
  | 'inner'
  | 'circle'
  | 'rounded'
  | 'thumbnail'
  | 'fill'
  | 'center'
  | 'fit'
  | 'stretch'
  | 'placeholder'
  | 'error'
  | 'group'
  | 'groupPile'
  | 'groupPileItem'
  | 'groupCount'
  | 'gallery'
  | 'galleryInit'
  | 'galleryForward'
  | 'galleryBackward'
  | 'galleryCenter'
  | 'galleryLeft'
  | 'galleryRight'
  | 'overlay'
  | 'magnify'
  | '@keyframes gallery-fade-in';

const ImageStyle: JsStyles<ImageClass> = {
  '@keyframes gallery-fade-in': {
    '0%': {
      transform: 'translate(0%,-50%)',
    },
    '50%': {
      transform: 'translate(-25%,-50%)',
    },
    '100%': {
      transform: 'translate(-50%,-50%)',
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

    background: '#ffffff',

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Token.imagePlaceholderBackgroundColor,
  },
  error: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Token.imageErrorBackgroundColor,
  },

  overlay: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.5)',
  },

  magnify: {
    display: 'inline-block',
    margin: 'auto',
    boxSizing: 'content-box',
    '& img': {
      position: 'relative',
      zIndex: 2,
      display: 'block',
      borderStyle: 'none',
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

  galleryInit: {
    transform: 'translate(-50%,-50%)',
  },
  galleryForward: {
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    position: 'absolute',
    animationName: '$gallery-fade-in',
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
    zIndex: 20,
    minWidth: 100,
    minHeight: 100,
    background: '#fff',

    top: '50%',
    left: '50%',
  },

  galleryLeft: {
    marginRight: '-80px',
    opacity: 0.4,
    transform: 'translateY(-50%)',
    display: 'flex',
    position: 'absolute',
    zIndex: 10,

    right: '100%',
    top: '50%',
  },

  galleryRight: {
    marginLeft: '-80px',
    opacity: 0.4,
    transform: 'translateY(-50%)',
    display: 'flex',
    position: 'absolute',
    zIndex: 10,

    left: '100%',
    top: '50%',
  },

  // group
  group: {
    lineHeight: 1,
    display: 'inline-block',
    '& $image + $image': {
      marginLeft: Token.imageGroupNearlyMargin,
    },
  },
  groupPile: {
    position: 'relative',
    '& $image:nth-child(1)': {
      zIndex: 3,
    },
    '& $groupPileItem:nth-child(2)': {
      position: 'absolute',
      borderWidth: 0,
      // left: '3%',
      top: 1,
      zIndex: 2,
      marginLeft: 0,
      transform: 'scale(0.9375)',
      background: '#CCCFD7',
      borderRadius: 2,
    },
    '& $groupPileItem:nth-child(3)': {
      position: 'absolute',
      borderWidth: 0,
      // left: '6%',
      top: 1,
      zIndex: 1,
      marginLeft: 0,
      transform: 'scale(0.875)',
      background: '#E8EBF0',
      borderRadius: 2,
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
    zIndex: 4,

    padding: 4,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // span
    '& > span': {
      fontSize: 12,
      color: '#fff',
      marginLeft: 5,
    },
  },
};

export default ImageStyle;
