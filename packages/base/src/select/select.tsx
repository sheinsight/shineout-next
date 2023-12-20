import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import {
  util,
  usePersistFn,
  usePopup,
  useSelect,
  useFilter,
  useGroup,
  UnMatchedData,
} from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
import { SelectPropsBase, OptionListRefType } from './select.type';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Result from './result';
import List from './list';
import TreeList from './list-tree';
import Icons from '../icons';
import ColumnsList from './list-columns';

/**
 *
 * 树选择
 * 加载中
 * 自定义下拉列表
 * 限制字符长度
 *
 */

function Select<DataItem, Value>(props: SelectPropsBase<DataItem, Value>) {
  const {
    jssStyle,
    className,
    size,
    data,
    treeData,
    format,
    value: valueProp,
    defaultValue,
    prediction,
    innerTitle,
    underline,
    border = true,
    status,
    columns = 1,
    columnsTitle,
    columnWidth = 160,
    width,
    style,
    multiple,
    keygen,
    focusSelected = true,
    optionWidth = '100%',
    height,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    disabled,
    clearable = true,
    beforeChange,
    compressed,
    compressedBound,
    compressedClassName,
    placeholder,
    autoAdapt,
    groupBy,
    renderItem = (d) => d,
    renderResult: renderResultProp,
    renderUnmatched,
    resultClassName,
    hideCreateOption,
    filterSingleSelect,
    onChange,
    onCreate: onCreateProp,
    onFilter: onFilterProp,
    onBlur,
    // onFocus,
    onCollapse: onCollapseProp,
    onEnterExpand,
    onFilterWidthCreate,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootStyle: React.CSSProperties = {
    ...style,
    width,
  };
  const [controlType, setControlType] = useState<'mouse' | 'keyboard'>('keyboard');
  const [focused, setFocused] = useState(false);
  const [enter, setEnter] = useState(false);

  const isKeydown = useRef(false);
  const isPreventBlur = useRef(false);
  const blurEvent = useRef<(() => void) | null>();
  const inputRef = useRef<HTMLInputElement>();
  const selectRef = useRef<HTMLDivElement>();
  const optionListRef = useRef<OptionListRefType>();
  const resultRef = useRef<{ resetInput?: () => void }>({
    resetInput: undefined,
  });

  const {
    filterText,
    inputText,
    filterData,
    createdData,
    setInputText,
    onFilter,
    onResetFilter,
    onCreate,
    onClearCreatedData,
  } = useFilter({
    data,
    keygen,
    hideCreateOption,
    onCreate: onCreateProp,
    onFilter: onFilterProp,
    onFilterWidthCreate,
  });

  const { datum, value } = useSelect<DataItem, Value>({
    value: valueProp,
    data,
    multiple,
    defaultValue,
    control: 'value' in props,
    format,
    disabled,
    groupBy,
    prediction,
    beforeChange,
    onChange,
  });

  const { data: groupData, groupKey } = useGroup({
    data: filterData,
    groupBy,
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
    onClearCreatedData();
  });

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const rootClass = classNames(
    className,
    styles?.wrapper,
    disabled && styles?.wrapperDisabled,
    !!open && styles?.wrapperFocus,
    focused && styles?.wrapperFocus,
    innerTitle && styles?.wrapperInnerTitle,
    size === 'small' && styles?.wrapperSmall,
    size === 'large' && styles?.wrapperLarge,
    status === 'error' && styles?.wrapperError,
    clearable && styles?.clearable,
    !border && styles?.wrapperNoBorder,
    !!underline && styles?.wrapperUnderline,
    {
      [styles?.multiple]: multiple,
    },
  );

  // const handleFocus = usePersistFn((e: React.FocusEvent) => {
  //   setFocused(true);
  //   onFocus?.(e);
  // });

  const handleBlur = usePersistFn((e: React.FocusEvent) => {
    setFocused(false);
    onBlur?.(e);
  });

  const handleChange = (item: DataItem) => {
    if (multiple) {
      let unMatchData = item as UnMatchedData;

      if (util.isObject(item) && unMatchData.IS_NOT_MATCHED_VALUE) {
        datum.remove(item);
      } else {
        const checked = datum.check(item);
        if (checked) datum.remove(item);
        else datum.add(item);
      }
      resultRef.current?.resetInput?.();
      return;
    }

    const checked = datum.check(item);
    if (!checked) datum.add(item);

    inputRef.current?.blur();

    if (!multiple) {
      closePop();
      onClearCreatedData();
    }

    // 单选模式下，关闭列表后需要聚焦外层容器，以便继续键盘操作
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  // 点击 Select 结果框的处理方法
  const handleResultClick = usePersistFn(() => {
    if (disabled === true) return;
    openPop();
    inputRef.current?.focus();
  });

  // 创建选项时，开启隐藏创建项目后的处理方法
  const handleHideOption = () => {
    handleChange(createdData as DataItem);
  };

  // 回车时的处理方法
  const handleEnter = () => {
    const hoverIndex = optionListRef.current?.getHoverIndex() || 0;
    if (onCreate && hideCreateOption && createdData) {
      handleHideOption();

      return;
    }

    const currentDataItem = filterData[hoverIndex];
    if (currentDataItem && !currentDataItem[groupKey as keyof typeof currentDataItem]) {
      isKeydown.current = true;
      handleChange(currentDataItem);
    }
  };

  // input blur 时的处理方法
  // 注意，在点击 option 的时候也会触发 blur 事件，此时要规避点击 option 后的 blur 事件
  const handleInputBlur = (text: string) => {
    if (onFilterProp && text && filterSingleSelect && data.length === 1) {
      handleChange(data[0]);
      return;
    }
    if (!onCreate) return;
    if (multiple && !text) return;
    if (isKeydown.current) {
      isKeydown.current = false;
      return;
    }
    // 防止点击 option 后触发 blur 事件，先把要做的事情存起来，后面再看要不要执行
    blurEvent.current = () => {
      if (createdData) {
        handleChange(createdData as DataItem);
      }
      onClearCreatedData();
    };
  };

  const handleFilter = (text: string) => {
    const hideCreate = onCreate && hideCreateOption;

    if (onCreate && !hideCreateOption) {
      optionListRef.current?.hoverMove(0, true);
    }
    if (hideCreate) {
      // optionListRef.current?.hoverMove(filterData.length - 1, true);
    }

    onFilter(text);
  };

  const handleOptionClick = () => {
    isPreventBlur.current = true;
    if (multiple) return;
    // 单选结束后需要清除创建项
    onClearCreatedData();
  };

  // 退格键可删除选项，仅在多选模式下生效
  const handleDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!multiple) return;
    if (inputText) return;
    e.preventDefault();

    const raws = Array.isArray(value) ? value : [value];
    const values = [...raws];
    const last = values.pop();

    if (last) {
      datum.remove(last);
    }
  };

  const handleMouseEnter = () => {
    setEnter(true);
  };

  const handleMouseLeave = () => {
    setEnter(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 回车或下箭头可打开下拉列表
    if (
      (e.keyCode === 13 || e.code === 'Enter' || e.keyCode === 13 || e.code === 'ArrowDown') &&
      !open
    ) {
      if (typeof onEnterExpand === 'function') {
        const canOpen = onEnterExpand(e);
        if (canOpen === false) return;
      }
      handleResultClick();
      return;
    }

    // tab 可关闭下拉列表
    if (e.keyCode === 9 || e.code === 'Tab') {
      onBlur?.(e);
      if (open) closePop();
      return;
    }

    if (!open) return;

    setControlType('keyboard');

    switch (e.keyCode || e.code) {
      case 38 || 'ArrowUp':
        if (optionListRef.current?.hoverHover) optionListRef.current?.hoverMove(-1);
        e.preventDefault();
        break;
      case 40 || 'ArrowDown':
        if (optionListRef.current?.hoverHover) optionListRef.current?.hoverMove(1);
        e.preventDefault();
        break;
      case 13 || 'Enter':
        handleEnter();
        e.preventDefault();
        e.stopPropagation();
        break;
      case 8 || 'Backspace':
        handleDelete(e);
        break;
    }
  };

  const handleKeyUp = () => {};

  const handleClear = (e) => {
    e.stopPropagation();
    datum.removeAll();
    setInputText('');
    resultRef.current?.resetInput?.();

    if (open) closePop();
  };

  const getRenderResult = (data: DataItem, index?: number) => {
    if (!renderResultProp) return renderItem(data, index);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
  };

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || !!value,
    size,
    jssStyle,
    innerTitle,
  });

  const renderClearable = () => {
    return (
      <span className={styles.clearIcon} onClick={handleClear}>
        {Icons.PcCloseCircleFill}
      </span>
    );
  };

  const renderIcon = () => {
    if ((clearable && value && open) || (clearable && value && enter)) return renderClearable();
    return null;
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result
          resultRef={resultRef}
          jssStyle={jssStyle}
          size={size}
          datum={datum}
          value={value}
          data={groupBy ? groupData : filterData}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          compressed={compressed}
          compressedBound={compressedBound}
          compressedClassName={compressedClassName}
          multiple={multiple}
          placeholder={placeholder}
          prediction={prediction}
          renderItem={renderItem}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          allowOnFilter={'onFilter' in props}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          setInputText={setInputText}
          onFilter={handleFilter}
          onRef={inputRef}
          onCreate={onCreate}
          onInputBlur={handleInputBlur}
          onResetFilter={onResetFilter}
          onClearCreatedData={onClearCreatedData}
        ></Result>
        {renderIcon()}
      </div>
    );

    return (
      <div
        ref={targetRef}
        className={classNames(
          styles?.resultWrapper,
          styles?.wrapperPaddingBox,
          styles?.wrapperInnerTitleTop,
          styles?.wrapperInnerTitleBottom,
        )}
        onClick={handleResultClick}
      >
        {renderInnerTitle(result)}
      </div>
    );
  };

  const renderList = () => {
    const listProps = {
      data: groupBy ? groupData : filterData,
      datum,
      value,
      size,
      originalData: data,
      filterData,
      keygen,
      width,
      height,
      jssStyle,
      multiple,
      optionWidth,
      groupKey,
      lineHeight,
      columnsTitle,
      columnWidth,
      itemsInView,
      renderItem,
      controlType,
      onControlTypeChange: setControlType,
      closePop,
      optionListRef,
      onOptionClick: handleOptionClick,
    };
    // 自定义列
    if (('columns' in props && typeof columns === 'number' && columns! >= 1) || columns === -1) {
      return <ColumnsList columns={columns} {...listProps}></ColumnsList>;
    }

    return <List {...listProps}></List>;
  };

  const renderTreeList = () => {
    return (
      <TreeList
        jssStyle={jssStyle}
        data={treeData}
        keygen={keygen}
        renderItem={renderItem}
      ></TreeList>
    );
  };

  const renderOptions = () => {
    if ('treeData' in props) {
      return renderTreeList();
    }
    return renderList();
  };

  const getAutoAdaptStyle = () => {
    const style: React.CSSProperties = {};
    if (autoAdapt) {
      style.minWidth = '100%';
      return style;
    } else {
      if (columns > 1) {
        style.width = columns * columnWidth;
      } else {
        style.width = '100%';
      }
    }

    return style;
  };

  return (
    <div
      ref={selectRef}
      tabIndex={disabled === true ? -1 : 0}
      data-soui-type={'input'}
      className={rootClass}
      style={rootStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      // onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {renderResult()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth={autoAdapt ? 'min' : true}
        absolute={props.absolute}
        zIndex={props.zIndex}
        position={position}
        popupGap={4}
        popupEl={popupRef.current}
        parentElement={targetRef.current}
      >
        <AnimationList
          onRef={popupRef}
          show={open}
          className={classNames(styles?.pickerWrapper)}
          display={'block'}
          type='scale-y'
          duration={'fast'}
          style={getAutoAdaptStyle()}
        >
          {renderOptions()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
}

export default Select;
