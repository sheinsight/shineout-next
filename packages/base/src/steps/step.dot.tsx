import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';
import { StepsClasses } from './steps.type';
import { StepStyleProps } from './steps.type';

const DotStep = (props: StepStyleProps) => {
  const { jssStyle, title, description, direction, status, labelPlacement, onChange, semClass, semStyle } = props;
  const config = useConfig();
  const styles = jssStyle?.steps?.() || ({} as StepsClasses);
  const rootClass = styles.dot;
  const iconClass = classNames(styles.icon, {
    [styles.finish]: status === 'finish',
    [styles.error]: status === 'error',
    [styles.process]: status === 'process',
    [styles.wait]: status === 'wait',
  }, semClass('icon'));

  const showTail = direction === 'vertical' || labelPlacement === 'vertical';

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
        {util.isFunc(title) ? title(props.index, status!) : title}
      </div>
    );
  };

  const renderDescription = () => {
    return <div className={classNames(styles.description, semClass('description'))} style={semStyle('description')}>{description}</div>;
  };

  const renderIcon = () => {
    return (
      <div className={iconClass} style={semStyle('icon')} dir={config.direction}>
        <span className={styles.iconWrapper}></span>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={classNames(styles.content, semClass('content'))} style={semStyle('content')} onClick={onChange}>
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

export default DotStep;
