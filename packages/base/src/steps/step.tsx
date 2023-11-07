import classNames from 'classnames';
import { StepsClasses } from '@sheinx/shineout-style';
import { StepProps, BaseStepProps } from './step.type';
import { StepsStatusType } from './steps.type';
import StepsContext from './steps-context';
import DefaultStep from './step.default';
import DotStep from './step.dot';
// import ArrowStep from './step.arrow';

const Step = (props: StepProps) => {
  const {
    jssStyle,
    title,
    size,
    type,
    current = 0,
    index = 0,
    icon,
    description,
    labelPlacement: labelPlacementProp = 'horizontal',
    status: statusProp,
    currentStatus,
    disabled,
    direction,
  } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);

  const getLabelPlacement = () => {
    // dot 类型只支持 vertical labelPlacement
    if (type === 'dot') {
      return 'vertical';
    }
    return labelPlacementProp;
  };

  const getStatus = (): StepsStatusType => {
    // status 优先级高于 currentStatus
    if (statusProp) return statusProp;
    if (currentStatus && current === index) return currentStatus;

    if (current === index) return 'process';
    if (current > index) return 'finish';
    return 'wait';
  };

  const status = getStatus();
  const labelPlacement = getLabelPlacement();
  const rootClass = classNames(styles.step, styles[status], {
    [styles.disabled]: disabled,
    // 即便是指定 status 也需要考虑是否为 finish 状态
    [styles.finish]: current > index,
    [styles.horizontalLabel]: labelPlacement === 'horizontal',
    [styles.verticalLabel]: labelPlacement === 'vertical',
  });

  const renderStep = () => {
    let Component = DefaultStep;
    if (type === 'default') {
      Component = DefaultStep;
    } else if (type === 'dot') {
      Component = DotStep;
    }

    return (
      <Component
        jssStyle={jssStyle}
        icon={icon}
        status={status}
        size={size}
        index={index}
        title={title}
        direction={direction}
        labelPlacement={labelPlacement}
        description={description}
      ></Component>
    );
  };

  return <div className={rootClass}>{renderStep()}</div>;
};

const StepWidthContext = (props: BaseStepProps) => {
  return <StepsContext.Consumer>{(value) => <Step {...props} {...value} />}</StepsContext.Consumer>;
};

export default StepWidthContext;
