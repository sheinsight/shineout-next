import React from 'react';
import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { ResultProps, ResultType } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
// import { Input } from '../date-picker/result';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty } = util;

const Result = <DataItem, Value>(props: ResultProps<DataItem, Value>) => {
  const {
    jssStyle,
    multiple,
    compressed,
    datum,
    // data,
    value,
    // noCache,
    focus,
    placeholder,
    filterText,
    renderUnmatched,
    renderResult: renderResultProp,
    // onCreate,
    onFilter,
  } = props;

  // const { current: resultCache } = useRef(new Map<Value, ResultType<Value> | DataItem>());
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles?.resultTextWrapper);

  // const handleCreate = (text: Value) => {
  //   const createFn = typeof onCreate === 'boolean' ? (t: Value) => t : onCreate;
  //   return createFn?.(text);
  // };

  const renderInput = (text: React.ReactNode) => {
    console.log(text);
    return <div>input</div>;
  };

  const renderResultContent = (data: DataItem | ResultType<Value>) => {
    if (datum.isUnMatchedData(data)) {
      if (typeof renderUnmatched === 'function') return renderUnmatched(data.value);
      return isObject(data.value) ? renderResultProp(data.value as DataItem) : data.value;
    }

    return renderResultProp(data as DataItem);
  };

  const renderItem = (item: DataItem, index: number) => {
    return (
      <Tag key={index} className={styles.tag} jssStyle={jssStyle}>
        {renderResultContent(item)}
      </Tag>
    );
  };

  const isEmptyResult = () => {
    if (!value) return true;
    const values = (multiple ? value : [value]) as Value[];

    if (values.length <= 0) return true;
    const hasValue =
      datum.getDataByValues(values).findIndex((item) => {
        const cur = renderResultContent(item);
        return !isEmpty(cur);
      }) >= 0;

    return !hasValue;
  };

  const showPlaceholder = isEmptyResult();

  const renderPlaceholder = () => {
    if (focus && onFilter && showPlaceholder) {
      return renderInput(multiple ? filterText : '');
    }

    return (
      <span className={classNames(styles.placeholder, styles.ellipsis)}>
        <span>{placeholder}</span>
      </span>
    );
  };

  const renderSingleResult = () => {
    if (!value) return null;

    const result = datum.getDataByValues([value]);
    const content = renderResultContent(result[0]);

    return <span className={styles.ellipsis}>{content}</span>;
  };

  const renderMultipleResult = () => {
    if (!value) return null;
    const result = datum.getDataByValues(value).map(renderItem);
    return result;
  };

  const renderMultipleResultMore = () => {
    return <More></More>;
  };

  const renderResult = () => {
    let result = null;

    if (multiple) {
      result = compressed ? renderMultipleResultMore() : renderMultipleResult();
      if (compressed) return renderMultipleResultMore();
    } else {
      result = renderSingleResult();
    }

    return showPlaceholder ? renderPlaceholder() : result;
  };

  return <div className={rootClass}>{renderResult()}</div>;
};

export default Result;
