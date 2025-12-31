import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Input from '../input';
import { PaginationJumperProps } from './pagination-jumper.type';

const PaginationJumper = (props: PaginationJumperProps) => {
  const { jssStyle, simple, size, total, pageSize, disabled, text, current, onChange } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = clsx(paginationStyle?.section, paginationStyle?.jumper);

  let txt: string[] | React.ReactNode[] = text.jumper ? text.jumper.split('{input}') : [];
  const [value, setValue] = useState(String(current));

  const getMax = () => {
    return Math.ceil(total / pageSize) || 1;
  };

  const cleatInternalState = () => {
    if(simple) return;
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let current = parseInt((e.target as HTMLInputElement).value, 10);
      if (!Number.isFinite(current)) return;
      if (current < 1) current = 1;
      const max = getMax();
      if (current > max) current = max;
      onChange(current);
      setValue(String(current));
      setTimeout(cleatInternalState, 20);
    }
  };

  const handleChange = (v?: string) => {
    setValue(v || '');
  };

  useEffect(() => {
    if(!simple) return;
    setValue(String(current));
  }, [current, simple]);

  const renderInput = () => {
    return (
      <Input
        jssStyle={jssStyle}
        className={clsx(paginationStyle?.section, paginationStyle?.jumperInput)}
        width={56}
        value={value}
        digits={0}
        type='number'
        size={size}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={cleatInternalState}
      ></Input>
    );
  };

  const renderPrefixText = () => {
    return txt[0] ? <span className={paginationStyle?.section}>{txt[0]}</span> : undefined;
  };

  const renderSuffixText = () => {
    return txt[1] ? <span className={paginationStyle?.section}>{txt[1]}</span> : undefined;
  };

  if (simple) {
    return (
      <div className={rootClasses}>
        {renderInput()}
        <span className={clsx(paginationStyle?.section, paginationStyle?.split)}>/</span>
        <span className={paginationStyle?.section}>{getMax()}</span>
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      {renderPrefixText()}
      {renderInput()}
      {renderSuffixText()}
    </div>
  );
};

export default PaginationJumper;
