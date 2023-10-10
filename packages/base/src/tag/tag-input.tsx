import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TagClasses, TagInputProps } from './tag.type';
import Input from '../input/simple-input';

const TagInput = (props: TagInputProps) => {
  const { value, onBlur, onChange, onEnterPress, onFocus, onKeyUp, jssStyle } = props;

  const tagStyle = jssStyle?.tag?.() || ({} as TagClasses);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (v?: string) => {
    if (onChange) onChange(v);
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement> & React.FocusEvent<HTMLInputElement>,
  ) => {
    if (e.keyCode === 13) {
      if (onEnterPress) onEnterPress(e.target.value, e);
      else if (onBlur) onBlur(e.target.value, e);
    }
    if (onKeyUp) onKeyUp(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e.target.value, e);
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const controlProps = {
    value,
  };

  if (!('value' in props)) {
    delete controlProps.value;
  }

  return (
    <Input
      {...controlProps}
      inputRef={inputRef}
      className={classNames(tagStyle.input)}
      jssStyle={jssStyle}
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={onFocus}
    ></Input>
  );
};

export default TagInput;
