import React, { useState, useRef, useEffect, useLayoutEffect, RefCallback, useCallback } from 'react';
import classNames from 'classnames';
import { util, addResizeObserver, UnMatchedData, useRender } from '@sheinx/hooks';
import { ResultProps } from './result.type';
import ResultInput from './result-input';
import { getResetMore } from './result-more';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty, isNumber, isUnMatchedData, isFunc, isArray } = util;

const getValueArr = (v: any) => {
  return (isArray(v) ? v : [v]).filter((v) => v !== undefined && v !== null);
};

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
    inputRef,
    compressed,
    compressedBound,
    compressedClassName,
    renderUnmatched,
    renderResult: renderResultProp,
    renderResultContent: renderResultContentProp,
    allowOnFilter,
    convertBr,
    onRef,
    onFilter,
    onInputBlur,
    onClearCreatedData,
    getDataByValues,
    checkUnMatched,
    onRemove,
    onResultItemClick,
    data,
  } = props;
  const value = (
    [null, undefined].includes(valueProp as any)
      ? []
      : Array.isArray(valueProp)
      ? valueProp
      : [valueProp]
  ) as Value;

  const [more, setMore] = useState(-1);
  const [shouldResetMore, setShouldResetMore] = useState(false);
  const render = useRender();

  const resultRef = useRef<HTMLDivElement>(null);
  const prevMore = useRef(more);
  const showInput = allowOnFilter;
  const mounted = useRef(false);
  const styles = props.classes;
  const rootClass = classNames(
    styles.resultTextWrapper,
    compressed && styles.compressedWrapper,
    multiple && styles.multipleResultWrapper,
    multiple && compressed && styles.multipleCompressedWrapper,
  );

  const renderResultContent = (
    data: DataItem | UnMatchedData,
    index?: number,
    nodes?: (DataItem | UnMatchedData)[],
  ) => {
    if (checkUnMatched(data)) {
      const _data = data as UnMatchedData;
      if (isFunc(renderUnmatched)) return renderUnmatched(_data.value);
      return isObject(_data.value)
        ? renderResultProp(_data.value as DataItem, index, nodes)
        : _data.value;
    }
    return renderResultProp(data as DataItem, index, nodes);
  };

  const isEmptyResult = () => {
    if (!value) return true;

    if (isArray(value) && value.length <= 0) return true;
    const datas = getDataByValues(value);

    const hasValue =
      datas.findIndex((item, index) => {
        const cur = renderResultContent(item, index, datas);
        return !isEmpty(cur);
      }) >= 0;

    return !hasValue;
  };

  const empty = isEmptyResult();

  const isCompressedBound = () => {
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1;
  };

  const getCompressedBound = () => {
    if (isCompressedBound()) {
      return compressedBound;
    }
    return more;
  };

  const handleResultItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: DataItem,
  ) => {
    onResultItemClick?.(e, item);
  };

  const renderInput = () => {
    let _placeholder = empty ? placeholder : '';
    if (!multiple && valueProp && valueProp !== 0) {
      const result = getDataByValues(value);
      _placeholder = renderResultContent(result[0]);
    }
    return (
      <React.Fragment key='input'>
        <ResultInput
          isEmpty={empty}
          classes={props.classes}
          value={filterText}
          trim={trim}
          focus={focus}
          multiple={multiple}
          maxLength={maxLength}
          values={value}
          onRef={onRef}
          inputText={inputText}
          onChange={onFilter!}
          convertBr={convertBr}
          onInputBlur={onInputBlur}
          onClearCreatedData={onClearCreatedData!}
          placeholder={_placeholder}
          disabled={util.isFunc(disabled) ? false : !!disabled}
        ></ResultInput>
      </React.Fragment>
    );
  };

  const renderResultItem = (
    item: DataItem | UnMatchedData,
    index: number,
    nodes?: (DataItem | UnMatchedData)[],
    v?: any,
  ): React.ReactNode => {
    const handleClose = () => {
      onRemove?.(item, v);
    };
    let isDisabled;
    if (util.isFunc(disabled)) {
      isDisabled = disabled(item as DataItem);
    } else {
      isDisabled = disabled;
    }
    let resultClassName;
    if (util.isFunc(props.resultClassName)) {
      resultClassName = props.resultClassName(isUnMatchedData(item) ? item.value : item);
    } else {
      resultClassName = props.resultClassName;
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleResultItemClick(e, item as DataItem);
    };

    const content = renderResultContent(item, index, nodes);

    if (!content) return null;

    if (renderResultContentProp) {
      // cascader 不渲染tag
      return renderResultContentProp({
        key: index,
        size,
        disabled: isDisabled,
        className: classNames(styles.tag, styles.hideTag, resultClassName),
        children: content,
        onClick: handleClick,
        ...util.getDataAttribute({ type: disabled === true ? 'dark' : undefined }),
      });
    }

    return (
      <Tag
        key={index}
        disabled={isDisabled}
        size={size}
        className={classNames(styles.tag, more === 1 && styles.tagOnly, resultClassName)}
        closable={closeable && 'only'}
        onClose={closeable && handleClose}
        onClick={handleClick}
        jssStyle={jssStyle as any}
        inlineStyle={true}
        {...util.getDataAttribute({ type: disabled === true ? 'dark' : undefined })}
      >
        {content}
      </Tag>
    );
  };

  const renderNbsp = () => {
    return (
      <React.Fragment key='space'>
        <div className={styles.space}>&nbsp;</div>
      </React.Fragment>
    );
  };

  const renderPlaceholder = () => {
    if (showInput) {
      return renderInput();
    }
    if (!placeholder) return renderNbsp();

    return (
      <span className={classNames(styles.placeholder, styles.ellipsis)}>
        <span>{placeholder}</span>
      </span>
    );
  };

  const renderSingleResult = () => {
    if (isEmptyResult()) return renderNbsp();
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
    let nextValue = getValueArr(value);
    if (separator && util.isString(valueProp)) {
      nextValue = valueProp.split(separator);
    }
    const datas = getDataByValues(nextValue as Value);
    const result = datas.map((d, i) => {
      const v = nextValue[i];
      if (renderResultContentProp && i !== datas.length - 1) {
        return [
          renderResultItem(d, i, datas, v),
          <span key={`separator-${i}`} className={classNames(styles.tag, styles.hideTag)}>
            /
          </span>,
        ];
      }
      return renderResultItem(d, i, datas, v);
    });
    return result;
  };

  const result = renderMultipleResult() as React.ReactNode[];
  const moreNumber = getCompressedBound();
  const renderMultipleResultMore = (
    <More
      keygen={keygen}
      key='more'
      classes={props.classes}
      jssStyle={props.jssStyle}
      data={result}
      size={size}
      more={moreNumber}
      compressed={compressed}
      compressedClassName={compressedClassName}
      showNum={moreNumber}
    ></More>
  );

  const renderResult = () => {
    if (empty) {
      return renderPlaceholder();
    }
    let result = [];
    if (multiple) {
      result.push(compressed ? renderMultipleResultMore : renderMultipleResult());
      if (showInput) {
        result.push(renderInput());
      } else if (result.length === 0) {
        result.push(renderNbsp());
      }
    } else {
      result.push(renderSingleResult());
      if (showInput) {
        if (focus) {
          result = [renderInput()];
        } else {
          result.push(renderInput());
        }
      }
    }
    return result;
  };

  const handleResetMore = () => {
    if (!compressed) return;
    if (isCompressedBound()) return;
    setMore(-1);
    setShouldResetMore(true);
  };

  useEffect(() => {
    if (!focus && mounted.current) {
      props.setInputText('');
      setTimeout(() => {
        onFilter?.('', 'blur');
      }, 400);
    }

    // 单选场景下，焦点时自动选中input文本
    if(focus && showInput && mounted.current){
      const nextValue = getValueArr(value);
      props.setInputText(nextValue[0]);

      setTimeout(() => {
        inputRef?.current?.select();
      }, 10);
    }
    mounted.current = true;
  }, [focus, showInput]);

  useLayoutEffect(() => {
    handleResetMore();
  }, [valueProp, data]);

  useLayoutEffect(() => {
    // datum.getDataByValues(value); 需要等待 useTree useEffect  执行完毕 才能获取到
    render();
  }, [data]);

  useLayoutEffect(() => {
    if (
      shouldResetMore &&
      more === -1 &&
      compressed &&
      resultRef.current &&
      ((props.value as any) || []).length
    ) {
      const tagClassName = `.${styles.tag.split(' ')[0]}`;
      if (shouldResetMore && isArray(value) && (value || []).length) {
        const newMore = getResetMore(
          showInput,
          resultRef.current,
          resultRef.current.querySelectorAll(tagClassName),
        );
        prevMore.current = newMore;
        setMore(newMore);
        setShouldResetMore(false);
      } else {
        setShouldResetMore(false);
      }
    } else if (shouldResetMore) {
      setShouldResetMore(false);
    }
  }, [shouldResetMore]);

  useEffect(() => {
    if (!resultRef.current) return;
    if (!compressed) return;
    if (isCompressedBound()) return;

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
