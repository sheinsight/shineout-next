import React, { useState, useRef } from 'react';
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
} from '@sheinx/hooks';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import { CascaderClasses } from '@sheinx/shineout-style';
import { CascaderProps } from './cascader.type';
import CascaderList from './list';
import Result from '../select/result';
import Icons from '../icons';

const Cascader = <DataItem, Value extends KeygenResult[]>(
  props: CascaderProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    style,
    width,
    height,
    className,
    size,
    maxLength,
    value: valueProp,
    data = [],
    keygen,
    childrenKey = 'children' as ObjectKey<DataItem>,
    border = true,
    open: openProp,
    mode,
    innerTitle,
    multiple,
    disabled,
    clearable,
    underline,
    trim,
    loading,
    loader,
    final,
    expandTrigger,
    finalDismiss,
    renderItem: renderItemProp = (d) => d as React.ReactNode,
    renderResult: renderResultProp,
    placeholder,
    focusSelected = true,
    compressedClassName,
    resultClassName,
    renderUnmatched,
    renderOptionList,
    showArrow,
    compressed,
    compressedBound,
    position: positionProp = 'bottom-left',
    absolute,
    zIndex,
    onFocus,
    onBlur,
    onChange: onChangeProp,
    onFilter: onFilterProp,
    onCollapse: onCollapseProp,
  } = props;
  const styles = jssStyle?.cascader?.() as CascaderClasses;
  const rootStyle: React.CSSProperties = {
    ...style,
    width,
  };
  const [focused, setFocused] = useState(false);
  const [enter, setEnter] = useState(false);
  const [path, setPath] = useState<KeygenResult[]>([]);
  const isPreventBlur = useRef(false);
  const blurEvent = useRef<(() => void) | null>();
  const inputRef = useRef<HTMLInputElement>();
  const isFirstRender = useRef(true);

  const {
    filterText,
    inputText,
    filterData,
    createdData,
    expanded,
    setInputText,
    onFilter,
    onResetFilter,
    onCreate,
  } = useFilter({
    data,
    keygen,
    childrenKey,
    onFilter: onFilterProp,
    onAdvancedFilter: false,
  });

  const { datum, value, onChange } = useCascader({
    data,
    control: 'value' in props,
    keygen,
    childrenKey,
    value: valueProp,
    onChange: onChangeProp,
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

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp as any,
  });

  const rootClass = classNames(
    className,
    styles?.wrapper,
    disabled === true && styles?.wrapperDisabled,
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

  const getRenderItem = (data: DataItem, active?: boolean, id?: Value[0]) => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, active, id)
      : (data[renderItemProp] as React.ReactNode);
  };

  const getFinal = () => {
    return expandTrigger === 'hover-only' || !!final;
  };

  const renderItem = getRenderItem;

  const getRenderResult = (data: DataItem) => {
    if (!renderResultProp) return renderItem(data);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data)
      : (data[renderResultProp] as React.ReactNode);
  };

  // 点击结果框的处理方法
  const handleResultClick = usePersistFn(() => {
    if (disabled === true) return;
    openPop();
    inputRef.current?.focus();
  });

  // 回车时的处理方法
  const handleEnter = () => {};

  // input blur 时的处理方法
  // 注意，在点击 option 的时候也会触发 blur 事件，此时要规避点击 option 后的 blur 事件
  const handleInputBlur = (text?: string) => {};

  const handleFilter = (text: string) => {
    onFilter?.(trim ? text.trim() : text);
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

  const handleOptionClick = () => {
    isPreventBlur.current = true;
    if (multiple) return;
  };

  // 退格键可删除选项，仅在多选模式下生效
  const handleDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if (!multiple) return;
    // if (inputText) return;
    // e.preventDefault();
    // const raws = Array.isArray(value) ? value : [value];
    // const values = [...raws];
    // const last = values.pop();
    // if (last) {
    //   datum.remove(last);
    // }
  };

  const handleMouseEnter = () => {
    setEnter(true);
  };

  const handleMouseLeave = () => {
    setEnter(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 回车或下箭头可打开下拉列表
    if (e.keyCode === 13 || e.code === 'Enter') {
      if (!open) {
        handleResultClick();
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

  const handleChange = (item: (DataItem | UnMatchedData)[]) => {
    console.log(item);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPath([]);

    if (mode !== undefined) {
      datum.setValue([]);
    }
    handleChange([]);
    if (open) closePop();
  };

  const handleExpand = () => {};

  const getDataByValues = (values?: Value) => {
    if (!values) return [];
    return datum.getDataByValues(values);
  };

  const getValue = () => {
    const nextValue = datum.getValue();
    if (multiple) return nextValue;
    return nextValue.length ? nextValue[0] : '';
  };

  const checkUnMatched = (item: any) => {
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

  const handleRemove = (item: DataItem | UnMatchedData, key?: KeygenResult, index?: number) => {
    const dataKey = util.isUnMatchedData(item) ? item.value : datum.getKey(item, key, index);

    const isDisabled = datum.isDisabled(dataKey);

    if (isDisabled) return;

    datum.set(dataKey, 0);
    handleChange(item);
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
    let isEmpty;
    if (multiple) {
      isEmpty = !value || (Array.isArray(value) && value.length === 0);
    } else {
      isEmpty = util.isEmpty(value);
    }

    if ((clearable && !isEmpty && open) || (clearable && !isEmpty && enter && disabled !== true)) {
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
          value={value}
          data={data}
          focus={open}
          keygen={keygen as any}
          disabled={disabled}
          maxLength={maxLength}
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
          allowOnFilter={'onFilter' in props || 'onAdvancedFilter' in props}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          setInputText={setInputText}
          onFilter={handleFilter}
          onRef={inputRef}
          onResetFilter={onResetFilter}
          checkUnMatched={checkUnMatched}
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

  const renderList = () => {
    let cascaderList: React.ReactNode[] = [
      <CascaderList
        datum={datum}
        renderItem={renderItem as any}
        keygen={keygen}
        loader={loader}
        onPathChange={handlePathChange}
        onChange={handleChange}
        multiple={multiple}
        expandTrigger={expandTrigger}
        childrenKey={childrenKey}
        shouldFinal={getFinal()}
        key='root'
        data={data}
        id={path[0]}
        parentId=''
        path={[] as unknown as Value}
      />,
    ];

    const childs = path.map((p, i) => {
      let currentItem: any =
        data &&
        data instanceof Array &&
        data.find((d) => {
          const nid = datum.getKey(d, path[i - 1]);
          return nid === p;
        });
      if (
        currentItem &&
        currentItem[childrenKey] &&
        (currentItem[childrenKey] as DataItem[]).length > 0
      ) {
        currentItem = currentItem[childrenKey];
        return (
          <CascaderList<DataItem, Value>
            datum={datum}
            renderItem={renderItem as any}
            keygen={keygen}
            loader={loader}
            onPathChange={handlePathChange}
            onChange={handleChange}
            multiple={multiple}
            expandTrigger={expandTrigger}
            childrenKey={childrenKey}
            shouldFinal={getFinal()}
            key={p}
            data={currentItem}
            id={path[i + 1]}
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

    const listStyle = data && data.length === 0 ? { height: 'auto', width: '100%' } : { height };

    return <div style={listStyle}>{cascaderList}</div>;
  };

  const renderNormalList = () => {
    if (!open && isFirstRender.current) {
      return null;
    }
    isFirstRender.current = false;
    const list = renderList();
    return renderOptionList ? renderOptionList(list, { loading: !!loading }) : list;
  };

  const renderFilterList = () => {
    return <div>CascaderFilterList</div>;
  };

  const renderPanel = () => {
    if (!filterText || (filterText && mode !== undefined) || (data && data.length === 0)) {
      return renderNormalList();
    }
    return renderFilterList();
  };

  return (
    <div
      tabIndex={disabled === true ? -1 : 0}
      data-soui-type={'input'}
      className={rootClass}
      style={rootStyle}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderResult()}
      {renderIcon()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth
        absolute={absolute}
        zIndex={zIndex}
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
        >
          {renderPanel()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};
export default Cascader;
