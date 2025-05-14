import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import classNames from 'classnames';
import {
  util,
  usePersistFn,
  usePopup,
  useCascader,
  useFilter,
  KeygenResult,
  UnMatchedData,
  ObjectKey,
  usePrevious,
} from '@sheinx/hooks';
import { Spin } from '../spin';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import { CascaderClasses } from '../cascader/cascader.type';
import { CascaderProps } from './cascader.type';
import CascaderList from './list';
import CascaderFilterList from './filter-list';
import Result from '../select/result';
import Icons from '../icons';
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';
import { FormFieldContext } from '../form/form-field-context';

import { useConfig, getLocale } from '../config';

const { devUseWarning, isOptionalDisabled } = util;

const Cascader = <DataItem, Value extends KeygenResult[]>(
  props0: CascaderProps<DataItem, Value>,
) => {
  const props = useWithFormConfig(props0);
  const { fieldId } = useContext(FormFieldContext);
  const defaultHeight = 250;
  const {
    jssStyle,
    style,
    adjust = true,
    width,
    height = defaultHeight,
    className,
    hideTag = false,
    defaultValue,
    wideMatch,
    unmatch = true,
    value: valueProp,
    data = [],
    keygen,
    childrenKey = 'children' as ObjectKey<DataItem>,
    border = true,
    open: openProp,
    mode,
    innerTitle,
    multiple,
    disabled: disabledProp,
    clearable,
    underline,
    loading,
    singleRemove = false,
    loader,
    final,
    expandTrigger,
    finalDismiss,
    renderItem: renderItemProp = (d) => d as React.ReactNode,
    renderResult: renderResultProp,
    placeholder,
    focusSelected = true,
    renderCompressed,
    compressedClassName,
    resultClassName,
    renderUnmatched,
    renderOptionList,
    showArrow = true,
    compressed,
    compressedBound,
    position: positionProp = 'bottom-left',
    absolute,
    zIndex,
    emptyText,
    getComponentRef,
    onFocus,
    onBlur,
    onChange: onChangeProp,
    onFilter: onFilterProp,
    onCollapse: onCollapseProp,
    size,
    virtual,
    filterSameChange,
  } = props;

  const showInput = util.isFunc(onFilterProp);
  const isRealtime = isOptionalDisabled<DataItem>(props.disabled)
    ? props.disabled.isRealtime
    : false;

  const disabled = util.isOptionalDisabled<DataItem>(disabledProp)
    ? disabledProp.disabled
    : disabledProp;

  const styles = jssStyle?.cascader?.() as CascaderClasses;
  const rootStyle: React.CSSProperties = Object.assign({ width }, style);
  const { locale } = useConfig();

  const [focused, setFocused] = useState(false);
  const [path, setPath] = useState<KeygenResult[]>([]);
  const isPreventBlur = useRef(false);
  const blurEvent = useRef<(() => void) | null>();
  const inputRef = useRef<HTMLInputElement>();
  const isFirstRender = useRef(true);
  const prevData = usePrevious(data);

  const {
    filterText,
    inputText,
    filterData,
    firstMatchNode,
    setInputText,
    setFilterText,
    filterFunc,
    onFilter,
  } = useFilter({
    treeData: data,
    keygen,
    childrenKey,
    firstMatch: true,
    onFilter: onFilterProp,
    showHitDescendants: true,
    onAdvancedFilter: false,
  });

  const isDataEmpty = !filterData || filterData.length === 0;
  const isMultiple = multiple === true || mode !== undefined;

  const updateKey = useMemo(() => {
    return path.join('-');
  }, [path]);

  const { datum, value, onChange } = useCascader({
    data,
    control: 'value' in props,
    keygen,
    unmatch,
    disabled: disabledProp,
    mode,
    defaultValue,
    childrenKey,
    value: valueProp,
    onChange: onChangeProp,
    filterSameChange,
  });

  const onCollapse = usePersistFn((collapse: boolean) => {
    onCollapseProp?.(collapse);

    if (isPreventBlur.current) {
      isPreventBlur.current = false;
      return;
    }

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
    position: positionProp as any,
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

  const checkEmpty = () => {
    let isEmpty;
    if (mode !== undefined) {
      isEmpty = !value || (Array.isArray(value) && value.length === 0);
    } else {
      isEmpty = util.isEmpty(value);
    }

    return isEmpty;
  };

  const isEmpty = checkEmpty();

  const rootClass = classNames(
    className,
    styles?.rootClass,
    styles?.wrapper,
    isEmpty && styles.wrapperEmpty,
    disabled === true && styles?.wrapperDisabled,
    focused && disabled !== true && styles?.wrapperFocus,
    innerTitle && styles?.wrapperInnerTitle,
    virtual && styles.virtual,
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

  const getRenderItem = (data: DataItem, active?: boolean, id?: Value[0]) => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, active, id)
      : (data[renderItemProp] as React.ReactNode);
  };

  const getFinal = () => {
    return expandTrigger === 'hover-only' || !!final;
  };

  const shouldFinal = getFinal();

  const renderItem = getRenderItem;

  const getRenderResult = (
    data: DataItem,
    index?: number,
    nodes?: (DataItem | UnMatchedData)[],
  ) => {
    if (!renderResultProp) return renderItem(data);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, nodes as DataItem[])
      : (data[renderResultProp] as React.ReactNode);
  };

  // 点击结果框的处理方法
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

  const handleFilter = (text: string, from?: string) => {
    if (from !== 'blur') {
      focusAndOpen();
    }
    onFilter?.(text);
  };

  // path change
  const handlePathChange = (
    id: KeygenResult,
    item: DataItem | null,
    nextPath: Value,
    fromClick?: boolean,
  ) => {
    if (fromClick && item && childrenKey) {
      let leaf = !item[childrenKey] || (item[childrenKey] as DataItem[]).length === 0;
      if (loader && typeof loader === 'function' && item[childrenKey] === undefined) {
        leaf = false;
      }
      if (finalDismiss && leaf) closePop();
    }

    setPath([...nextPath, id]);
  };

  const updatePath = () => {
    if (!filterText || !firstMatchNode) {
      setPath([]);
      return;
    }
    const key = util.getKey(keygen, firstMatchNode);
    const current = datum.getPath(key) || { path: [] };
    setPath([...current.path, key]);
  };

  const updatePathByValue = () => {
    if (mode !== undefined) return;
    if (!value || !value.length) {
      setPath([]);
      return;
    }

    const lastValue = value[value.length - 1];
    const lastData = datum.getDataByValues(lastValue);

    if (lastData === null || util.isUnMatchedData(lastData)) {
      return;
    }

    try {
      let { path } = datum.getPath(lastValue) || {};
      path = path || [];
      handlePathChange(lastValue, null, path as Value);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 回车或下箭头可打开下拉列表
    if (e.keyCode === 13 || e.code === 'Enter') {
      if (!open) {
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

  const handleChange = (item: Value, selectId?: DataItem) => {
    onChange?.(item, selectId);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPath([]);

    if (mode !== undefined) {
      datum.setValue([]);
    }
    handleChange([] as unknown as Value);
    if (open) closePop();
  };

  const handleResultItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: DataItem,
  ) => {
    e.stopPropagation();
    if (!open) {
      openPop();
    }
    const id = datum.getKey(item);
    const { path } = datum.getPath(id) || {};
    if (!path) return;
    handlePathChange(id, null, path as Value);
  };

  const handleRemove = (item: DataItem | UnMatchedData, key?: KeygenResult) => {
    const dataKey = key ?? (util.isUnMatchedData(item) ? item.value : datum.getKey(item));
    const isDisabled = datum.isDisabled(dataKey);

    if (isDisabled) return;

    datum.set(dataKey, 0);
    onChange(datum.getValue() as Value, item as DataItem);
  };

  const getDataByValues = (values?: Value) => {
    if (!values) return [];
    return datum.getDataByValues(values);
  };

  const checkUnMatched = (item: any) => {
    return util.isUnMatchedData(item);
  };

  const handleFocus: React.FocusEventHandler<HTMLDivElement> = usePersistFn((e: any) => {
    setFocused(true);
    onFocus?.(e);
  });

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = usePersistFn((e: any) => {
    setFocused(false);
    onBlur?.(e);
  });

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || (value && util.isArray(value) ? value.length > 0 : !!value),
    size,
    jssStyle,
    innerTitle,
  });

  const renderClearable = () => {
    if (!mode !== undefined && !showArrow) return null;
    const defaultIcon = compressed || multiple ? Icons.cascader.More : Icons.cascader.DropdownArrow;
    const arrow = (
      <span
        className={classNames(
          compressed && styles.compressedIcon,
          styles.arrowIcon,
          open && !compressed && styles.arrowIconOpen,
        )}
        onClick={handleResultClick}
      >
        {defaultIcon}
      </span>
    );
    const close = (
      <span className={styles.clearIcon} onClick={handleClear}>
        {Icons.cascader.Close}
      </span>
    );

    return (
      <>
        {close}
        {!open && !isEmpty && !focused && arrow}
      </>
    );
  };

  const renderIcon = () => {
    if ((clearable && !isEmpty && open) || (clearable && !isEmpty && disabled !== true)) {
      return renderClearable();
    }
    if (!mode !== undefined && !showArrow) return null;
    const defaultIcon = compressed || multiple ? Icons.cascader.More : Icons.cascader.DropdownArrow;
    return (
      <span
        className={classNames(
          (compressed || multiple) && styles.compressedIcon,
          styles.arrowIcon,
          open && !compressed && styles.arrowIconOpen,
        )}
        onClick={handleResultClick}
      >
        {defaultIcon}
      </span>
    );
  };

  const renderResultContent = (contentProps: any) => {
    const { children } = contentProps;
    return (
      <div {...contentProps} className={classNames(contentProps.className, styles.resultItem)}>
        {children}
      </div>
    );
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result<DataItem, Value>
          jssStyle={jssStyle}
          size={size}
          value={value}
          closeable={singleRemove && multiple}
          classes={styles}
          data={data}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          compressed={compressed}
          renderCompressed={renderCompressed}
          compressedBound={compressedBound}
          compressedClassName={compressedClassName}
          multiple={true}
          placeholder={placeholder}
          renderItem={renderItem as any}
          childrenKey={childrenKey}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          renderResultContent={hideTag && !multiple ? renderResultContent : undefined}
          allowOnFilter={showInput}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          onFilter={handleFilter}
          onRef={inputRef}
          onRemove={handleRemove}
          onResultItemClick={handleResultItemClick}
          checkUnMatched={checkUnMatched}
          getDataByValues={getDataByValues as any}
          setInputText={setInputText}
          morePopoverContainer={targetRef}
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
  const renderList = () => {
    let tempData: any = filterData;
    let cascaderList: React.ReactNode[] = [
      <CascaderList
        jssStyle={jssStyle}
        datum={datum}
        renderItem={renderItem as any}
        keygen={keygen}
        loader={loader}
        onPathChange={handlePathChange}
        onChange={handleChange}
        multiple={isMultiple}
        expandTrigger={expandTrigger}
        childrenKey={childrenKey}
        shouldFinal={shouldFinal}
        key='root'
        height={height}
        data={tempData}
        id={path[0]}
        parentId=''
        virtual={virtual}
        path={[] as unknown as Value}
        mode={mode}
      />,
    ];
    const childs = path.map((p, i) => {
      tempData =
        tempData &&
        tempData instanceof Array &&
        tempData.find((d) => {
          const nid = datum.getKey(d, path[i - 1]);
          return nid === p;
        });
      if (tempData && tempData[childrenKey] && (tempData[childrenKey] as DataItem[]).length > 0) {
        tempData = tempData[childrenKey];
        return (
          <CascaderList<DataItem, Value>
            datum={datum}
            size={size}
            height={height}
            jssStyle={jssStyle}
            renderItem={renderItem as any}
            keygen={keygen}
            loader={loader}
            onPathChange={handlePathChange}
            onChange={handleChange}
            multiple={isMultiple}
            expandTrigger={expandTrigger}
            childrenKey={childrenKey}
            shouldFinal={shouldFinal}
            key={p}
            data={tempData}
            id={path[i + 1]}
            virtual={virtual}
            parentId={path[i]}
            path={path.slice(0, i + 1) as Value}
          />
        );
      }
      return null;
    });

    if (childs) {
      cascaderList = cascaderList.concat(childs);
    }

    const listStyle =
      data && data.length === 0 ? { height: 'auto', minHeight: height, width: '100%' } : { height };
    return (
      <div className={classNames(styles.listContent)} style={listStyle}>
        {cascaderList}
      </div>
    );
  };

  const renderEmpty = () => {
    if (emptyText) {
      return <div className={styles?.empty}>{emptyText}</div>;
    }
    return <div className={styles?.empty}>{getLocale(locale, 'noData')}</div>;
  };

  const renderNormalList = () => {
    if (!open && isFirstRender.current) {
      return null;
    }

    isFirstRender.current = false;

    const isEmpty = !filterData?.length;

    if (isEmpty && props.emptyText !== false) return renderEmpty();

    const list = renderList();
    return renderOptionList ? renderOptionList(list, { loading: !!loading }) : list;
  };

  const renderFilterList = () => {
    const listStyle = data && data.length === 0 ? { maxHeight: height } : { maxHeight: height };
    return (
      <div className={classNames(styles.listContent, styles.filterList)} style={listStyle}>
        <CascaderFilterList
          jssStyle={jssStyle}
          data={filterData!}
          datum={datum}
          keygen={keygen}
          mode={mode}
          height={height}
          size={size}
          isRealtime={isRealtime}
          virtual={virtual}
          wideMatch={wideMatch}
          filterFunc={filterFunc}
          renderItem={renderItem}
          childrenKey={childrenKey}
          shouldFinal={shouldFinal}
          onChange={handleChange}
          setInputText={setInputText}
          setFilterText={setFilterText}
          onPathChange={handlePathChange}
        ></CascaderFilterList>
      </div>
    );
  };

  const renderLoading = () => {
    if (loading !== true) {
      return loading;
    }

    return (
      <div className={styles?.loading}>
        <Spin jssStyle={jssStyle} size={14}></Spin>
      </div>
    );
  };

  const renderPanel = () => {
    if (props.loading) {
      return renderLoading();
    }
    if (isDataEmpty) {
      return renderEmpty();
    }
    if (!filterText || (filterText && mode !== undefined) || (data && data.length === 0)) {
      return renderNormalList();
    }
    return renderFilterList();
  };

  useEffect(() => {
    if (!prevData) return;
    if (prevData !== data) {
      datum.setData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!value) return;
    datum.setValue(value);

    if(!open) return
    updatePathByValue();
    if (props.renderOptionList) {
      updatePath();
    }
  }, [value, open]);

  useEffect(() => {
    if (filterText !== undefined) {
      updatePath();
    }
  }, [filterText, firstMatchNode]);

  useEffect(() => {
    updatePathByValue();

    // 注册 close 事件
    if (getComponentRef) {
      const componentRef = {
        close: closePop,
      };
      if (util.isFunc(getComponentRef)) {
        getComponentRef(componentRef);
      } else {
        getComponentRef.current = componentRef;
      }
    }

    if (mode !== undefined && loader && [0, 1, 2].includes(mode)) {
      devUseWarning.error(
        `The mode ${mode} is not supported when loader setted. Only 3 or 4 can be set.`,
      );
    }
  }, []);

  const shouldFullWidth = props.loading || isDataEmpty;
  const pickerWrapperStyle = shouldFullWidth
    ? { minWidth: absolute && isDataEmpty ? '' : '100%' }
    : {};

  const getFixedWidth = () => {
    if (absolute && isDataEmpty) {
      return true;
    }
    if (filterText && !isMultiple) {
      return 'min';
    }
    return false;
  };

  return (
    <div
      id={fieldId}
      tabIndex={disabled === true || showInput ? undefined : 0}
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      className={rootClass}
      style={rootStyle}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      ref={targetRef}
    >
      {tipNode}
      {renderResult()}
      <AbsoluteList
        adjust={adjust}
        focus={open}
        fixedWidth={getFixedWidth()}
        absolute={absolute}
        zIndex={zIndex}
        position={position}
        updateKey={updateKey}
        popupGap={4}
        popupElRef={popupRef}
        parentElRef={targetRef}
      >
        <AnimationList
          onRef={popupRef}
          show={open}
          className={classNames(styles?.pickerWrapper, open && styles?.pickerWrapperShow)}
          display={'block'}
          type='scale-y'
          duration={'fast'}
          style={pickerWrapperStyle}
        >
          {renderPanel()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};
export default Cascader;
