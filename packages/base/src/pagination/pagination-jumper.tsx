import classNames from 'classnames';
import { useState, useEffect } from 'react';
import Input from '../input';
import { PaginationClasses } from './pagination.type';
import { PaginationJumperProps } from './pagination-jumper.type';

const PaginationJumper = (props: PaginationJumperProps) => {
  const { jssStyle, simple, size, total, pageSize, disabled, current, text, onChange } = props;
  const paginationStyle = jssStyle?.pagination || ({} as PaginationClasses);
  const rootClasses = classNames(paginationStyle.section, paginationStyle.jumper);

  let txt: string[] | React.ReactNode[] = text.jumper ? text.jumper.split('{input}') : [];
  const [value, setValue] = useState(String(current));

  const getMax = () => {
    return Math.ceil(total / pageSize) || 1;
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
    }
  };

  const handleChange = (v?: string) => {
    setValue(v || '');
  };

  const handleBlur = () => {
    setValue(String(current));
  };

  const renderInput = () => {
    return (
      <Input
        jssStyle={jssStyle}
        className={paginationStyle.section}
        width={56}
        value={value}
        digits={0}
        type='number'
        size={size}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      ></Input>
    );
  };

  const renderPrefixText = () => {
    return txt[0] ? <span className={paginationStyle.section}>{txt[0]}</span> : undefined;
  };

  const renderSuffixText = () => {
    return txt[1] ? <span className={paginationStyle.section}>{txt[1]}</span> : undefined;
  };

  useEffect(() => {
    setValue(String(current));
  }, [current]);

  if (simple) {
    return (
      <div className={rootClasses}>
        {renderInput()}
        <span className={paginationStyle.section}>/</span>
        <span className={paginationStyle.section}>{total}</span>
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
