import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';

const Arrow = (
  <svg viewBox='0 0 40 100' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'>
    <path d='M 0 0 L 40 50 L 0 100' fill='currentColor' />
  </svg>
);

const ArrowStep = (props: StepStyleProps) => {
  const { jssStyle, title, description, onChange, index, status, semClass, semStyle } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const config = useConfig();

  const renderTitle = () => {
    return (
      <div className={classNames(styles.title, semClass('title'))} style={semStyle('title')} dir={config.direction}>
        {util.isFunc(title) ? title(index, status!) : title}
      </div>
    );
  };

  const renderDescription = () => {
    return <div className={classNames(styles.description, semClass('description'))} style={semStyle('description')}>{description}</div>;
  };

  const renderContent = () => {
    return (
      <div className={classNames(styles.content, semClass('content'))} style={semStyle('content')}>
        {renderTitle()}
        {description && renderDescription()}
      </div>
    );
  };

  const renderArrow = () => {
    return (
      <div className={styles.arrowIcon}>
        {Arrow}
        {Arrow}
      </div>
    );
  };

  return (
    <div className={styles.arrow} onClick={onChange} dir={config.direction}>
      {renderContent()}
      {renderArrow()}
    </div>
  );
};

export default ArrowStep;
