import { Children, cloneElement } from 'react';
import clsx from 'clsx';
import { StepsClasses } from './steps.type';
import { StepsProps } from './steps.type';
import { StepProps } from './step.type';
import StepsContext from './steps-context';
import Step from './step';

const Steps = (props: StepsProps) => {
  const {
    jssStyle,
    children,
    style,
    className,
    type = 'default',
    size,
    disabled,
    status,
    direction: directionProp = 'horizontal',
    labelPlacement: labelPlacementProp = 'vertical',
    current = 0,
    renderIcon,
    onChange,
  } = props;

  const getDirection = () => {
    // arrow 类型只支持 horizontal direction
    if (type === 'arrow') return 'horizontal';
    return directionProp;
  };

  const direction = getDirection();

  const getLabelPlacement = () => {
    // 布局为 vertical 只支持 horizontal labelPlacement
    if (direction === 'vertical') return 'horizontal';
    return labelPlacementProp;
  };

  const labelPlacement = getLabelPlacement();

  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = clsx(styles.rootClass, styles.steps, className, {
    [styles[type]]: type,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.vertical]: direction === 'vertical',
    [styles.horizontal]: direction === 'horizontal',
    [styles.click]: onChange !== undefined,
  });

  const renderStep = () => {
    return Children.map(children, (child, index) => {
      if (!child) return null;
      const Child = child as React.ReactElement<StepProps>;
      return cloneElement(Child, {
        id: 'id' in Child.props ? Child.props.id : index,
        index,
        renderIcon,
      });
    });
  };

  return (
    <div className={rootClass} style={style}>
      <StepsContext.Provider
        value={{
          jssStyle,
          current,
          currentStatus: status,
          direction,
          labelPlacement,
          size,
          type,
          disabled,
          onChange,
        }}
      >
        {renderStep()}
      </StepsContext.Provider>
    </div>
  );
};

Steps.Step = Step;

export default Steps;
