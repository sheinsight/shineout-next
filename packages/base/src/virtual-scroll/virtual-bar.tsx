import classNames from 'classnames';
import { VirtualScrollClasses } from './virtual-scroll.type';
import { VirtualBarProps } from './virtual-bar.type';

const Bar = (props: VirtualBarProps) => {
  const { jssStyle } = props;
  const rootStyle = jssStyle?.virtualScroll?.() || ({} as VirtualScrollClasses);
  const rootClass = classNames(rootStyle.bar);

  return <div className={rootClass}></div>;
};

export default Bar;
