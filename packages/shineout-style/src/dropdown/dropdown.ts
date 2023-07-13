import { JsStyles } from '../jss-style';

export type DropDownClass = 'wrapper' | 'list';

const dropdown: JsStyles<DropDownClass> = {
  wrapper: {
    display: 'inline-block',
    background: '#ccc',
    position: 'relative',
  },
  list: {
    position: 'absolute',
    background: '#ddd',
  },
};

export default dropdown;
