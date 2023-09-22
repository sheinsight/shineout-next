import { JsStyles } from '../jss-style';

export type CollapseItemClass =
  | 'wrapper'
  | 'header'
  | 'active'
  | 'icon'
  | 'noIcon'
  | 'title'
  | 'extra'
  | 'content'
  | 'contentMain'
  | 'rightIcon'
  | 'disabled'
  | 'activeTransform'
  | 'activeTransformRight'
  | 'expanded';

const collapseItemStyle: JsStyles<CollapseItemClass> = {
  wrapper: {
    boxSizing: 'border-box',
    borderBottom: '1px solid rgb(201,205,212)',
    '&:last-child': {
      borderBottom: 0,
    },
    height: 'auto',
    width: 'auto',
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
    transition: 'border-color 0s ease 0s',
    borderBottom: '1px solid transparent',
  },
  active: {
    '& > $header': {
      borderColor: 'rgb(201,205,212)',
    },
    '& > header > $title': {
      fontWeight: 500,
    },
    '& > $header $activeTransform': {
      '& svg': {
        transform: 'rotate(90deg)',
      },
    },
    '& > $header $activeTransformRight': {
      '& svg': {
        transform: 'rotate(-90deg)',
      },
    },
  },
  activeTransform: {},
  activeTransformRight: {},
  noIcon: {
    '& > $icon': {
      display: 'none',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
    '& svg': {
      width: 14,
    },
  },
  title: {
    display: 'inline',
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
  },
  extra: {
    marginRight: '8px',
  },
  content: {
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
    position: 'relative',
    transition: 'height 0.2s cubic-bezier(0.34, 0.69, 0.1, 1)',
    color: 'rgb(29,33,41)',
    // display: 'none',
  },
  contentMain: {
    padding: '8px 13px 8px 34px',
    backgroundColor: 'rgb(247,248,250)',
    fontSize: '14px',
  },
  rightIcon: {
    flexDirection: 'row-reverse',
    '& > $icon': {
      marginRight: '8px',
      marginLeft: 0,
    },
    '& > $extra': {
      marginRight: 0,
      marginLeft: '8px',
    },
  },
  disabled: {
    '& $header, $content': {
      cursor: 'not-allowed',
      color: 'rgb(201,205,212)',
    },
  },
  expanded: {
    // display: 'block',
  },
};

export default collapseItemStyle;
