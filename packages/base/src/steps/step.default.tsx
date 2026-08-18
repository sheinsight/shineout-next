import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';
import Icons from '../icons';
import { useConfig } from '../config';

const DefaultStep = (props: StepStyleProps) => {
  const {
    jssStyle,
    title,
    description,
    direction,
    index,
    status,
    labelPlacement,
    renderIcon: renderIconProp,
    onChange,
    semClass,
    semStyle,
  } = props;
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = styles.default;
  const config = useConfig();
  const iconClass = classNames(styles.icon, {
    [styles.finish]: status === 'finish',
    [styles.error]: status === 'error',
    [styles.process]: status === 'process',
    [styles.wait]: status === 'wait',
  }, semClass('icon'));

  const showTail = labelPlacement === 'vertical' || direction === 'vertical';

  const renderTail = () => {
    return (
      <div className={classNames(styles.tail, semClass('tail'))} style={semStyle('tail')} dir={config.direction}>
        {' '}
      </div>
    );
  };

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

  const renderIcon = () => {
    if (renderIconProp)
      return (
        <div className={iconClass} style={semStyle('icon')} dir={config.direction}>
          <span className={styles.iconWrapper}>{renderIconProp(index, status)}</span>
        </div>
      );

    let iconComponent;
    if (status === 'finish') {
      iconComponent = Icons.steps.Finish;
    } else if (status === 'error') {
      iconComponent = Icons.steps.Error;
    } else {
      iconComponent = index + 1;
    }
    return (
      <div className={iconClass} style={semStyle('icon')}>
        <span className={styles.iconWrapper}>{iconComponent}</span>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={classNames(styles.content, semClass('content'))} style={semStyle('content')}>
        {renderTitle()}
        {description && renderDescription()}
      </div>
    );
  };

  return (
    <div className={rootClass} onClick={onChange}>
      {showTail && renderTail()}
      {renderIcon()}
      {renderContent()}
    </div>
  );
};

export default DefaultStep;
