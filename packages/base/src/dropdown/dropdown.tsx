import React, { useRef, useState } from 'react';
import Button from '../button';
import { DropdownNode, MenuPosition, SimpleDropdownProps } from './dropdown.type';
import { useClickAway, util } from '@sheinx/hooks';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import { useControlOpen } from '../common/use-control-open';
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
  const { open, setOpen } = useControlOpen({ open: props.open });
  const { current: context } = useRef({
    closeTimer: null as NodeJS.Timeout | null,
  });
  const [position, setPosition] = useState<MenuPosition>(
    props.position && props.position !== 'auto' ? props.position : 'bottom-left',
  );
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const {
    placeholder,
    onClick,
    renderItem,
    absolute,
    data,
    animationListJssStyle,
    jssStyle,
    isSub,
    columns,
    width,
    disabled,
    trigger = 'click',
    style,
    className,
    buttonJssStyle,
    size,
  } = props;
  // buttonProps
  let { type, text, outline, mode } = props;

  // 默认使用 secondary text 样式
  if (type === undefined && text === undefined && outline === undefined && mode === undefined) {
    type = 'secondary';
    mode = 'text';
  }

  const handleFocus = () => {
    const { onCollapse } = props;
    const wrapper = wrapRef.current;
    if (context.closeTimer) clearTimeout(context.closeTimer);
    if (open) return;
    if (props.position === 'auto') {
      const newPosition = util.getMenuPosition(wrapper);
      if (newPosition !== position) setPosition(newPosition);
    }
    if (onCollapse) {
      onCollapse(true);
    }
    setOpen(true);
  };

  const handleBlur = (delay = 0) => {
    if (!open) return;
    if (context.closeTimer) clearTimeout(context.closeTimer);
    context.closeTimer = setTimeout(() => {
      const { onCollapse } = props;
      if (onCollapse) {
        onCollapse(false);
      }
      setOpen(false);
    }, delay);
  };

  const handleHoverToggle = (show: boolean) => {
    if (disabled) return;
    if (trigger === 'click') return;
    if (show) {
      handleFocus();
    } else {
      handleBlur(200);
    }
  };

  const handleClickToggle = () => {
    if (disabled) return;
    if (trigger === 'hover') return;
    if (open) {
      handleBlur();
    } else {
      handleFocus();
    }
  };

  const handleMouseEnter = () => {
    handleHoverToggle(true);
  };

  const handleMouseLeave = () => {
    handleHoverToggle(false);
  };

  useClickAway({
    onClickAway: () => handleBlur(),
    target: [wrapRef, listRef],
    effect: open,
  });

  const renderButton = () => {
    const caret = (
      <span key={'caret'} className={jssStyle.caret}>
        <Caret />
      </span>
    );
    const child = [
      <span key='text' className={jssStyle.content}>
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
          className={classNames({
            [jssStyle.button]: true,
            [jssStyle.item]: true,
            [jssStyle.itemDisabled]: disabled,
            [jssStyle.itemActive]: !!open,
          })}
          data-role='item'
          onClick={!disabled ? handleFocus : undefined}
        >
          {child}
        </a>
      );
    } else
      return (
        <Button
          jssStyle={buttonJssStyle}
          disabled={disabled}
          onClick={handleClickToggle}
          outline={outline}
          className={classNames({
            [jssStyle.button]: true,
            [jssStyle.splitButton]: !placeholder,
          })}
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
        <div key={'group'} className={jssStyle.optionGroup}>
          {d.group}{' '}
        </div>
      ) : null;
      const divider = d.divider ? <div key={'divider'} className={jssStyle.optionDivider} /> : null;
      const context = children ? (
        <Dropdown
          buttonJssStyle={buttonJssStyle}
          jssStyle={jssStyle}
          animationListJssStyle={animationListJssStyle}
          data={children}
          disabled={!!d.disabled}
          placeholder={renderPlaceholder}
          key={'group'}
          position={childPosition as MenuPosition}
          onClick={onClick}
          renderItem={renderItem}
          trigger={trigger}
          isSub
        />
      ) : (
        <Item
          data={d}
          key={index}
          onClick={d.onClick || onClick}
          itemClassName={classNames({
            [jssStyle.item]: true,
          })}
          renderItem={renderItem}
          columns={columns}
          width={width}
        />
      );
      return (
        <React.Fragment key={index}>
          {group}
          {context}
          {divider}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className={classNames(className, {
        [jssStyle.wrapper]: true,
        [jssStyle.open]: !isSub && open,
      })}
      ref={wrapRef}
      style={style}
      data-position={position}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderButton()}
      <AbsoluteList
        position={position}
        focus={open}
        parentElement={wrapRef.current}
        absolute={absolute}
        fixedWidth={'min'}
      >
        <AnimationList
          onRef={listRef}
          display={columns ? 'grid' : 'block'}
          className={classNames({
            [jssStyle.list]: true,
            [jssStyle.boxList]: columns !== undefined && columns > 1,
            [jssStyle.listSmall]: size === 'small',
            [jssStyle.listLarge]: size === 'large',
          })}
          style={{
            width: width,
            gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined,
          }}
          type={'fade'}
          duration={'fast'}
          show={open}
          jssStyle={animationListJssStyle}
        >
          {renderList()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default Dropdown;
