import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
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
    reFocus,
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
    renderCompressed,
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
  const { current: context } = useRef({
    prevMore: more,
    maxMore: 0,
  });
  const removeLock = useRef(false);
  const showInput = allowOnFilter;
  const mounted = useRef(false);
  const styles = props.classes;
  const rootClass = classNames(
    styles.resultTextWrapper,
    compressed && styles.compressedWrapper,
    compressedBound && compressedBound > 0 && styles.compressedBoundWrapper,
    multiple && styles.multipleResultWrapper,
    multiple && compressed && styles.multipleCompressedWrapper,
  );

  const renderResultContent = (
    data: DataItem | UnMatchedData | null,
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

  const empty = useMemo(() => {
    return isEmptyResult();
  }, [props.value, props.data, getDataByValues]);

  const basePlaceholder = useMemo(() => {
    return (
      <span className={classNames(styles.placeholder, styles.ellipsis)}>
        <span>{placeholder}</span>
      </span>
    );
  }, [placeholder]);

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
      if (_placeholder === undefined) {
        return basePlaceholder;
      }
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

  const handleCloseMouseDown = () => {
    removeLock.current = true;
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
        onMouseDown={closeable ? handleCloseMouseDown : undefined}
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

    return basePlaceholder;
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

  const renderMultipleResult = useMemo(() => {
    if (isEmptyResult()) return { results: renderNbsp(), datas: undefined };
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
    return { results: result, datas };
  }, [
    props.value, // 必需：控制选中的值
    props.data, // 必需：数据源
    separator, // 必需：影响值的分割
    valueProp, // 必需：影响值的处理
    renderResultContentProp, // 必需：影响渲染方式
    renderResultItem, // 必需：渲染每个选项的方法
    getDataByValues, // 必需：根据值获取数据的方法
  ]);

  const result = renderMultipleResult.results as React.ReactNode[];
  const moreNumber = getCompressedBound();
  const renderMultipleResultMore = (
    <More
      keygen={keygen}
      key='more'
      onRemove={onRemove}
      classes={props.classes}
      jssStyle={props.jssStyle}
      data={result}
      datas={renderMultipleResult.datas}
      size={size}
      compressed={compressed}
      renderCompressed={renderCompressed}
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
      result.push(compressed ? renderMultipleResultMore : renderMultipleResult.results);
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

  const handleResetMore = (valueLength?: number) => {
    if (!compressed) return;
    if (isCompressedBound()) return;
    if (removeLock.current) {
      removeLock.current = false;
      return;
    }

    // why requestIdleCallback: 当选项数量远超容器承载能力时，延迟昂贵的DOM计算，在1000+选项时，同步的重新计算会导致INP超过1000ms
    const hasExistingCompression = context.prevMore > 0;
    const hasValidEstimate = context.maxMore > 0;
    const exceedsCapacity = valueLength && valueLength > context.maxMore;
    if (hasExistingCompression && hasValidEstimate && exceedsCapacity && typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        setMore(-1);
        setShouldResetMore(true);
      });
    } else {
      if(!renderCompressed) setMore(-1);
      setShouldResetMore(true);
    }
  };

  useEffect(() => {
    if (!focus && mounted.current) {
      props.setInputText('');
      setTimeout(() => {
        onFilter?.('', 'blur');
      }, 200);
    }

    // 单选场景下，焦点时自动选中input文本
    if (!multiple && focus && showInput && mounted.current) {
      const result = getDataByValues(value);
      if (result.length > 0) {
        const inputTmpText = renderResultContent(result[0]);
        if (inputTmpText) {
          // 提取result文本
          const getTextFromReactElement = (element: React.ReactElement): string => {
            if (!element) return '';
            // 如果是字符串或数字，直接返回
            if (typeof element === 'string' || typeof element === 'number') return String(element);
            // 如果是 React Element，处理的是renderResult返回的是React Element的场景
            if (React.isValidElement(element)) {
              const children = (element.props as { children?: React.ReactNode })?.children;
              if (Array.isArray(children)) {
                return children.map((child) => getTextFromReactElement(child)).join('');
              }
              return React.isValidElement(children)
                ? getTextFromReactElement(children)
                : String(children || '');
            }
            return '';
          };

          const textContent = getTextFromReactElement(inputTmpText);
          props.setInputText(textContent);
        }
      }
      if (!reFocus) {
        setTimeout(() => {
          inputRef?.current?.select();
        }, 10);
      }
    }
    mounted.current = true;
  }, [focus, placeholder, multiple]);

  // Select多选模式下，且开启了onFilter，自动聚焦
  useLayoutEffect(() => {
    if (multiple && focus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [focus, multiple]);

  useLayoutEffect(() => {
    handleResetMore((valueProp as any)?.length || 0);
  }, [valueProp, data]);

  useEffect(() => {
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
        context.prevMore = newMore;
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

    context.maxMore = Math.floor(resultRef.current.clientWidth / 20);

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
