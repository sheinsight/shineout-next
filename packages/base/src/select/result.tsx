import { useRef } from 'react';
import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { ResultProps, ResultType } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
// import { Input } from '../date-picker/result';
import More from './result-more';
// import Tag from '../tag';

const { isObject } = util;

const Result = <DataItem, Value>(
  props: ResultProps<DataItem, Value extends (infer U)[] ? U : Value>,
) => {
  const {
    jssStyle,
    multiple,
    compressed,
    datum,
    data,
    value,
    noCache,
    // focus,
    // placeholder,
    renderUnmatched,
    renderResult: renderResultProp,
    onCreate,
    // onFilter,
  } = props;

  const { current: resultCache } = useRef(new Map<Value, ResultType<Value> | DataItem>());
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles?.resultTextWrapper);

  // const renderItem = () => {
  //   return <Tag jssStyle={jssStyle}>test</Tag>;
  // };

  const handleCreate = (text: Value) => {
    const createFn = typeof onCreate === 'boolean' ? (t: Value) => t : onCreate;
    return createFn?.(text);
  };

  const getResult = (value: Value extends (infer U)[] ? U : Value) => {
    const prediction = props.prediction || ((v, d) => v === datum.format(d));
    // if (treeData) return this.getTreeResult(value, prediction)

    for (let i = 0, count = data.length; i < count; i++) {
      const d = data![i];
      if (prediction(value, d)) return d;
    }

    if (onCreate) return handleCreate(value);

    return undefined;
  };

  const getResultByValue = (value: Value extends (infer U)[] ? U : Value) => {
    let result = noCache ? undefined : resultCache.get(value);
    if (!result) {
      result = getResult(value);
      if (result !== undefined && !noCache) resultCache.set(value, result);
      else if (result === undefined) result = { IS_NOT_MATCHED_VALUE: true, value };
    }
    return result;
  };

  // const renderInput = () => {};

  const renderResultContent = (data: DataItem | ResultType<Value>) => {
    if (datum.isUnMatchedData(data)) {
      if (typeof renderUnmatched === 'function') return renderUnmatched(data.value);
      return isObject(data.value) ? renderResultProp(data.value as DataItem) : data.value;
    }

    return renderResultProp(data as DataItem);
  };

  // const isEmptyResult = () => {
  //   if (!value) return true;
  //   const values = multiple ? value : [value];

  //   if (values.length <= 0) return true;
  //   const hasValue =
  //     values.findIndex((item: Value) => {
  //       const cur = getResultByValue(item);
  //       const r = renderResultContent(cur);
  //       return !isEmpty(r);
  //     }) >= 0;
  //   return !hasValue;
  // };

  // const renderPlaceholder = () => {
  //   // if (focus && onFilter && empty) {
  //   //   return this.renderInput(multiple ? filterText : '');
  //   // }
  // };

  const renderSingleResult = () => {
    console.log(value);
    if (!value) return null;
    // const data = datum.getDataByValues([value]);
    const result = getResultByValue(value);
    const content = renderResultContent(result);
    return <span className={styles.ellipsis}>{content}</span>;
  };

  const renderMultipleResult = () => {
    return (
      <div className={classNames(styles?.resultText, styles?.placeholder)}>
        <div className={styles?.resultTextPadding}>result multiple</div>
      </div>
    );
  };

  const renderMultipleResultMore = () => {
    return <More></More>;
  };

  const renderResult = () => {
    if (multiple) {
      if (compressed) return renderMultipleResultMore();

      return renderMultipleResult();
    }

    return (
      <div className={classNames(styles?.resultText, styles?.placeholder)}>
        <div className={styles?.resultTextPadding}>{renderSingleResult()}</div>
      </div>
    );
  };

  return <div className={rootClass}>{renderResult()}</div>;
};

export default Result;
