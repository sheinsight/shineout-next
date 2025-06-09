/**
 * cn -
 *    -- 演示更复杂的自定义渲染
 * en -
 *    -- Show more complex custom rendering
 */
import React, { useEffect, useMemo, useRef, Ref } from 'react';
import { Select, Input, Empty, icons } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    select: {
      '& .soui-select-option-inner:has(.soui-select-empty)': {
        overflow: 'visible'
      },
    },
  },
  { name: 'select-example-17' },
);

const svgs = [
  <svg key='0' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={14} height={14}>
    <path
      d='M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM4 7c-.6 0-1 .4-1 1s.4 1 1 1h8c.6 0 1-.4 1-1s-.4-1-1-1H4z'
      fill='#ff5630'
    />
  </svg>,
  <svg key='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={14} height={14}>
    <linearGradient
      id='a'
      gradientUnits='userSpaceOnUse'
      x1='-46.25'
      y1='65.1105'
      x2='-46.25'
      y2='64.1105'
      gradientTransform='matrix(12 0 0 -13.1121 563 854.7415)'
    >
      <stop offset='0' stopColor='#ff5630' />
      <stop offset='1' stopColor='#ff8f73' />
    </linearGradient>
    <path
      d='M2.5 4l5-2.9c.3-.2.7-.2 1 0l5 2.9c.3.2.5.5.5.9v8.2c0 .6-.4 1-1 1-.2 0-.4 0-.5-.1L8 11.4 3.5 14c-.5.3-1.1.1-1.4-.4-.1-.1-.1-.3-.1-.5V4.9c0-.4.2-.7.5-.9z'
      fill='url(#a)'
    />
  </svg>,
  <svg key='2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={14} height={14}>
    <path
      d='M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z'
      fill='#ff5630'
    />
    <path
      d='M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z'
      fill='#ff7452'
    />
  </svg>,
  <svg key='3' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width={14} height={14}>
    <path
      d='M8.045319 12.806152l4.5-2.7c.5-.3 1.1-.1 1.3.4s.2 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7z'
      fill='#0065ff'
    />
    <path
      d='M12.545319 5.806152c.5-.3 1.1-.1 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z'
      fill='#2684ff'
    />
    <path
      d='M12.545319 1.506152c.5-.3 1.1-.2 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z'
      fill='#4c9aff'
    />
  </svg>,
];

interface DataItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const data = [
  {
    label: 'P0-紧急',
    value: '0',
    icon: svgs[0],
  },
  {
    label: 'P1-高',
    value: '1',
    icon: svgs[1],
  },
  {
    label: 'P2-中',
    value: '2',
    icon: svgs[2],
  },
  {
    label: 'P3-低',
    value: '3',
    icon: svgs[3],
  },
];

const FilterInput = React.forwardRef(
  (
    {
      value,
      onChange,
      style,
    }: {
      value?: string;
      onChange: (value?: string) => void;
      style?: React.CSSProperties;
    },
    ref,
  ) => {
    return (
      <div style={{ ...style, border: 'none', borderBottom: '1px solid #E8EBF0' }}>
        <Input
          forwardRef={ref as Ref<HTMLInputElement>}
          type='search'
          placeholder='搜索'
          value={value}
          onChange={onChange}
          style={{ border: 'none', boxShadow: 'none' }}
          onKeyDown={(e) => e.stopPropagation()}
          prefix={
            <div
              style={{
                display: 'flex',
                width: 14,
                marginRight: 8,
                color: 'var(--soui-input-icon-color,var(--soui-neutral-text-4,#666C7C))',
              }}
            >
              {icons.Search}
            </div>
          }
        />
      </div>
    );
  },
);

export default () => {
  const [value, setValue] = React.useState<string[]>(['0', '1']);
  const [filterText, setFilterText] = React.useState<string | undefined>('');

  const classes = useStyles()

  const displayData = useMemo(() => {
    if (!filterText) return data;
    return data.filter((d) => d.label.includes(filterText));
  }, [filterText]);

  const renderItem = (d: DataItem) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {d.icon}
        <span style={{ marginLeft: 4 }}>{d.label}</span>
      </div>
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [displayData.length]);

  const renderOptionList = (list: React.ReactNode) => {
    return (
      <div style={{ height: 173, overflow: 'au' }}>
        <FilterInput value={filterText} onChange={setFilterText} ref={inputRef} />
        {list}
      </div>
    );
  };

  return (
    <div>
      <Select
        keygen='value'
        format={'value'}
        value={value}
        onChange={setValue}
        width={300}
        renderItem={renderItem}
        className={classes.select}
        emptyText={
          <div>
            <FilterInput
              value={filterText}
              onChange={setFilterText}
              style={{ margin: '-6px 0 0 -12px', width: 'calc(100% + 24px)' }}
              ref={inputRef}
            />
            <Empty style={{ margin: '24px auto 12px' }} />
          </div>
        }
        data={displayData}
        placeholder='Please Select'
        clearable
        compressed
        multiple
        renderOptionList={renderOptionList}
        onCollapse={(v) => {
          setTimeout(() => {
            if (v && inputRef.current) {
              inputRef.current.focus();
            }
          }, 20);
        }}
      />
    </div>
  );
};
