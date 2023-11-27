import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util, addResizeObserver } from '@sheinx/hooks';
import { ResultProps, ResultType } from './result.type';
import { SelectClasses } from '@sheinx/shineout-style';
import { Input } from '../date-picker/result';
import { getResetMore } from './result-more';
import More from './result-more';
import Tag from '../tag';

const { isObject, isEmpty, getKey, isNumber } = util;

const Result = <DataItem, Value>(props: ResultProps<DataItem, Value>) => {
  const {
    jssStyle,
    multiple,
    datum,
    keygen,
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
    allowOnFilter,
    onRef,
    onFilter,
  } = props;

  const [more, setMore] = useState(-1);
  const [text, setText] = useState('');
  const [inputWidth] = useState(12);
  const resultRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  // const inputWidthRef = useRef<number>(12);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldResetMore = useRef(false);

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
          onRef={(el) => {
            onRef.current = el;
            inputRef.current = el;
          }}
          style={{ width: inputWidth }}
          value={text as string}
          onChange={onFilter}
        ></Input>
        <span className={styles.inputMirror} ref={mirrorRef}>
          {filterText}
        </span>
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
    if (focus && allowOnFilter && showPlaceholder) {
      return renderInput();
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

    return (
      <span key='single' className={styles.ellipsis}>
        {content}
      </span>
    );
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
        key='more'
        jssStyle={jssStyle}
        data={result}
        more={moreNumber}
        compressed={compressed}
        showNum={moreNumber}
      ></More>
    );
  };

  const renderResult = () => {
    let result = [];

    if (multiple) {
      result.push(compressed ? renderMultipleResultMore() : renderMultipleResult());
      if (allowOnFilter) {
        result.push(renderInput());
      }
    } else {
      if (allowOnFilter) {
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
    if (!resultRef.current) return;
    const cancelObserver = addResizeObserver(resultRef.current, handleResetMore, {
      direction: 'x',
    });

    return () => {
      cancelObserver();
    };
  }, []);

  // focus 或 输入值 text 变化时，更新 input 宽度
  useEffect(() => {
    if (!mirrorRef.current) return;
    const input = inputRef.current as HTMLInputElement;
    input.style.width = `${mirrorRef.current.offsetWidth}px`;
  }, [filterText, focus]);

  // focus 变化且为 true 时，聚焦 input
  useEffect(() => {
    if (!focus || !allowOnFilter) return;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    if (!multiple && allowOnFilter && value) {
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
          allowOnFilter,
          resultRef.current,
          resultRef.current.querySelectorAll(`.${styles.tag}`),
        );
        setMore(newMore);
      }
    }
  }, [value, more]);

  return (
    <div ref={resultRef} className={rootClass}>
      {renderResult()}
    </div>
  );
};

export default Result;
