import classNames from 'classnames';
import { StepsClasses } from '@sheinx/shineout-style';
import { StepStyleProps } from './steps.type';

const ArrowStep = (props: StepStyleProps) => {
  const { jssStyle, title, description } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = classNames(styles.arrow);

  const renderTitle = () => {
    return <div className={styles.title}>{title}</div>;
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

  return <div className={rootClass}>{renderContent()}</div>;
};

export default ArrowStep;
