// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { SkeletonClasses } from '@sheinx/base'
import token from '@sheinx/theme';

const animation = {
  '@keyframes skeleton-animation': {
    '0%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0 50%' },
  },
}

export type SkeletonClassType = keyof SkeletonClasses;

const skeletonStyle: JsStyles<SkeletonClassType> = {
  ...animation,
  rootClass: {},
  wrapper: {
    display: 'flex',
  },
  animation: {
    '& $textItem, & $image, & $buttonItem':{
      background: `linear-gradient(90deg, ${token.skeletonAnimationFromColor} 25%, ${token.skeletonAnimationToColor} 37%, ${token.skeletonAnimationFromColor} 63%)`,
      backgroundSize: '400% 100%',
      animation: '$skeleton-animation 1.4s ease infinite',
    }
  },
  content: {
    flex: 1,
    minWidth: 0,
  },

  text: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  textItem: {
    height: token.skeletonHeight,
    marginBottom: token.skeletonMargin,
    backgroundColor: token.skeletonBackgroundColor,
    borderRadius: token.skeletonBackgroundRadius,
    '&:last-child':{
      marginBottom: 0,
    }
  },

  image: {
    width: 48,
    height: 48,
    backgroundColor: token.skeletonBackgroundColor,
  },
  imageLeft: {
    marginRight: token.skeletonMargin,
  },
  imageRight: {
    marginLeft: token.skeletonMargin,
  },
  imageCircle: {
    borderRadius: '50%',
  },
  imageSquare: {
    borderRadius: token.skeletonBackgroundRadius,
  },
  imageSmall:{
    width: 32,
    height: 32,
  },
  imageLarge: {
    width: 64,
    height: 64,
  },

  button: {
    display: 'flex',
    '$text + &': {
      marginTop: token.skeletonMargin,
    }
  },

  buttonItem: {
    width: 80,
    height: 32,
    backgroundColor: token.skeletonBackgroundColor,
    borderRadius: token.skeletonBackgroundRadius,
    '& + &': {
      marginLeft: token.skeletonMargin,
    }
  },
  buttonLeft: {
    justifyContent: 'flex-start',
  },
  buttonRight: {
    justifyContent: 'flex-end',
  },
  buttonSmall: {
    width: 64,
    height: 24,
  },
  buttonLarge: {
    width: 96,
    height: 40,
  },
};

export default skeletonStyle;
