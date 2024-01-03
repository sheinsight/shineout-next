import React, { useRef } from 'react';
import {
  util,
  usePersistFn,
  usePopup,
  useSelect,
  useFilter,
  // useGroup,
  // UnMatchedData,
} from '@sheinx/hooks';
import classNames from 'classnames';
import { TreeSelectProps } from './tree-select.type';
import { TreeSelectClasses } from '@sheinx/shineout-style';
import { AbsoluteList } from '../absolute-list';
// import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Result from '../select/result';
import Icons from '../icons';

const TreeSelect = <DataItem, Value>(props: TreeSelectProps<DataItem, Value>) => {
  const {
    jssStyle,
    className,
    size,
    value: valueProp,
    defaultValue,
    data,
    multiple,
    innerTitle,
    clearable,
    border,
    underline,
    showArrow = true,
    focusSelected = true,
    position: positionProp,
    open: openProp,
    onCollapse: onCollapseProp,
    disabled,
    style,
    width,
    childrenKey,
    keygen,
    trim,
    renderResult: renderResultProp,
    renderItem: renderItemProp = (d) => d as React.ReactNode,
    prediction,
    maxLength,
    placeholder,
    renderUnmatched,
    resultClassName,
    compressed,
    compressedBound,
    compressedClassName,
    expanded: expandedProp,
    // defaultExpanded,
    // defaultExpandAll,
    showHitDescendants,
    onFilter: onFilterProp,
  } = props;
  const styles = jssStyle?.treeSelect?.() as TreeSelectClasses;
  const rootStyle: React.CSSProperties = {
    ...style,
    width,
  };

  const blurEvent = useRef<(() => void) | null>();
  const treeSelectRef = useRef<any>();

  const {
    filterText,
    inputText,
    filterData,
    // createdData,
    // expanded,
    setInputText,
    // onFilter,
    onResetFilter,
    // onCreate,
    onClearCreatedData,
  } = useFilter({
    data,
    keygen,
    childrenKey,
    expanded: expandedProp,
    showHitDescendants,
    onFilter: onFilterProp,
  });

  const { datum, value } = useSelect<DataItem, Value>({
    value: valueProp,
    data,
    childrenKey,
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

  const onCollapse = usePersistFn((collapse: boolean) => {
    onCollapseProp?.(collapse);

    if (blurEvent.current && !collapse) {
      blurEvent.current();
      blurEvent.current = null;
    }
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
    disabled === true && styles?.wrapperDisabled,
    !!open && styles?.wrapperFocus,
    // focused && styles?.wrapperFocus,
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

  const getRenderItem = (data: DataItem, index?: number) => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, index)
      : (data[renderItemProp] as React.ReactNode);
  };

  const renderItem = getRenderItem;

  const getRenderResult = (data: DataItem, index?: number) => {
    if (!renderResultProp) return renderItem(data, index);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    // datum.removeAll();
    // setInputText('');

    if (open) closePop();
  };

  // 点击 Select 结果框的处理方法
  const handleResultClick = usePersistFn(() => {
    if (disabled === true) return;
    openPop();
    // inputRef.current?.focus();
  });

  const renderClearable = () => {
    return (
      <span className={styles.clearIcon} onClick={handleClear}>
        {Icons.PcCloseCircleFill}
      </span>
    );
  };

  const renderIcon = () => {
    let isEmpty;
    if (multiple) {
      isEmpty = !value || (Array.isArray(value) && value.length === 0);
    } else {
      isEmpty = util.isEmpty(value);
    }

    if ((clearable && !isEmpty && open) || (clearable && !isEmpty && disabled !== true)) {
      return renderClearable();
    }
    if (!multiple && !showArrow) return null;
    const defaultIcon = compressed ? Icons.More : Icons.ArrowDown;
    return (
      <span className={classNames(styles.arrowIcon, open && !compressed && styles.arrowIconOpen)}>
        {defaultIcon}
      </span>
    );
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result<DataItem, Value>
          trim={trim}
          jssStyle={jssStyle}
          size={size}
          datum={datum}
          value={value}
          data={filterData as DataItem[]}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          maxLength={maxLength}
          compressed={compressed}
          compressedBound={compressedBound}
          compressedClassName={compressedClassName}
          multiple={multiple}
          placeholder={placeholder}
          prediction={prediction}
          renderItem={renderItem}
          childrenKey={childrenKey}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          allowOnFilter={'onFilter' in props || 'onCreate' in props}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          setInputText={setInputText}
          onFilter={handleFilter}
          onRef={inputRef}
          onInputBlur={handleInputBlur}
          onResetFilter={onResetFilter}
          onClearCreatedData={onClearCreatedData}
        ></Result>
      </div>
    );

    return <div onClick={handleResultClick}>{result}</div>;
  };

  // innerTitle 模式
  // const renderInnerTitle = useInnerTitle({
  //   open: open || !!value,
  //   size,
  //   jssStyle,
  //   innerTitle,
  // });

  const getListStyle = () => {
    const style: React.CSSProperties = {};
    if (position.indexOf('top') > -1) {
      style.transformOrigin = '0 100%';
    }

    return style;
  };

  return (
    <div
      ref={treeSelectRef}
      tabIndex={disabled === true ? -1 : 0}
      data-soui-type={'input'}
      className={rootClass}
      style={rootStyle}
    >
      {renderResult()}
      {renderIcon()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth='min'
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
          style={getListStyle()}
        >
          List
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default TreeSelect;
