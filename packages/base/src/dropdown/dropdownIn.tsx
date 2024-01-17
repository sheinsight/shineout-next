import React from 'react';
import Button from '../button';
import { DropdownNode, MenuPosition, SimpleDropdownProps } from './dropdown.type';
import { usePopup, util } from '@sheinx/hooks';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import Caret from '../icons/caret';
import classNames from 'classnames';
import Item from './Item';

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
  top: 'right',
  bottom: 'right',
  auto: '',
};

const Dropdown = (props: SimpleDropdownProps) => {
  const {
    placeholder,
    onClick,
    renderItem,
    absolute,
    data,
    jssStyle,
    isSub,
    columns,
    width,
    disabled,
    trigger = 'click',
    style,
    className,
    size,
    animation,
  } = props;
  const dropdownClasses = jssStyle?.dropdown?.();

  const { open, position, targetRef, popupRef, getTargetProps, closePop, openPop } = usePopup({
    open: props.open,
    onCollapse: props.onCollapse,
    disabled,
    trigger,
    position: props.position || 'bottom-left',
    autoMode: 'menu',
    priorityDirection: 'vertical',
    mouseLeaveDelay: 200,
  });
  // buttonProps
  let { type, text, outline, mode } = props;

  // 默认使用 secondary text 样式
  if (type === undefined && text === undefined && outline === undefined && mode === undefined) {
    type = 'secondary';
    mode = 'text';
  }

  const renderButton = () => {
    const caret = (
      <span key={'caret'} className={dropdownClasses?.caret}>
        <Caret />
      </span>
    );
    const child = [
      <span key='text' className={dropdownClasses?.content}>
        {placeholder}
      </span>,
      caret,
    ];
    if (['left-bottom', 'left-top', 'left'].includes(position!)) {
      child.reverse();
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
          )}
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
        )}
        mode={mode}
        type={type}
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
        <div key={'group'} className={dropdownClasses?.optionGroup}>
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
        />
      ) : (
        <Item
          data={d}
          key={index}
          onClick={d.onClick || onClick}
          itemClassName={classNames(dropdownClasses?.item)}
          renderItem={renderItem}
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

  const targetProps = getTargetProps();
  return (
    <div
      className={classNames(
        className,
        dropdownClasses?.wrapper,
        !isSub && open && dropdownClasses?.open,
      )}
      style={style}
      data-position={position}
      ref={targetRef}
      {...targetProps}
      onClick={isSub ? openPop : targetProps.onClick}
    >
      {renderButton()}
      <AbsoluteList
        position={position}
        focus={open}
        parentElement={targetRef.current}
        absolute={absolute}
        fixedWidth={'min'}
        popupGap={6}
        popupEl={popupRef.current}
        adjust={!isSub}
      >
        <AnimationList
          display={columns ? 'grid' : 'block'}
          className={classNames(
            dropdownClasses?.list,
            columns !== undefined && columns > 1 && dropdownClasses?.boxList,
            size === 'small' && dropdownClasses?.listSmall,
            size === 'large' && dropdownClasses?.listLarge,
          )}
          style={{
            width: width,
            gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined,
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
