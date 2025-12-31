import clsx from 'clsx';
import { StepsClasses } from './steps.type';
import { util } from '@sheinx/hooks';
import { StepPropsWidthContext, BaseStepProps } from './step.type';
import { StepsStatusType } from './steps.type';
import StepsContext from './steps-context';
import DefaultStep from './step.default';
import DotStep from './step.dot';
import ArrowStep from './step.arrow';
import { useConfig } from '../config';

const Step = (props: StepPropsWidthContext) => {
  const {
    id,
    jssStyle,
    title,
    size,
    type,
    className,
    current = 0,
    index = 0,
    renderIcon,
    description,
    labelPlacement: labelPlacementProp = 'horizontal',
    status: statusProp,
    currentStatus,
    disabled,
    direction,
    onClick,
    onChange,
  } = props;

  const config = useConfig();
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);

  const isDisabled = typeof disabled === 'function' ? disabled(index, id) : disabled;

  const getLabelPlacement = () => {
    // dot 类型只支持 vertical labelPlacement
    if (type === 'dot') {
      if (direction === 'vertical') return 'horizontal';
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

  const rootClass = clsx(styles.step, className, styles[status], {
    [styles.disabled]: isDisabled,
    // 即便是指定 status 也需要考虑是否为 finish 状态
    [styles.finish]: current > index,
    [styles.horizontalLabel]: labelPlacement === 'horizontal',
    [styles.verticalLabel]: labelPlacement === 'vertical',
    [styles.widthDescription]: !!description,
  });

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    onClick?.(e, index, id);
    onChange?.(index);
  };

  const renderTitle = () => {
    if (util.isFunc(title)) {
      return title(index, status);
    }

    return title;
  };

  const renderStep = () => {
    let Component = DefaultStep;
    if (type === 'default') {
      Component = DefaultStep;
    } else if (type === 'dot') {
      Component = DotStep;
    } else if (type === 'arrow') {
      Component = ArrowStep;
    }

    return (
      <Component
        jssStyle={jssStyle}
        renderIcon={renderIcon}
        status={status}
        size={size}
        index={index}
        title={renderTitle()}
        direction={direction}
        labelPlacement={labelPlacement}
        description={description}
        onChange={handleChange}
      ></Component>
    );
  };

  return (
    <div className={rootClass} dir={config.direction}>
      {renderStep()}
    </div>
  );
};

const StepWidthContext = (props: BaseStepProps) => {
  return (
    <StepsContext.Consumer>
      {(value) => {
        const disabled = 'disabled' in props ? props.disabled : value.disabled;
        return <Step {...props} {...value} disabled={disabled} />;
      }}
    </StepsContext.Consumer>
  );
};

export default StepWidthContext;
