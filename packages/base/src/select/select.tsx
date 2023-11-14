import React from 'react';
import classNames from 'classnames';
import { usePersistFn, usePopup } from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
import { SelectProps } from './select.type';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Result from './result';
import List from './list';
import TreeList from './list-tree';
import ColumnsList from './list-columns';

const Select = <DataItem, Value>(props: SelectProps<DataItem, Value>) => {
  const {
    jssStyle,
    className,
    size,
    data,
    // value,
    // treeData,
    innerTitle,
    underline,
    border = true,
    // clearable = true,
    status,
    columns,
    width,
    optionWidth = '100%',
    height = 250,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    // onFocus,
    // onBlur,
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
  );

  // const [, setFocused] = React.useState(false);

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

  // const handleFocus = usePersistFn((e: React.FocusEvent) => {
  //   setFocused(true);
  //   onFocus?.(e);
  // });

  // const handleBlur = usePersistFn((e: React.FocusEvent) => {
  //   setFocused(false);
  //   onBlur?.(e);
  // });

  const handleResultClick = usePersistFn(() => {
    openPop();
  });

  const renderInnerTitle = useInnerTitle({
    open,
    size: size,
    jssStyle: jssStyle,
    innerTitle: innerTitle,
  });

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result jssStyle={jssStyle}></Result>
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
      width,
      height,
      optionWidth,
      lineHeight,
      itemsInView,
    };
    if ((typeof columns === 'number' && columns! >= 1) || columns === -1) {
      return <ColumnsList {...listProps}></ColumnsList>;
    }
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
