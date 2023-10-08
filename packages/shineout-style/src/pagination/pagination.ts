import { JsStyles } from '../jss-style';

type PaginationClass =
  | 'pagination'
  | 'section'
  | 'buttons'
  | 'jumper'
  | 'left'
  | 'right'
  | 'center'
  | 'simple';

const PaginationStyle: JsStyles<PaginationClass> = {
  pagination: {
    display: 'flex',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  section: {
    '& + &': {
      marginLeft: 8,
    },
  },
  buttons: {},
  jumper: {},
  simple: {},
};

export default PaginationStyle;
