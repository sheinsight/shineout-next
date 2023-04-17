import type { InputProps } from '@soui/able';
import { useInput } from '@soui/able';
import classname from 'classnames';
import type { FC } from 'react';
import { memo, useRef } from 'react';
import Group from './group';
import ClearIcon from './icon/clear';
import useStyle from './style';
import usePassword from './use-password';
export { getInputStyle } from './style';

const Input: FC<InputProps> = memo((props) => {
  const {
    placeholder,
    className,
    style,
    onChange,
    onKeydown,
    onClear,
    onFocus,
    onBlur,
    value = '',
    type,
    left,
    right,
    clearable,
    customStyle,
    ...otherProps
  } = useInput(props).props;
  const inputEl = useRef<HTMLInputElement | null>(null);

  const [hideValue, pwdEl] = usePassword(type, customStyle);
  const styles = (customStyle || useStyle)();
  const showClear = clearable && value.length > 0;

  const handleClear = () => {
    onClear?.();
    inputEl.current?.focus();
  };

  return (
    <div className={classname(styles.wrapper, className)} style={style}>
      {left && <span className={styles.left}>{left}</span>}
      <input
        {...otherProps}
        ref={inputEl}
        type={hideValue ? 'password' : 'text'}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeydown}
        placeholder={placeholder}
      />
      {pwdEl}
      {showClear && <ClearIcon onClick={handleClear} />}
      {right && <span className={styles.right}>{right}</span>}
    </div>
  );
});
type InputGroupType = typeof Input & {
  Group: typeof Group;
};
(Input as InputGroupType).Group = Group;

export default Input as InputGroupType;
