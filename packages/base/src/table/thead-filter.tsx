import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { KeygenResult, TableColumnFilter, useFilter, util, TableFilterData } from '@sheinx/hooks';
import Icons from '../icons';
import Tree from '../tree';
import Input from '../input';
import Button from '../button';
import Popover from '../popover';
import Radio from '../radio';
import { TheadProps } from './thead.type';
import { TableClasses } from './table.type';
import Empty from '../empty';
import { getLocale, useConfig } from '../config';

interface FilterFooterProps extends Pick<TheadProps, 'jssStyle'> {
  tableClasses: TableClasses;
  resetable: boolean;
  onReset?: () => void;
  onConfirm?: () => void;
}

const FilterFooter = (props: FilterFooterProps) => {
  const { tableClasses } = props;
  const { locale } = useConfig();
  return (
    <footer className={tableClasses.filterFooter}>
      <Button
        htmlType='reset'
        jssStyle={props.jssStyle}
        size='small'
        onClick={props.onReset}
        disabled={!props.resetable}
        mode='outline'
      >
        {getLocale(locale, 'reset')}
      </Button>
      <Button jssStyle={props.jssStyle} size='small' type='primary' onClick={props.onConfirm}>
        {getLocale(locale, 'ok')}
      </Button>
    </footer>
  );
};

interface TheadCommonProps extends Pick<TheadProps, 'jssStyle' | 'filterInfo' | 'onFilterChange'> {
  tableClasses: TableClasses;
  filter: TableColumnFilter<any>;
  columnKey: KeygenResult;
}

export const FilterSelect = (props: TheadCommonProps) => {
  const { locale } = useConfig();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [tempValue, setTempValue] = useState();
  const { tableClasses, filter } = props;

  const { config } = filter;

  const currentFilter = props.filterInfo?.get(props.columnKey);

  const treeOptions = config?.data || [];

  const treeKeygen = (d: TableFilterData) => d.value;

  const treeProps = config?.multiple
    ? {
        value: tempValue,
        onChange: (v: any) => {
          setTempValue(v);
        },
        renderItem: config?.renderItem || 'label',
      }
    : {
        active: tempValue,
        setActive: (v: any) => {
          setTempValue(v);
        },
        renderItem: (d: TableFilterData, _: boolean, active: boolean) => {
          const renderProp = util.isFunc(config?.renderItem)
            ? config?.renderItem
            : (d: TableFilterData) => d.label;
          return (
            <div className={tableClasses.filterRadio}>
              <Radio checked={active} jssStyle={props.jssStyle} />
              {renderProp(d)}
            </div>
          );
        },
      };
  const { filterData, rawData, onFilter, inputText, setInputText } = useFilter({
    treeData: treeOptions,
    keygen: treeKeygen as any,
    childrenKey: 'children',
    onAdvancedFilter: false,
    onFilter: (text) => (item) => item.label.includes(text),
  });

  const onReset = () => {
    setTempValue(undefined);
    setInputText('');
    props.onFilterChange(props.columnKey, undefined);
    setPopoverVisible(false);
  };

  const onConfirm = () => {
    props.onFilterChange(props.columnKey, tempValue);
    setPopoverVisible(false);
  };

  const onVisibleChange = (visible: boolean) => {
    // 关闭popover时就提交筛选条件，包括click away触发的
    if (!visible) {
      props.onFilterChange(props.columnKey, tempValue);
    }
    setPopoverVisible(visible);
  };

  const displayData = inputText ? filterData || rawData : rawData;

  return (
    <Button
      jssStyle={props.jssStyle}
      shape='circle'
      size='small'
      className={classnames(
        tableClasses.filterIconContainer,
        currentFilter?.value && tableClasses.filterActive,
        popoverVisible && tableClasses.filterOpened
      )}
      style={{ border: 'none' }}
    >
      <span className={tableClasses.filterIcon}>{filter.icon || Icons.table.Filter}</span>
      <Popover
        jssStyle={props.jssStyle}
        trigger='click'
        showArrow={false}
        visible={popoverVisible}
        onVisibleChange={onVisibleChange}
      >
        <div className={classnames(tableClasses.filterContainer)}>
          {config?.search && (
            <header className={tableClasses.filterHeader}>
              <Input
                showClear
                value={inputText}
                onChange={(v) => {
                  if (onFilter) onFilter(v || '');
                  setInputText(v as string);
                }}
                jssStyle={props.jssStyle}
                placeholder={getLocale(locale, 'searchPlaceholder')}
                className={tableClasses.filterInput}
                prefix={<span className={tableClasses.filterInputIcon}>{Icons.table.Search}</span>}
              />
            </header>
          )}
          <section className={tableClasses.filterBody}>
            {displayData && displayData.length > 0 ? (
              <Tree
                keygen={(d) => d.value}
                jssStyle={props.jssStyle as any}
                data={displayData}
                actionOnClick={['check']}
                {...treeProps}
              />
            ) : (
              <Empty jssStyle={props.jssStyle} icon={null} style={{ padding: '24px 0' }} />
            )}
          </section>
          <FilterFooter
            jssStyle={props.jssStyle}
            tableClasses={tableClasses}
            onReset={onReset}
            onConfirm={onConfirm}
            resetable={!!tempValue}
          />
        </div>
      </Popover>
    </Button>
  );
};

export const FilterSearch = (props: TheadCommonProps) => {
  const { locale } = useConfig();
  const { tableClasses, filter } = props;
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [tempValue, setTempValue] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onReset = () => {
    setTempValue(undefined);
    props.onFilterChange(props.columnKey, undefined);
    setPopoverVisible(false);
  };

  const onConfirm = () => {
    props.onFilterChange(props.columnKey, tempValue);
    setPopoverVisible(false);
  };

  const onVisibleChange = (visible: boolean) => {
    // 关闭popover时就提交筛选条件，包括click away触发的
    if (!visible) {
      props.onFilterChange(props.columnKey, tempValue);
    }

    // 打开时自动focus input
    if (visible) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }

    setPopoverVisible(visible);
  };

  const currentFilter = props.filterInfo?.get(props.columnKey);

  useEffect(() => {
    if (currentFilter?.value !== undefined) {
      setTempValue(currentFilter?.value);
    }
  }, [currentFilter?.value]);

  return (
    <Button
      jssStyle={props.jssStyle}
      shape='circle'
      size='small'
      className={classnames(
        tableClasses.filterIconContainer,
        currentFilter?.value && tableClasses.filterActive,
        popoverVisible && tableClasses.filterOpened
      )}
      style={{ border: 'none' }}
    >
      <span className={tableClasses.filterIcon}>{filter.icon || Icons.table.Search}</span>

      <Popover
        jssStyle={props.jssStyle}
        trigger='click'
        showArrow={false}
        visible={popoverVisible}
        onVisibleChange={onVisibleChange}
      >
        <div className={classnames(tableClasses.filterContainer)}>
          <header className={tableClasses.filterHeader}>
            <Input
              jssStyle={props.jssStyle}
              placeholder={getLocale(locale, 'searchPlaceholder')}
              className={tableClasses.filterInput}
              prefix={<span className={tableClasses.filterInputIcon}>{Icons.table.Search}</span>}
              value={tempValue}
              onChange={setTempValue}
              onEnterPress={onConfirm}
              forwardRef={inputRef}
              showClear
            />
          </header>
          <FilterFooter
            jssStyle={props.jssStyle}
            tableClasses={tableClasses}
            onReset={onReset}
            onConfirm={onConfirm}
            resetable={!!tempValue}
          />
        </div>
      </Popover>
    </Button>
  );
};
