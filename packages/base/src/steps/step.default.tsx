import clsx from 'clsx';
import { util } from '@sheinx/hooks';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';
import Icons from '../icons';
import { useConfig } from '../config';

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
    onChange,
  } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = styles.default;
  const config = useConfig();
  const iconClass = clsx(styles.icon, {
    [styles.finish]: status === 'finish',
    [styles.error]: status === 'error',
    [styles.process]: status === 'process',
    [styles.wait]: status === 'wait',
  });

  const showTail = labelPlacement === 'vertical' || direction === 'vertical';

  const renderTail = () => {
    return (
      <div className={styles.tail} dir={config.direction}>
        {' '}
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <div className={styles.title} dir={config.direction}>
        {util.isFunc(title) ? title(index, status!) : title}
      </div>
    );
  };

  const renderDescription = () => {
    return <div className={styles.description}>{description}</div>;
  };

  const renderIcon = () => {
    if (renderIconProp)
      return (
        <div className={iconClass} dir={config.direction}>
          <span className={styles.iconWrapper}>{renderIconProp(index, status)}</span>
        </div>
      );

    let iconComponent;
    if (status === 'finish') {
      iconComponent = Icons.steps.Finish;
    } else if (status === 'error') {
      iconComponent = Icons.steps.Error;
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
    <div className={rootClass} onClick={onChange}>
      {showTail && renderTail()}
      {renderIcon()}
      {renderContent()}
    </div>
  );
};

export default DefaultStep;
