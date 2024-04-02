import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';

const DotStep = (props: StepStyleProps) => {
  const { jssStyle, title, description, direction, status, labelPlacement, onChange } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = styles.dot;
  const iconClass = classNames(styles.icon, {
    [styles.finish]: status === 'finish',
    [styles.error]: status === 'error',
    [styles.process]: status === 'process',
    [styles.wait]: status === 'wait',
  });

  const showTail = direction === 'vertical' || labelPlacement === 'vertical';

  const renderTail = () => {
    return <div className={styles.tail}> </div>;
  };

  const renderTitle = () => {
    return <div className={styles.title}>{util.isFunc(title) ? title(props.index, status!) : title}</div>;
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
      <div className={styles.content} onClick={onChange}>
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

export default DotStep;
