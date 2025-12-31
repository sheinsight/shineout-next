import clsx from 'clsx';
import { DividerProps } from './divider.type';

const Divider = (props: DividerProps) => {
  const {
    jssStyle,
    mode = 'horizontal',
    children,
    orientation = 'center',
    className,
    style,
    type,
  } = props;
  const styles = jssStyle?.divider?.();
  const showText = mode === 'horizontal' && children;
  const mc = clsx(
    className,
    styles?.rootClass,
    styles?.wrapper,
    mode === 'vertical' && styles?.vertical,
    mode === 'horizontal' && styles?.horizontal,
    showText && styles?.withText,
    showText && orientation === 'center' && styles?.withTextCenter,
    showText && orientation === 'left' && styles?.withTextLeft,
    showText && orientation === 'right' && styles?.withTextRight,
    type === 'dashed' && styles?.wrapperDashed,
  );
  return (
    <div className={mc} style={style}>
      {showText ? <span className={styles?.innerText}>{children}</span> : null}
    </div>
  );
};

export default Divider;
