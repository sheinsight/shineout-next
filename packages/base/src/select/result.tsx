import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util, addResizeObserver, UnMatchedData } from '@sheinx/hooks';
import { ResultProps } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
import Input from './result-input';
import { getResetMore } from './result-more';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty, isNumber, getKey, isUnMatchedData, isFunc } = util;

const Result = <DataItem, Value>(props: ResultProps<DataItem, Value>) => {
  const {
    jssStyle,
    multiple,
    size,
    value: valueProp,
    focus,
    keygen,
    disabled,
    trim,
    closeable = true,
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
    onRef,
    onFilter,
    onInputBlur,
    onResetFilter,
    onClearCreatedData,
    // crud
    getDataByValues,
    checkUnMatched,
    onRemove,
  } = props;

  const value = (multiple ? valueProp : [valueProp]) as Value[];

  const [more, setMore] = useState(-1);

  const resultRef = useRef<HTMLDivElement>(null);
  const shouldResetMore = useRef(false);
  const showInput = allowOnFilter;

  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(
    styles.resultTextWrapper,
    compressed && styles.compressedWrapper,
    multiple && styles.multipleResultWrapper,
    multiple && compressed && styles.multipleCompressedWrapper,
  );

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

  const renderResultContent = (data: DataItem | UnMatchedData) => {
    if (checkUnMatched(data)) {
      const _data = data as UnMatchedData;
      if (isFunc(renderUnmatched)) return renderUnmatched(_data.value);
      return isObject(_data.value) ? renderResultProp(_data.value as DataItem) : _data.value;
    }
    return renderResultProp(data as DataItem);
  };

  const renderItem = (item: DataItem | UnMatchedData, index: number): React.ReactNode => {
    let key;
    if (isUnMatchedData(item)) {
      if (isFunc(keygen)) {
        key = keygen(item.value, index);
      } else {
        key = item.value;
      }
    } else {
      key = getKey(keygen, item as DataItem, index);
    }
    const handleClose = () => {
      onRemove(item, key, index);
    };
    let isDisabled;
    if (util.isFunc(disabled)) {
      isDisabled = disabled(item as DataItem);
    } else {
      isDisabled = disabled;
    }
    let resultClassName;
    if (util.isFunc(props.resultClassName)) {
      resultClassName = props.resultClassName(key as DataItem);
    } else {
      resultClassName = props.resultClassName;
    }
    return (
      <Tag
        key={key}
        disabled={isDisabled}
        size={size}
        className={classNames(styles.tag, resultClassName)}
        onClose={closeable && handleClose}
        jssStyle={jssStyle as any}
        data-soui-type={disabled === true ? 'dark' : undefined}
      >
        {renderResultContent(item)}
      </Tag>
    );
  };

  const isEmptyResult = () => {
    if (!value) return true;
    // const values = (multiple ? value : [value]) as Value[];

    if (value.length <= 0) return true;
    const hasValue =
      getDataByValues(value).findIndex((item) => {
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
    // const values = [value];
    const result = getDataByValues(value);
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
    let nextValue = value;
    if (separator && util.isString(valueProp)) {
      nextValue = valueProp.split(separator) as Value[];
    }
    const result = getDataByValues(nextValue).map(renderItem);
    return result;
  };

  const renderMultipleResultMore = () => {
    const result = renderMultipleResult() as React.ReactNode[];
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
    if (!multiple && showInput && valueProp) {
      const result = getDataByValues(value);
      // 获取合法的 content
      const content = renderResultContent(result[0]);
      // 仅在关闭下拉框时，将输入框的值设置为合法的s选中的值
      if (!isEmpty(content) && focus === false) {
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
      if (shouldResetMore.current && (value || []).length) {
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
