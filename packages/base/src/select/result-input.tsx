import React, { useRef, useEffect } from 'react';
import { SelectClasses } from './select.type';
import { ResultInputProps } from './result-input.type';
import { Input } from '../date-picker/result';

interface IEWindow extends Window {
  clipboardData: {
    getData: () => string;
  };
}

const ResultInput = (props: ResultInputProps) => {
  const {
    jssStyle,
    value,
    values,
    inputText,
    focus,
    trim,
    maxLength,
    multiple,
    convertBr = ' ',
    onRef,
    onChange,
    onBindInput,
    onInputBlur,
    isEmpty,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>();

  const bindInputRef = (ref: HTMLInputElement) => {
    inputRef.current = ref;
  };

  const handleBlur = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value === inputText) {
      return;
    }
    if (trim) {
      return onInputBlur?.(inputText?.trim());
    }
    onInputBlur?.(inputText);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    let text = (e.clipboardData || (window as unknown as IEWindow).clipboardData).getData(
      'text/plain',
    );

    if (typeof convertBr === 'function') {
      text = convertBr(text).replace(/([\t\n\f\r\v])+/g, ' ');
    } else {
      text = text.replace(/([\t\n\f\r\v])+/g, convertBr);
    }
    document.execCommand('insertText', false, text);
  };

  const syncWidth = () => {
    if (!multiple) return;
    if (!mirrorRef.current) return;
    const input = inputRef.current as HTMLInputElement;
    if (isEmpty) {
      input.style.width = '100%';
    } else input.style.width = `${mirrorRef.current.offsetWidth}px`;
  };

  // 设置 input 宽度
  useEffect(() => {
    syncWidth();
  }, [inputText, focus, value]);

  // 多选选中结果后，聚焦并全选 input
  useEffect(() => {
    if (!inputRef.current || !multiple || !focus) return;
    syncWidth();
    inputRef.current.select();
  }, [values.length]);

  // 注册 input ref
  useEffect(() => {
    if (!inputRef.current) return;
    onRef.current = inputRef.current;
    onBindInput?.(inputRef.current);
  }, []);

  const style: React.CSSProperties = {};
  if (!multiple) {
    style.width = '100%';
  }
  if (!multiple && !focus && values.length !== 0) {
    style.width = '0';
    style.opacity = '0';
    style.minWidth = '0';
  }

  return (
    <React.Fragment>
      <Input
        onRef={bindInputRef}
        style={style}
        placeholder={props.placeholder}
        value={inputText as string}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={handleBlur}
        open={focus}
        onPaste={handlePaste}
      ></Input>
      <span className={styles.inputMirror} ref={mirrorRef}>
        {inputText || value}
      </span>
    </React.Fragment>
  );
};

export default ResultInput;
