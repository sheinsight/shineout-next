import classNames from 'classnames';
import { DividerProps, DividerSemanticKey } from './divider.type';
import { useSemantic } from '../common';
import { useConfig } from '../config';

const Divider = (props: DividerProps) => {
  const {
    jssStyle,
    mode = 'horizontal',
    children,
    orientation = 'center',
    className,
    style,
    type,
    classNames: classNamesProp,
    styles: stylesProp,
  } = props;

  const config = useConfig();
  const styles = jssStyle?.divider?.();

  // Semantic DOM
  const globalSemanticConfig = config.divider
    ? { classNames: config.divider.classNames, styles: config.divider.styles }
    : undefined;

  const [semClass, semStyle] = useSemantic<DividerSemanticKey>(
    classNamesProp,
    stylesProp,
    globalSemanticConfig,
  );

  const showText = mode === 'horizontal' && children;
  const mc = classNames(
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
    semClass('root'),
  );
  const rootStyle = semStyle('root') ? { ...style, ...semStyle('root') } : style;

  return (
    <div className={mc} style={rootStyle}>
      {showText ? <span className={classNames(styles?.innerText, semClass('content'))} style={semStyle('content')}>{children}</span> : null}
    </div>
  );
};

export default Divider;
