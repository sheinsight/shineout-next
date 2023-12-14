import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util, addResizeObserver, OptionalToRequired } from '@sheinx/hooks';
import { ResultProps, ResultType } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
import Input from './result-input';
import { getResetMore } from './result-more';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty, getKey, isNumber } = util;

const Result = <DataItem, Value>(props: OptionalToRequired<ResultProps<DataItem, Value>>) => {
  const {
    jssStyle,
    multiple,
    datum,
    keygen,
    size,
    value,
    // noCache,
    focus,
    placeholder,
    inputText,
    // filterText,
    compressed,
    compressedBound,
    compressedClassName,
    renderUnmatched,
    renderResult: renderResultProp,
    onCreate,
    // allowOnFilter,
    onRef,
    onFilter,
    onInputBlur,
    onResetFilter,
  } = props;

  const [more, setMore] = useState(-1);
  const [text, setText] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const shouldResetMore = useRef(false);
  const showInput = onFilter || onCreate;

  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles.resultTextWrapper, compressed && styles.compressedWrapper);

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

  const renderInput = () => {
    return (
      <React.Fragment key='input'>
        <Input
          jssStyle={jssStyle}
          style={{ width: 12 }}
          value={text}
          focus={focus}
          multiple={multiple}
          values={value}
          onRef={onRef}
          inputText={inputText}
          onChange={onFilter}
          onInputBlur={onInputBlur}
          onResetFilter={onResetFilter}
        ></Input>
      </React.Fragment>
    );
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
      <Tag key={key} size={size} className={styles.tag} onClose={handleClose} jssStyle={jssStyle}>
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

  const showPlaceholder = placeholder && isEmptyResult();

  const renderNbsp = () => {
    return (
      <React.Fragment key='space'>
        <div className={styles.space}>&nbsp;</div>
      </React.Fragment>
    );
  };

  const renderPlaceholder = () => {
    if (focus && showInput && showPlaceholder) {
      return renderInput();
    }

    return (
      <span className={classNames(styles.placeholder, styles.ellipsis)}>
        <span>{placeholder}</span>
      </span>
    );
  };

  const renderSingleResult = () => {
    if (isEmptyResult()) return renderNbsp();
    const result = datum.getDataByValues([value]);
    const content = renderResultContent(result[0]);

    return (
      <span key='single' className={styles.ellipsis}>
        {content}
      </span>
    );
  };

  const renderMultipleResult = () => {
    if (isEmptyResult()) return renderNbsp();
    const result = datum.getDataByValues(value).map(renderItem);
    return result;
  };

  const renderMultipleResultMore = () => {
    if (isEmptyResult()) return renderNbsp();
    const result = datum.getDataByValues(value).map(renderItem);
    const moreNumber = getCompressedBound();
    return (
      <More
        key='more'
        jssStyle={jssStyle}
        data={result}
        size={size}
        more={moreNumber}
        compressed={compressed}
        compressedClassName={compressedClassName}
        showNum={moreNumber}
      ></More>
    );
  };

  const renderResult = () => {
    let result = [];
    if (multiple) {
      result.push(compressed ? renderMultipleResultMore() : renderMultipleResult());
      if (onFilter || onCreate) {
        result.push(renderInput());
      }
    } else {
      if (showInput) {
        result = [renderInput()];
      } else {
        result.push(renderSingleResult());
      }
    }
    return showPlaceholder ? renderPlaceholder() : result;
  };

  const handleResetMore = () => {
    if (!compressed) return;
    shouldResetMore.current = true;
    setMore(-1);
  };

  useEffect(() => {
    if (!multiple && showInput && value) {
      const result = datum.getDataByValues([value]);
      const content = renderResultContent(result[0]);
      if (!isEmpty(content)) {
        setText(content as string);
      }
    }
    if (!resultRef.current) return;
    if (!compressed) return;
    if (isCompressedBound()) return;
    handleResetMore();
  }, [value]);

  useEffect(() => {
    if (!compressed) return;
    if (!resultRef.current) return;

    if (more === -1) {
      if (shouldResetMore.current && ((value as Value[]) || []).length) {
        shouldResetMore.current = false;
        const newMore = getResetMore(
          showInput,
          resultRef.current,
          resultRef.current.querySelectorAll(`.${styles.tag}`),
        );
        setMore(newMore);
      }
    }
  }, [value, more]);

  useEffect(() => {
    if (!resultRef.current) return;
    const cancelObserver = addResizeObserver(resultRef.current, handleResetMore, {
      direction: 'x',
    });

    return () => {
      cancelObserver();
    };
  }, []);

  return (
    <div ref={resultRef} className={rootClass}>
      {renderResult()}
    </div>
  );
};

export default Result;
