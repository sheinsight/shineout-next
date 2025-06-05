import Token from '@sheinx/theme';
import { CommonClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';


export type CommonClass = keyof CommonClasses;

const collapseStyle: JsStyles<CommonClass> = {
  highlight: {
    color: Token.tagWarningFontColor,
  },
};


export const animations = {
  '@keyframes r2c': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  '@keyframes  c2r': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes  l2c': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  '@keyframes  c2l': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
  },
  '@keyframes t2c': {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(0)' },
  },
  '@keyframes c2t': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-100%)' },
  },
  '@keyframes b2c': {
    '0%': { transform: 'translateY(100%)' },
    '100%': { transform: 'translateY(0)' },
  },
  '@keyframes c2b': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(100%)' },
  },
  '@keyframes fade-in': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes fade-out': {
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  '@keyframes scale-y-top': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-100%) scaleY(0)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(-100%) scaleY(1)'
    },
  },
};

export default collapseStyle;
