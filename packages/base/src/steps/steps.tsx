import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { StepsClasses, StepsClassNamesInfo, StepsSemanticKey } from './steps.type';
import { StepsProps } from './steps.type';
import { StepProps } from './step.type';
import StepsContext from './steps-context';
import Step from './step';
import { useSemantic } from '../common';
import { useConfig } from '../config';

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
    classNames: classNamesProp,
    styles: stylesProp,
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

  // Semantic DOM
  const config = useConfig();
  const semInfo: StepsClassNamesInfo = { type, direction };
  const [semClass, semStyle] = useSemantic<StepsSemanticKey, StepsClassNamesInfo>(
    classNamesProp,
    stylesProp,
    config.steps,
    semInfo,
  );

  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = classNames(styles.rootClass, styles.steps, className, {
    [styles[type]]: type,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.vertical]: direction === 'vertical',
    [styles.horizontal]: direction === 'horizontal',
    [styles.click]: onChange !== undefined,
  }, semClass('root', []));

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
    <div className={rootClass} style={{ ...style, ...semStyle('root') }}>
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
          globalSemanticConfig: config.steps,
        }}
      >
        {renderStep()}
      </StepsContext.Provider>
    </div>
  );
};

Steps.Step = Step;

export default Steps;
