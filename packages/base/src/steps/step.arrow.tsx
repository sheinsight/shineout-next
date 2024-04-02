import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';

const ArrowStep = (props: StepStyleProps) => {
  const { jssStyle, title, description, onChange, index, status } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = classNames(styles.arrow);

  const renderTitle = () => {
    return <div className={styles.title}>{util.isFunc(title) ? title(index, status!) : title}</div>;
  };

  const renderDescription = () => {
    return <div className={styles.description}>{description}</div>;
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
      {renderContent()}
    </div>
  );
};

export default ArrowStep;
