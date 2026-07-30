import React from 'react';
import Button from '../button';
import { DropdownNode, MenuPosition, SimpleDropdownProps, DropdownSemanticKey, DropdownClassNamesInfo } from './dropdown.type';
import { getDataset, usePopup, util } from '@sheinx/hooks';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import Icons from '../icons';
import classNames from 'classnames';
import Item from './Item';
import { useConfig } from '../config';
import { useSemantic } from '../common';

const Dropdown = (props: SimpleDropdownProps) => {
  const {
    placeholder,
    onClick,
    renderItem,
    absolute,
    data = [],
    jssStyle,
    isSub,
    adjust = true,
    columns,
    width,
    disabled,
    trigger = 'click',
    style,
    className,
    size,
    animation,
    hideArrow,
    zIndex,
    popupClassName,
    classNames: classNamesProp,
    styles: stylesProp,
  } = props;
  const dropdownClasses = jssStyle?.dropdown?.();
  const config = useConfig();
  const isRtl = config.direction === 'rtl';
  const dfp = 'bottom-left';

  const positionMap = {
    'left-top': 'left-top',
    'left-bottom': 'left-bottom',
    'right-top': 'right-top',
    'right-bottom': 'right-bottom',
    'top-right': 'left-bottom',
    'top-left': 'right-bottom',
    'bottom-right': 'left-top',
    'bottom-left': 'right-top',
    left: 'left',
    right: 'right',
    top: isRtl ? 'left-bottom' : 'right-bottom',
    bottom: isRtl ? 'left-top' : 'right-top',
    auto: '',
  };

  const { open, position, targetRef, popupRef, getTargetProps, closePop, openPop } = usePopup({
    open: props.open,
    onCollapse: props.onCollapse,
    disabled,
    trigger,
    position: util.getRTLPosition(props.position || dfp, isRtl),
    autoMode: 'menu',
    priorityDirection: 'vertical',
    mouseLeaveDelay: 200,
  });

  // Semantic DOM
  // 根级 Dropdown 应用全部 semantic；子级 isSub 也需要接收 semantic 以便对 button(item) 应用 item key
  const semInfo: DropdownClassNamesInfo = { open: !!open, disabled: !!disabled };
  const [semClass, semStyle] = useSemantic<DropdownSemanticKey, DropdownClassNamesInfo>(
    classNamesProp,
    stylesProp,
    config.dropdown,
    semInfo,
  );

  // buttonProps
  let { type, text, outline, mode, shape } = props;

  // 默认使用 secondary text 样式
  if (type === undefined && text === undefined && outline === undefined && mode === undefined) {
    type = 'secondary';
    mode = 'text';
  }

  const renderButton = () => {
    const caret = (
      <span
        data-role='caret'
        key={'caret'}
        className={classNames(dropdownClasses?.caret, !isSub && semClass('caret', []))}
        style={!isSub ? semStyle('caret') : undefined}
        dir={config.direction}
      >
        {Icons.dropdown.DropdownArrow}
      </span>
    );
    const child = placeholder
      ? [
          <span key='text' className={dropdownClasses?.content}>
            {placeholder}
          </span>,
        ]
      : [];
    if (!hideArrow) {
      child.push(caret);
    }
    if (!isRtl) {
      if (['left-bottom', 'left-top', 'left'].includes(position!)) {
        child.reverse();
      }
    } else {
      if (['right-bottom', 'right-top', 'right'].includes(position!)) {
        child.reverse();
      }
    }

    if (isSub) {
      return (
        <a
          key='button'
          className={classNames(
            dropdownClasses?.button,
            dropdownClasses?.item,
            !!disabled && dropdownClasses?.itemDisabled,
            !!open && dropdownClasses?.itemActive,
            semClass('item', []),
          )}
          style={semStyle('item')}
          data-role='item'
        >
          {child}
        </a>
      );
    }
    return (
      <Button
        disabled={disabled}
        jssStyle={jssStyle}
        outline={outline}
        className={classNames(
          dropdownClasses?.button,
          !placeholder && dropdownClasses?.splitButton,
          semClass('button', []),
        )}
        style={semStyle('button')}
        mode={mode}
        type={type}
        shape={shape}
        size={size}
        text={text}
        key='button'
      >
        {child}
      </Button>
    );
  };

  const renderList = () => {
    return data.map((dd, index) => {
      const d = dd as DropdownNode;
      const childPosition = positionMap[position];

      const renderPlaceholder = util.render(renderItem || 'content', d);
      const { children } = d;
      const group = d.group ? (
        <div key={'group'} className={classNames(dropdownClasses?.optionGroup, semClass('group', []))} style={semStyle('group')}>
          {d.group}
        </div>
      ) : null;
      const divider = d.divider ? (
        <div key={'divider'} className={dropdownClasses?.optionDivider} />
      ) : null;
      const context = children ? (
        <Dropdown
          jssStyle={jssStyle}
          data={children}
          disabled={!!d.disabled}
          placeholder={renderPlaceholder}
          key={'group'}
          position={childPosition as MenuPosition}
          onClick={onClick}
          renderItem={renderItem}
          trigger={trigger}
          isSub
          closePop={closePop}
          classNames={classNamesProp}
          styles={stylesProp}
        />
      ) : (
        <Item
          data={d}
          key={index}
          onClick={d.onClick || onClick}
          itemClassName={classNames(dropdownClasses?.item, semClass('item', []))}
          itemStyle={semStyle('item')}
          renderItem={renderItem}
          direction={config.direction}
          columns={columns}
          width={width}
          handleBlur={isSub && props.closePop ? props.closePop : closePop}
        />
      );
      return (
        <React.Fragment key={index}>
          {group}
          <div className={dropdownClasses?.itemWrapper}>{context}</div>
          {divider}
        </React.Fragment>
      );
    });
  };

  const hasChildren = data.some((d) => (d as DropdownNode).children);

  const targetProps = getTargetProps();
  return (
    <div
      className={classNames(
        className,
        dropdownClasses?.rootClass,
        dropdownClasses?.wrapper,
        !isSub && open && dropdownClasses?.open,
        !isSub && semClass('root', []),
      )}
      style={!isSub ? { ...style, ...semStyle('root') } : style}
      data-position={position}
      data-role='dropdown'
      ref={targetRef}
      {...targetProps}
      {...getDataset(props)}
      onClick={isSub ? openPop : targetProps.onClick}
    >
      {renderButton()}
      <AbsoluteList
        position={position}
        focus={open}
        parentElRef={targetRef}
        absolute={absolute}
        zIndex={zIndex}
        fixedWidth={'min'}
        popupGap={4}
        popupElRef={popupRef}
        adjust={adjust}
      >
        <AnimationList
          display={columns ? 'grid' : 'block'}
          className={classNames(
            popupClassName,
            dropdownClasses?.list,
            hasChildren && dropdownClasses?.listHasChildren,
            columns !== undefined && columns > 1 && dropdownClasses?.boxList,
            size === 'small' && dropdownClasses?.listSmall,
            size === 'large' && dropdownClasses?.listLarge,
            !isSub && semClass('list', []),
          )}
          style={{
            width: width,
            minWidth: 90,
            gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined,
            ...(!isSub ? semStyle('list') : undefined),
          }}
          type={'fade'}
          duration={'fast'}
          show={open}
          onRef={popupRef as any}
          animation={animation}
        >
          {renderList()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default Dropdown;
