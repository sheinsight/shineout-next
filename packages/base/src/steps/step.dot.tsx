import classNames from 'classnames';
import { StepsClasses } from '@sheinx/shineout-style';
import { StepStyleProps } from './steps.type';

const DotStep = (props: StepStyleProps) => {
  const { jssStyle, title, description, direction, status } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = styles.dot;
  const iconClass = classNames(styles.icon, {
    [styles.finish]: status === 'finish',
    [styles.error]: status === 'error',
    [styles.process]: status === 'process',
    [styles.wait]: status === 'wait',
  });

  const showTail = direction === 'vertical' || false;

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
    return (
      <div className={iconClass}>
        <span className={styles.iconWrapper}></span>
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

export default DotStep;
