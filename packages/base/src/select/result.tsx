import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util, addResizeObserver, OptionalToRequired, UnMatchedData } from '@sheinx/hooks';
import { ResultProps, ResultType } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
import Input from './result-input';
import { getResetMore } from './result-more';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty, isNumber, getKey } = util;

const Result = <DataItem, Value>(props: OptionalToRequired<ResultProps<DataItem, Value>>) => {
  const {
    jssStyle,
    multiple,
    datum,

    size,
    value,
    focus,
    keygen,
    disabled,
    trim,
    separator,
    maxLength,
    placeholder,
    filterText,
    inputText,
    compressed,
    compressedBound,
    compressedClassName,
    renderUnmatched,
    renderResult: renderResultProp,
    allowOnFilter,
    setInputText,
    childrenKey,
    onRef,
    onFilter,
    onInputBlur,
    onResetFilter,
    onClearCreatedData,
  } = props;

  const [more, setMore] = useState(-1);

  const resultRef = useRef<HTMLDivElement>(null);
  const shouldResetMore = useRef(false);
  const showInput = allowOnFilter;

  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles.resultTextWrapper, compressed && styles.compressedWrapper);

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
          value={filterText}
          trim={trim}
          focus={focus}
          multiple={multiple}
          maxLength={maxLength}
          values={value}
          onRef={onRef}
          inputText={inputText}
          onChange={onFilter!}
          onInputBlur={onInputBlur}
          onResetFilter={onResetFilter}
          onClearCreatedData={onClearCreatedData}
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

  const renderItem = (item: DataItem | UnMatchedData, index: number): React.ReactNode => {
    const handleClose = () => {
      datum.remove(item);
    };
    let isDisabled;
    if (util.isFunc(disabled)) {
      isDisabled = disabled(item as DataItem);
    } else {
      isDisabled = disabled;
    }
    const key = getKey(keygen, item as DataItem, index);
    return (
      <Tag
        key={key}
        disabled={isDisabled}
        size={size}
        className={styles.tag}
        onClose={handleClose}
        jssStyle={jssStyle as any}
      >
        {renderResultContent(item)}
      </Tag>
    );
  };

  const isEmptyResult = () => {
    if (!value) return true;
    const values = (multiple ? value : [value]) as Value[];

    if (values.length <= 0) return true;
    const hasValue =
      datum.getDataByValues(values, { childrenKey }).findIndex((item) => {
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
    const result = datum.getDataByValues([value], { childrenKey });
    const content = renderResultContent(result[0]);

    return (
      <span key='single' className={styles.ellipsis}>
        {content}
      </span>
    );
  };

  const renderMultipleResult = () => {
    if (isEmptyResult()) return renderNbsp();
    // [TODO] separator 处理逻辑后续交给 hooks 处理，此处临时处理
    let nextValue = value as Value[];
    if (separator && util.isString(value)) {
      nextValue = value.split(separator) as Value[];
    }
    const result = datum.getDataByValues(nextValue as Value[], { childrenKey }).map(renderItem);
    return result;
  };

  const renderMultipleResultMore = () => {
    if (isEmptyResult()) return renderNbsp();
    const result = datum.getDataByValues(value as Value[], { childrenKey }).map(renderItem);
    const moreNumber = getCompressedBound();
    return (
      <More
        keygen={keygen}
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
      if (showInput) {
        result.push(renderInput());
      } else if (result.length === 0) {
        result.push(renderNbsp());
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
      const result = datum.getDataByValues([value], { childrenKey });
      const content = renderResultContent(result[0]);
      if (!isEmpty(content)) {
        setInputText(content as string);
      }
    }
    if (!resultRef.current) return;
    if (!compressed) return;
    if (isCompressedBound()) return;

    handleResetMore();
  }, [value, focus]);

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
