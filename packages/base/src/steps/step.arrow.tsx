import clsx from 'clsx';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';

const ArrowStep = (props: StepStyleProps) => {
  const { jssStyle, title, description, onChange, index, status } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = clsx(styles.arrow);
  const config = useConfig();

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

  const renderContent = () => {
    return (
      <div className={styles.content}>
        {renderTitle()}
        {description && renderDescription()}
      </div>
    );
  };

  return (
    <div className={rootClass} onClick={onChange} dir={config.direction}>
      {renderContent()}
    </div>
  );
};

export default ArrowStep;
