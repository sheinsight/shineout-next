import { JsStyles } from '../jss-style';

export type VirtualScrollClasses =
  | 'scroll'
  | 'virtual'
  | 'iframe'
  | 'container'
  | 'footer'
  | 'bar'
  | 'scrolled';

const VirtualScrollStyle: JsStyles<VirtualScrollClasses> = {
  scroll: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    boxSizing: 'border-box',
  },
  scrolled: {},
  virtual: {},
  iframe: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    // bottom: 0,
    border: 'none',
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
  },
  footer: {},
  bar: {
    width: 1,
    visibility: 'hidden',
  },
};

export default VirtualScrollStyle;
