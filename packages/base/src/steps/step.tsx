import classNames from 'classnames';
import { StepsClasses } from '@sheinx/shineout-style';
import { StepProps, BaseStepProps } from './step.type';
import { StepsStatusType } from './steps.type';
import StepsContext from './steps-context';

const Step = (props: StepProps) => {
  const {
    jssStyle,
    title,
    current = 0,
    index = 0,
    status: statusProp,
    currentStatus,
    disabled,
  } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);

  const getStatus = (): StepsStatusType => {
    // status 优先级高于 currentStatus
    if (statusProp) return statusProp;
    if (currentStatus && current === index) return currentStatus;

    if (current === index) return 'process';
    if (current > index) return 'finish';
    return 'wait';
  };

  const status = getStatus();
  const rootClass = classNames(styles.step, styles[status], {
    [styles.disabled]: disabled,
  });

  // const renderDescription = () => {};

  // const renderTitle = () => {};

  // const renderIcon = () => {};

  // const renderContent = () => {};

  return <div className={rootClass}>{title}</div>;
};

const StepWidthContext = (props: BaseStepProps) => {
  return <StepsContext.Consumer>{(value) => <Step {...props} {...value} />}</StepsContext.Consumer>;
};

export default StepWidthContext;
