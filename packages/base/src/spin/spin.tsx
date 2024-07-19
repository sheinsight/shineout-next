import classNames from 'classnames';
import { SpinClasses, SpinProps } from './spin.type';
import Spins from './spins';
import { useConfig } from '../config';

const Spin = (props: SpinProps = {}) => {
  const {
    jssStyle,
    className,
    children,
    style,
    loading,
    name: nameProps,
    tip,
    tipClassName,
    color,
    mode = 'vertical',
  } = props;

  const config = useConfig();

  const name = nameProps ?? config.spin ?? 'default';

  const spinStyle = jssStyle?.spin?.() || ({} as SpinClasses);

  const contentClass = classNames(className, spinStyle.content, {
    [spinStyle.vertical]: mode === 'vertical',
    [spinStyle.horizontal]: mode === 'horizontal',
  });

  const renderSpin = () => {
    const n = name as keyof typeof Spins;
    if (Spins[n]) {
      const Comp = Spins[n];
      return <Comp {...props} style={style} />;
    }

    return null;
  };

  const renderTip = () => {
    return (
      <div className={classNames(tipClassName, spinStyle.tip)} style={{ color }}>
        {typeof tip === 'string' ? <span>{tip}</span> : tip}
      </div>
    );
  };

  const renderContent = () => {
    if ('tip' in props) {
      return (
        <div className={contentClass}>
          {renderSpin()}
          {tip && renderTip()}
        </div>
      );
    }

    return renderSpin();
  };
  const renderContainer = () => {
    return (
      <div className={classNames(className, spinStyle.container)}>
        {children}
        {loading && <div className={spinStyle.loading}>{renderContent()}</div>}
      </div>
    );
  };

  if (children) {
    return renderContainer();
  }

  return renderContent();
};

export default Spin;
