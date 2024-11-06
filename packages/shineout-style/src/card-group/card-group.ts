// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { CardGroupClasses } from '@sheinx/base';

export type CardGroupClassType = keyof CardGroupClasses;

const cardGroupPadding = 0;

const cardGroupItemBorderRadius = 8;

const cardGroupStyle: JsStyles<CardGroupClassType> = {
  rootClass: {},
  wrapper: {
    display: 'block',
  },
  item: {
    borderRadius: cardGroupItemBorderRadius,
    background: 'rgba(255,255,255,1)',
    boxShadow: '0 4px 8px 0 rgba(20,23,55,0.05)',
    overflow: 'hidden',
    border: '1px solid #eee',
    transition: 'all .2s ease',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 4px 12px 0 rgba(20,23,55,0.15)',
    },
  },
  checkbox: {
    '$wrapper &': {
      position: 'absolute',
      right: 12,
      top: 12,
      margin: 0,
    },
  },
  scroller: {
    height: '100%',
    overflow: 'auto',
  },
  grid: {
    padding: cardGroupPadding,
    display: 'grid',
  },
};

export default cardGroupStyle;
