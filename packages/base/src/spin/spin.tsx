import classNames from 'classnames';
import { SpinClasses, SpinProps } from './spin.type';
import Spins from './spins';

const Spin = (props: SpinProps = {}) => {
  const {
    jssStyle,
    className,
    children,
    loading = true,
    name = 'default',
    tip,
    color,
    mode = 'vertical',
  } = props;

  const spinStyle = jssStyle?.spin?.() || ({} as SpinClasses);

  const contentClass = classNames(className, spinStyle.content, {
    [spinStyle.vertical]: mode === 'vertical',
    [spinStyle.horizontal]: mode === 'horizontal',
  });

  const renderSpin = () => {
    if (Spins[name]) {
      return Spins[name](props);
    }

    return null;
  };

  const renderTip = () => {
    return (
      <div className={classNames(className, spinStyle.tip)} style={{ color }}>
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
      <div className={spinStyle.container}>
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
