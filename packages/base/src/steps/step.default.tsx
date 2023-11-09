import classNames from 'classnames';
import { StepsClasses } from '@sheinx/shineout-style';
import { StepStyleProps } from './steps.type';
import Icons from '../icons';

const DefaultStep = (props: StepStyleProps) => {
  const {
    jssStyle,
    title,
    description,
    direction,
    index,
    status,
    labelPlacement,
    renderIcon: renderIconProp,
  } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = styles.default;
  const iconClass = classNames(styles.icon, {
    [styles.finish]: status === 'finish',
    [styles.error]: status === 'error',
    [styles.process]: status === 'process',
    [styles.wait]: status === 'wait',
  });

  const showTail = labelPlacement === 'vertical' || direction === 'vertical';

  const renderTail = () => {
    return <div className={styles.tail}> </div>;
  };

  const renderTitle = () => {
    return <div className={styles.title}>{title}</div>;
  };

  const renderDescription = () => {
    return <div className={styles.description}>{description}</div>;
  };

  const renderIcon = () => {
    if (renderIconProp)
      return (
        <div className={iconClass}>
          <span className={styles.iconWrapper}>{renderIconProp(index, status)}</span>
        </div>
      );

    let iconComponent;
    if (status === 'finish') {
      iconComponent = Icons.Check;
    } else if (status === 'error') {
      iconComponent = Icons.Close;
    } else {
      iconComponent = index + 1;
    }
    return (
      <div className={iconClass}>
        <span className={styles.iconWrapper}>{iconComponent}</span>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={styles.content}>
        {renderTitle()}
        {description && renderDescription()}
      </div>
    );
  };

  return (
    <div className={rootClass}>
      {showTail && renderTail()}
      {renderIcon()}
      {renderContent()}
    </div>
  );
};

export default DefaultStep;
