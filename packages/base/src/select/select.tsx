import React from 'react';
import classNames from 'classnames';
import { usePersistFn, usePopup, useSelect } from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
import { SelectProps } from './select.type';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Result from './result';
import List from './list';
import TreeList from './list-tree';
// import ColumnsList from './list-columns';

const Select = <DataItem, Value>(props: SelectProps<DataItem, Value>) => {
  const {
    jssStyle,
    className,
    size,
    data,
    format,
    value: valueProp,
    defaultValue,
    prediction,
    innerTitle,
    underline,
    border = true,
    status,
    width,
    multiple,
    keygen,
    optionWidth = '100%',
    height = 250,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    disabled,
    beforeChange,
    compressed,
    compressedBound,
    placeholder,
    renderItem,
    renderResult: renderResultProp,
    renderUnmatched,
    resultClassName,
    onChange,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;

  const rootClass = classNames(
    className,
    styles?.wrapper,
    innerTitle && styles?.wrapperInnerTitle,
    size === 'small' && styles?.wrapperSmall,
    size === 'large' && styles?.wrapperLarge,
    status === 'error' && styles?.wrapperError,
    !border && styles?.wrapperNoBorder,
    !!underline && styles?.wrapperUnderline,
    {
      [styles?.multiple]: multiple,
    },
  );

  const { datum, value } = useSelect<DataItem, Value>({
    value: valueProp,
    data,
    multiple,
    defaultValue,
    control: 'value' in props,
    format,
    disabled,
    prediction,
    beforeChange,
    onChange,
  });

  const onCollapse = usePersistFn((isOpen: boolean) => {
    console.log(isOpen);
  });

  const { open, position, targetRef, popupRef, openPop } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const handleResultClick = usePersistFn(() => {
    openPop();
  });

  const renderInnerTitle = useInnerTitle({
    open,
    size,
    jssStyle,
    innerTitle,
  });

  const getRenderResult = (data: DataItem, index?: number) => {
    if (!renderResultProp) return renderItem(data, index);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result
          jssStyle={jssStyle}
          datum={datum}
          value={value}
          data={data}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          compressed={compressed}
          compressedBound={compressedBound}
          multiple={multiple}
          placeholder={placeholder}
          prediction={prediction}
          renderItem={renderItem}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
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
    const listProps = {
      data,
      datum,
      keygen,
      width,
      height,
      jssStyle,
      multiple,
      optionWidth,
      lineHeight,
      itemsInView,
      renderItem,
    };
    // 自定义列
    // if ((typeof columns === 'number' && columns! >= 1) || columns === -1) {
    //   return <ColumnsList {...listProps}></ColumnsList>;
    // }

    return <List {...listProps}></List>;
  };

  const renderTreeList = () => {
    return <TreeList></TreeList>;
  };

  const renderOptions = () => {
    if ('treeData' in props) {
      return renderTreeList();
    }
    return renderList();
  };

  return (
    <div data-soui-type={'input'} className={rootClass}>
      {renderResult()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth={false}
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
          type={'fade'}
          duration={'fast'}
          style={{ width: '100%' }}
        >
          {renderOptions()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default Select;
