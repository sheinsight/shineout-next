import React, { useRef, useEffect, useState } from 'react';
import {
  util,
  usePersistFn,
  useTiled,
  usePopup,
  useTreeSelect,
  useFilter,
  UnMatchedData,
  KeygenResult,
  useTree,
} from '@sheinx/hooks';
import classNames from 'classnames';
import { TreeSelectProps, ResultItem } from './tree-select.type';
import { TreeSelectClasses } from './tree-select.type';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Result from '../select/result';
import Spin from '../spin';
import Icons from '../icons';
import Tree from '../tree';
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';
import { getLocale, useConfig } from '../config';

export type TreeSelectValueType = KeygenResult | KeygenResult[];
const preventDefault = (e: React.MouseEvent) => {
  e.preventDefault();
};
const TreeSelect = <DataItem, Value extends TreeSelectValueType>(
  props0: TreeSelectProps<DataItem, Value>,
) => {
  const props = useWithFormConfig(props0);
  const { locale, direction } = useConfig();
  const isRtl = direction === 'rtl';
  const dfp = isRtl ? 'bottom-right' : 'bottom-left';

  const {
    jssStyle,
    className,
    size,
    value: valueProp,
    defaultValue,
    data = [],
    multiple,
    mode = 1,
    line = false,
    innerTitle,
    clearable = true,
    border = true,
    underline,
    showArrow = true,
    focusSelected = true,
    position: positionProp = dfp,
    open: openProp,
    onCollapse: onCollapseProp,
    disabled,
    style,
    width,
    height = 250,
    childrenKey,
    keygen,
    loader,
    renderResult: renderResultProp,
    renderItem: renderItemProp = (d) => d as React.ReactNode,
    trim = false,
    placeholder,
    renderUnmatched,
    resultClassName,
    compressed,
    unmatch = true,
    getComponentRef,
    onChange: onChangeProp,
    compressedBound,
    compressedClassName,
    expanded: expandedProp,
    defaultExpanded,
    defaultExpandAll,
    parentClickExpand,
    showHitDescendants,
    onBlur,
    onFocus,
    onAdvancedFilter,
    onFilter: onFilterProp,
    onChangeAddition,
    onEnterExpand,
    onExpand,
    filterSameChange,
  } = props;
  const styles = jssStyle?.treeSelect?.() as TreeSelectClasses;
  const rootStyle: React.CSSProperties = Object.assign({ width }, style);
  const showInput = util.isFunc(props.onAdvancedFilter || onFilterProp);

  const blurEvent = useRef<(() => void) | null>();
  const inputRef = useRef<HTMLInputElement>();
  const { current: context } = useRef({
    cachedMap: new Map(),
  });
  const [focused, setFocused] = useState(false);

  const { value, onChange } = useTreeSelect({
    value: valueProp,
    onChange: onChangeProp,
    defaultValue,
    control: 'value' in props,
    filterSameChange: filterSameChange,
    multiple,
  });

  const checkEmpty = () => {
    let isEmpty;
    if (multiple) {
      isEmpty = !value || (Array.isArray(value) && value.length === 0);
    } else {
      isEmpty = util.isEmpty(value);
    }

    return isEmpty;
  };

  const isEmpty = checkEmpty();

  const {
    filterText,
    inputText,
    filterData,
    expanded,
    rawData,
    onFilter,
    onClearCreatedData,
    setInputText,
  } = useFilter({
    treeData: data,
    keygen: keygen as any,
    childrenKey,
    expanded: expandedProp,
    showHitDescendants,
    onAdvancedFilter: 'onAdvancedFilter' in props,
    onFilter: onAdvancedFilter || onFilterProp,
  });

  const controlExpanded = 'expanded' in props || expanded?.length ? expanded : undefined;
  const { datum, onExpand: onExpandTree } = useTree({
    mode,
    value,
    data,
    unmatch,
    disabled,
    childrenKey: childrenKey,
    keygen,
    onExpand,
    expanded: controlExpanded,
    defaultExpanded: defaultExpanded,
    defaultExpandAll: defaultExpandAll,
    isControlled: controlExpanded !== undefined,
  });

  const renderMoreIcon = () => {
    return Icons.treeSelect.More;
  };

  const {
    data: tiledData,
    onFilter: onTiledFilter,
    expandIcons: tiledExpandIcons,
  } = useTiled<DataItem>({
    data: filterData!,
    filterText,
    onAdvancedFilter,
    keygen,
    originIcon: Icons.treeSelect.More,
    moreIcon: renderMoreIcon,
    childrenKey,
    expanded,
    rawData: rawData!,
    onFilter,
  });

  const onCollapse = usePersistFn((collapse: boolean) => {
    onCollapseProp?.(collapse);

    if (blurEvent.current && !collapse) {
      blurEvent.current();
      blurEvent.current = null;
    }
  });

  const {
    open,
    position,
    targetRef,
    popupRef,
    openPop,
    closePop,
    Provider: PopupProvider,
    providerValue: popupProviderValue,
  } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const tipNode = useTip({
    popover: props.popover,
    popoverProps: props.popoverProps,
    error: props.error,
    tip: props.tip,
    focused,
    rootRef: targetRef,
    jssStyle: props.jssStyle,
  });

  const rootClass = classNames(
    className,
    isEmpty && styles.wrapperEmpty,
    styles?.wrapper,
    open && styles?.wrapperOpen,
    disabled === true && styles?.wrapperDisabled,
    !!open && styles?.wrapperFocus,
    disabled !== true && focused && styles?.wrapperFocus,
    innerTitle && styles?.wrapperInnerTitle,
    size === 'small' && styles?.wrapperSmall,
    size === 'large' && styles?.wrapperLarge,
    (!!props.error || props.status === 'error') && styles?.wrapperError,
    clearable && styles?.clearable,
    !border && styles?.wrapperNoBorder,
    !!underline && styles?.wrapperUnderline,
    {
      [styles?.multiple]: multiple,
    },
  );

  const getRenderItem = (
    data: DataItem,
    expanded?: boolean,
    active?: boolean,
    id?: KeygenResult,
  ) => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, expanded!, active!, id!)
      : (data[renderItemProp] as React.ReactNode);
  };

  const renderItem = getRenderItem;

  const getRenderResult = (data: DataItem) => {
    if (!renderResultProp) return renderItem(data);
    return typeof renderResultProp === 'function' ? renderResultProp(data) : data[renderResultProp];
  };

  // 点击 Select 结果框的处理方法
  const handleResultClick = usePersistFn((e) => {
    if (disabled === true) return;
    if (!focused) {
      inputRef.current?.focus();
    }
    if (open) {
      if (e.target.tagName === 'INPUT') {
        return;
      }
      closePop();
    } else {
      openPop();
    }
  });

  const focusAndOpen = () => {
    if (!focused) {
      inputRef.current?.focus();
    } else {
      openPop();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 回车或下箭头可打开下拉列表
    if (e.keyCode === 13 || e.code === 'Enter') {
      if (!open) {
        if (typeof onEnterExpand === 'function') {
          const canOpen = onEnterExpand(e);
          if (canOpen === false) return;
        }
        focusAndOpen();
        return;
      }
    }

    // tab 可关闭下拉列表
    if (e.keyCode === 9 || e.code === 'Tab') {
      onBlur?.(e);
      if (open) closePop();
      return;
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!datum) return;
    datum.setValue([]);
    onChange(multiple ? [] : ['']);

    if (onChangeAddition) {
      onChangeAddition({
        data: multiple ? [] : null,
      });
    }
    if (open) closePop();
  };

  const renderClearable = () => {
    if (!multiple !== undefined && !showArrow) return null;
    const defaultIcon = multiple ? Icons.treeSelect.More : Icons.treeSelect.DropdownArrow;

    const arrow = (
      <span
        className={classNames(styles.arrowIcon, open && !compressed && styles.arrowIconOpen)}
        onClick={handleResultClick}
      >
        {defaultIcon}
      </span>
    );

    const close = (
      <span className={styles.clearIcon} onClick={handleClear}>
        {isEmpty ? arrow : Icons.treeSelect.Close}
      </span>
    );

    return (
      <>
        {close}
        {!open && arrow}
      </>
    );
  };

  const renderIcon = () => {
    if (clearable && !isEmpty && disabled !== true) {
      return renderClearable();
    }
    if (!multiple && !showArrow) return null;
    const defaultIcon = multiple ? Icons.treeSelect.More : Icons.treeSelect.DropdownArrow;
    return (
      <span
        className={classNames(styles.arrowIcon, open && !compressed && styles.arrowIconOpen)}
        onClick={handleResultClick}
      >
        {defaultIcon}
      </span>
    );
  };

  const getDataById = usePersistFn((id: KeygenResult) => {
    if (!props.noCache) {
      if (context.cachedMap.has(id)) {
        return context.cachedMap.get(id);
      }
    }
    if (!datum) return undefined as DataItem;
    const origin = datum?.getDataById(id);
    if (!props.noCache && !datum?.isUnMatched(origin)) {
      context.cachedMap.set(id, origin);
    }

    return origin;
  });

  const getDataByValues = (values?: Value): (DataItem | UnMatchedData)[] => {
    if (!datum || !values) return [];
    return datum.getDataByValues(values) as DataItem[];
  };

  const getDataByValuesRef = (values: Value) => {
    type Result = Value extends any[] ? ResultItem<DataItem>[] : ResultItem<DataItem>;
    if (util.isArray(values)) {
      return values.map((id) => datum?.getDataById(id)) as Result;
    }

    return datum?.getDataById(values) as Result;
  };

  const getValue = () => {
    if (!datum) return;
    const nextValue = datum.getValue();
    if (multiple) return nextValue;
    if (nextValue.length === 0) return [];
    return [nextValue[0]];
  };

  const getContentClass = (data: DataItem) => {
    if (!datum) return '';

    const key = datum.getKey(data);
    const isDisabled = datum?.isDisabled(key);
    const isCheck = datum?.getChecked(key);

    if (isDisabled) {
      return classNames(styles.optionDisabled);
    }

    if (multiple) {
      return isCheck ? classNames(styles.optionActive) : '';
    }

    if (!util.isArray(value)) {
      const currentData = getDataByValues(value);
      return currentData === data ? classNames(styles.optionActive) : '';
    }

    return '';
  };

  const checkUnMatched = (item: unknown) => {
    return util.isUnMatchedData(item);
  };

  const handleFocus = usePersistFn((e: React.FocusEvent) => {
    setFocused(true);
    onFocus?.(e);
  });

  const handleBlur = usePersistFn((e: React.FocusEvent) => {
    setFocused(false);
    onBlur?.(e);
  });

  const handleFilter = (text: string, from?: string) => {
    if (from !== 'blur') {
      focusAndOpen();
    }
    onTiledFilter?.(trim ? text.trim() : text);
  };

  const handleChange = (item: DataItem | UnMatchedData, id: KeygenResult) => {
    if (disabled === true || datum?.isDisabled(id)) return;
    const currentData = datum.getDataById(id) as DataItem;
    if (!multiple) {
      datum.setValue([]);
      datum.set(datum.getKey(item as DataItem), 1);
    }

    const nextValue = getValue();

    if (onChange) {
      onChange(nextValue!, currentData, id ? (datum.getPath(id) || {}).path : undefined);
    }

    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: getDataByValues(nextValue as Value),
        checked: multiple ? datum.get(id) : undefined,
        current: currentData,
      });
    }
  };

  const handleTreeClick = (item: DataItem | UnMatchedData, id: KeygenResult) => {
    handleChange(item, id);
    closePop();
  };

  const handleTreeChange = (_value: any, id: KeygenResult) => {
    const item = datum.getDataById(id) as DataItem;
    handleChange(item, id);
  };

  const handleRemove = (item: DataItem | UnMatchedData, key?: KeygenResult) => {
    if (!datum) return;

    const dataKey = key ?? (util.isUnMatchedData(item) ? item.value : datum.getKey(item));

    const isDisabled = datum.isDisabled(dataKey);

    if (isDisabled) return;

    datum.set(dataKey, 0);
    handleChange(item, dataKey);
  };

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || !!(value && value.length),
    size,
    jssStyle,
    innerTitle,
  });

  const getResultByValue = usePersistFn((arr: Value) => {
    const result = (Array.isArray(arr) ? arr : [arr])
      .map((id) => {
        return getDataById(id);
      })
      .filter((item) => item !== undefined);
    return result;
  });

  const getResultValue = () => {
    if (!multiple && Array.isArray(value)) {
      return value[0];
    }
    return value;
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result
          trim={trim}
          jssStyle={jssStyle}
          size={size}
          value={getResultValue() as any}
          data={data}
          focus={open}
          keygen={keygen as any}
          disabled={disabled}
          compressed={compressed}
          compressedBound={compressedBound}
          compressedClassName={compressedClassName}
          multiple={multiple}
          placeholder={placeholder}
          renderItem={renderItem as any}
          childrenKey={childrenKey}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          allowOnFilter={showInput}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          onFilter={handleFilter}
          onRef={inputRef}
          checkUnMatched={checkUnMatched}
          onClearCreatedData={onClearCreatedData}
          getDataByValues={getResultByValue}
          onRemove={handleRemove}
          classes={styles}
          setInputText={setInputText}
        ></Result>
      </div>
    );

    return (
      <PopupProvider value={popupProviderValue}>
        <div
          className={classNames(
            styles?.resultWrapper,
            styles?.wrapperPaddingBox,
            styles?.wrapperInnerTitleTop,
            styles?.wrapperInnerTitleBottom,
          )}
          onClick={handleResultClick}
        >
          {renderInnerTitle(result)}
          <div className={styles.iconWrapper}>{renderIcon()}</div>
        </div>
      </PopupProvider>
    );
  };

  const renderActive = (item: DataItem) => {
    const items = renderItem(item);

    return <span>{items}</span>;
  };
  const renderLoading = () => {
    if (props.loading !== true) {
      return props.loading;
    }

    return (
      <div className={styles?.loading}>
        <Spin jssStyle={jssStyle} size={14}></Spin>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div className={styles?.option}>
        <div className={styles?.optionInner}>
          <span className={styles?.empty}>{props.emptyText || getLocale(locale, 'noData')}</span>
        </div>
      </div>
    );
  };
  const renderList = () => {
    if (props.loading) return renderLoading();

    const isEmpty = !filterData?.length;
    if (isEmpty) return renderEmpty();

    const treeProps: any = {};

    if (multiple) {
      treeProps.onChange = handleTreeChange;
    } else {
      treeProps.onClick = handleTreeClick;
      treeProps.renderItem = renderActive;
      treeProps.active = value;
    }
    if ('expanded' in props) {
      treeProps.expanded = expanded;
    }

    return (
      <div className={classNames(styles.tree)} style={{ maxHeight: height }}>
        <Tree
          jssStyle={jssStyle}
          renderItem={renderItem}
          {...treeProps}
          childrenKey={props.childrenKey}
          line={line}
          mode={mode}
          data={tiledData}
          keygen={keygen}
          unmatch={unmatch}
          value={value}
          loader={loader}
          onExpand={onExpandTree}
          expanded={controlExpanded}
          defaultExpandAll={defaultExpandAll}
          expandIcons={tiledExpandIcons}
          disabled={disabled}
          parentClickExpand={parentClickExpand}
          contentClass={getContentClass}
          datum={datum}
        ></Tree>
      </div>
    );
  };

  useEffect(() => {
    if (getComponentRef && datum) {
      if (util.isFunc(getComponentRef)) {
        getComponentRef({ getDataByValues: getDataByValuesRef });
      } else {
        getComponentRef.current = { getDataByValues: getDataByValuesRef };
      }
    }
  }, []);

  return (
    <div
      ref={targetRef}
      tabIndex={disabled === true || showInput ? undefined : 0}
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      className={rootClass}
      style={rootStyle}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => {
        if (focused && e.target !== inputRef.current) {
          e.preventDefault();
        }
      }}
    >
      {tipNode}
      {renderResult()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth='min'
        lazy={false}
        absolute={props.absolute}
        zIndex={props.zIndex}
        position={position}
        popupGap={4}
        popupElRef={popupRef}
        parentElRef={targetRef}
      >
        <AnimationList
          onRef={popupRef}
          onMouseDown={preventDefault}
          show={open}
          className={classNames(styles?.pickerWrapper)}
          display={'block'}
          type='scale-y'
          duration={'fast'}
        >
          {renderList()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default TreeSelect;
