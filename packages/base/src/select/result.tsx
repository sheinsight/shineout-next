import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { ResultProps, ResultType } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
// import { Input } from '../date-picker/result';
// import { getResetMore } from './result-more';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty, getKey, isNumber } = util;

const Result = <DataItem, Value>(props: ResultProps<DataItem, Value>) => {
  const {
    jssStyle,
    multiple,
    datum,
    keygen,
    // data,
    value,
    // noCache,
    focus,
    placeholder,
    filterText,
    compressed,
    compressedBound,
    renderUnmatched,
    renderResult: renderResultProp,
    // onCreate,
    onFilter,
  } = props;

  const [more] = useState(-1);
  const resultRef = useRef<HTMLDivElement>(null);

  // const { current: resultCache } = useRef(new Map<Value, ResultType<Value> | DataItem>());
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles?.resultTextWrapper);

  // const handleCreate = (text: Value) => {
  //   const createFn = typeof onCreate === 'boolean' ? (t: Value) => t : onCreate;
  //   return createFn?.(text);
  // };

  const isCompressedBound = () => {
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1;
  };

  const getCompressedBound = () => {
    if (isCompressedBound()) {
      return compressedBound;
    }
    return more;
  };

  // const handleResetMore = () => {};

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

  const renderItem = (item: DataItem, index: number): React.ReactNode => {
    const handleClose = () => {
      datum.remove(item);
    };
    const key = getKey(keygen, item, index);
    return (
      <Tag key={key} className={styles.tag} onClose={handleClose} jssStyle={jssStyle}>
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
    if (!value) return null;
    const result = datum.getDataByValues(value).map(renderItem);
    const moreNumber = getCompressedBound();
    return (
      <More
        jssStyle={jssStyle}
        data={result}
        more={moreNumber}
        compressed={compressed}
        showNum={moreNumber}
      ></More>
    );
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

  // useEffect(() => {
  //   if (!resultRef.current) return;
  //   const newMore = getResetMore(
  //     onFilter,
  //     resultRef.current,
  //     resultRef.current.querySelectorAll(`.${styles.tag}`),
  //   );
  //   setMore(newMore);
  // }, [value]);

  return (
    <div ref={resultRef} className={rootClass}>
      {renderResult()}
    </div>
  );
};

export default Result;
