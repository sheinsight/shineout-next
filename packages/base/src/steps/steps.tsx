import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { StepsClasses } from '@sheinx/shineout-style';
import { StepsProps } from './steps.type';
import { StepProps } from './step.type';
import StepsContext from './steps-context';
import Step from './step';

const Steps = (props: StepsProps) => {
  const {
    jssStyle,
    children,
    type = 'default',
    size,
    status,
    direction = 'horizontal',
    labelPlacement = 'horizontal',
    current = 0,
    onChange,
  } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = classNames(styles.steps, {
    [styles[type]]: type,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.vertical]: direction === 'vertical',
    [styles.horizontal]: direction === 'horizontal',
  });

  const renderStep = () => {
    return Children.map(children, (child, index) => {
      const Child = child as React.ReactElement<StepProps>;
      return cloneElement(Child, {
        id: 'id' in Child.props ? Child.props.id : index,
        index,
      });
    });
  };

  return (
    <div className={rootClass}>
      <StepsContext.Provider
        value={{
          jssStyle,
          current,
          currentStatus: status,
          direction,
          labelPlacement,
          size,
          type,
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
