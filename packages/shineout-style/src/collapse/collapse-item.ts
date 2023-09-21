import { JsStyles } from '../jss-style';

export type CollapseItemClass =
  | 'wrapper'
  | 'header'
  | 'active'
  | 'icon'
  | 'title'
  | 'extra'
  | 'content'
  | 'expanded';

const collapseItemStyle: JsStyles<CollapseItemClass> = {
  wrapper: {
    display: 'block',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    cursor: 'pointer',
    overflow: 'hidden',
    paddingTop: '8px',
    paddingBottom: '8px',
    backgroundColor: '#fff',
    color: 'black',
    fontSize: '14px',
    lineHeight: '24px',
    transition: 'border-color 0s ease 0.19s',
    borderBottom: '1px solid transparent',
  },
  active: {},
  icon: {},
  title: {},
  extra: {},
  content: {
    display: 'none',
    overflow: 'hidden',
    position: 'relative',
    transition: 'height 0.2s cubic-bezier(0.34, 0.69, 0.1, 1)',
  },
  expanded: {
    display: 'block',
  },
};

export default collapseItemStyle;
