import classNames from 'classnames';
import { ResultProps } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';

const Result = (props: ResultProps) => {
  const { jssStyle } = props;

  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles?.resultTextWrapper);

  const renderResult = () => {
    return (
      <div className={classNames(styles?.resultText, styles?.placeholder)}>
        <div className={styles?.resultTextPadding}>result</div>
      </div>
    );
  };

  return <div className={rootClass}>{renderResult()}</div>;
};

export default Result;
