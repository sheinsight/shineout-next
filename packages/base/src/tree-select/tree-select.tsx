import React, { useRef } from 'react';
import {
  util,
  usePersistFn,
  usePopup,
  useTreeSelect,
  useFilter,
  UnMatchedData,
  KeygenResult,
} from '@sheinx/hooks';
import classNames from 'classnames';
import { TreeSelectProps } from './tree-select.type';
import { TreeSelectClasses } from '@sheinx/shineout-style';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import { TreeContextProps } from '../tree/tree-context.type';
import Result from '../select/result';
import Icons from '../icons';
import Tree from '../tree';

const TreeSelect = <DataItem, Value>(props: TreeSelectProps<DataItem, Value>) => {
  const {
    jssStyle,
    className,
    size,
    value: valueProp,
    defaultValue,
    data,
    multiple,
    mode,
    line = false,
    innerTitle,
    clearable = true,
    border = true,
    underline,
    showArrow = true,
    focusSelected = true,
    position: positionProp,
    open: openProp,
    onCollapse: onCollapseProp,
    disabled,
    style,
    width,
    height = 250,
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
    // getComponentRef,
    onChange: onChangeProp,
    compressedBound,
    compressedClassName,
    expanded: expandedProp,
    defaultExpanded,
    defaultExpandAll,
    parentClickExpand,
    showHitDescendants,
    onFilter: onFilterProp,
    onChangeAddition,
  } = props;
  const styles = jssStyle?.select?.() as TreeSelectClasses;
  const rootStyle: React.CSSProperties = {
    ...style,
    width,
  };

  const datum = useRef<TreeContextProps>();
  const blurEvent = useRef<(() => void) | null>();
  const treeSelectRef = useRef<any>();
  const inputRef = useRef<HTMLInputElement>();

  const { value, onChange } = useTreeSelect({
    value: valueProp,
    onChange: onChangeProp,
    defaultValue,
    control: 'value' in props,
  });

  const {
    filterText,
    inputText,
    filterData,
    expanded,
    setInputText,
    onFilter,
    onResetFilter,
    onClearCreatedData,
  } = useFilter({
    treeData: data,
    keygen,
    childrenKey,
    expanded: expandedProp,
    showHitDescendants,
    onFilter: onFilterProp,
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

  const bindTreeDatum = (treeDatum: TreeContextProps) => {
    datum.current = treeDatum;
  };

  const getRenderItem = (
    data: DataItem,
    expanded?: boolean,
    active?: boolean,
    id?: KeygenResult,
  ) => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, expanded, active, id)
      : (data[renderItemProp] as React.ReactNode);
  };

  const renderItem = getRenderItem;

  const getRenderResult = (data: DataItem) => {
    if (!renderResultProp) return renderItem(data);
    return typeof renderResultProp === 'function' ? renderResultProp(data) : data[renderResultProp];
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!datum.current) return;
    datum.current.setValue([]);
    onChange((multiple ? [] : '') as Value);

    if (onChangeAddition) {
      onChangeAddition({
        data: multiple ? [] : null,
      });
    }
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

  const getDataByValues = (values: (Value | undefined)[]) => {
    if (!datum.current) return [];
    return datum.current.getDataByValues(values);
  };

  const getValue = () => {
    if (!datum.current) return;
    const nextValue = datum.current.getValue();
    if (multiple) return nextValue;
    return nextValue.length ? nextValue[0] : '';
  };

  const getContentClass = (data: DataItem) => {
    if (!datum.current) return '';

    const key = datum.current.getKey(data);
    const isDisabled = datum.current?.isDisabled(key);
    const isCheck = datum.current?.getChecked(key);

    if (isDisabled) {
      return classNames(styles.optionDisabled);
    }

    if (multiple) {
      return isCheck ? classNames(styles.optionActive) : '';
    }

    if (!util.isArray(value)) {
      const currentData = datum.current.getDataByValues(value);
      return currentData === data ? classNames(styles.optionActive) : '';
    }

    return '';
  };

  const checkUnMatched = (item: any) => {
    return util.isUnMatchedData(item);
  };

  const handleFilter = (text: string) => {
    onFilter(trim ? text.trim() : text);
  };

  const handleChange = (item: DataItem | UnMatchedData, id: KeygenResult) => {
    if (!datum.current) return;
    if (disabled === true || datum.current?.isDisabled(id)) return;
    const currentData = datum.current?.getDataByValues(id);
    if (!multiple) {
      datum.current.setValue([]);
      datum.current.set(datum.current.getKey(item), 1);
    }

    const nextValue = getValue();

    if (onChange) {
      onChange(nextValue, currentData, id ? (datum.current.getPath(id) || {}).path : undefined);
    }

    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: datum.current.getDataByValues(nextValue),
        checked: multiple ? datum.current.get(id) : undefined,
        current: currentData,
      });
    }
  };

  const handleTreeChange = (item: DataItem | UnMatchedData, id: KeygenResult) => {
    handleChange(item, id);
    if (!multiple) closePop();
  };

  const handleRemove = (item: DataItem | UnMatchedData, key?: KeygenResult, index?: number) => {
    if (!datum.current) return;

    const dataKey = util.isUnMatchedData(item)
      ? item.value
      : datum.current.getKey(item, key, index);

    const isDisabled = datum.current.isDisabled(dataKey);

    if (isDisabled) return;

    datum.current.set(dataKey, 0);
    handleChange(item, datum.current.getKey(item, key, index));
  };

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || !!value,
    size,
    jssStyle,
    innerTitle,
  });

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result<DataItem, Value>
          trim={trim}
          jssStyle={jssStyle}
          size={size}
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
          renderItem={renderItemProp}
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
          // onInputBlur={handleInputBlur}
          onResetFilter={onResetFilter}
          checkUnMatched={checkUnMatched}
          onClearCreatedData={onClearCreatedData}
          getDataByValues={getDataByValues}
          onRemove={handleRemove}
        ></Result>
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

  const renderActive = (item: DataItem) => {
    const items = renderItem(item);

    return <span>{items}</span>;
  };

  const renderList = () => {
    const treeProps = {};

    if (multiple) {
      treeProps.onChange = handleTreeChange;
    } else {
      treeProps.onClick = handleTreeChange;
      treeProps.renderItem = renderActive;
      treeProps.active = value;
    }

    return (
      <div className={classNames(styles.tree)} style={{ maxHeight: height }}>
        <Tree
          jssStyle={jssStyle}
          onRef={bindTreeDatum}
          renderItem={renderItem}
          {...treeProps}
          line={line}
          mode={mode}
          data={filterData}
          keygen={keygen}
          value={valueProp}
          expanded={expanded}
          disabled={disabled}
          parentClickExpand={parentClickExpand}
          defaultExpanded={defaultExpanded}
          defaultExpandAll={defaultExpandAll}
          contentClass={getContentClass}
        ></Tree>
      </div>
    );
  };

  const getListStyle = () => {
    const style: React.CSSProperties = {};
    if (position.indexOf('top') > -1) {
      style.transformOrigin = '0 100%';
    }

    style.width = width || '100%';

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
        fixedWidth
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
          {renderList()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default TreeSelect;
