import React, { useRef, useState } from 'react';
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
  auto: '',
};

const Dropdown = (props: SimpleDropdownProps) => {
  const { open, setOpen } = useControlOpen({ open: props.open });
  const [position, setPosition] = useState<MenuPosition>('bottom-left');
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { placeholder, animationListJssStyle, jssStyle, isSub, columns, width } = props;

  const handleFocus = () => {
    const { onCollapse } = props;
    const wrapper = wrapRef.current;
    if (props.position === 'auto') {
      const position = util.getMenuPosition(wrapper);
      setPosition(position);
    }
    if (onCollapse) {
      onCollapse(true);
    }
    setOpen(true);
  };

  const handleBlur = () => {
    const { onCollapse } = props;
    if (onCollapse) {
      onCollapse(false);
    }
    setOpen(false);
  };

  useClickAway({
    onClickAway: handleBlur,
    target: [wrapRef, listRef],
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
    if (['left-bottom', 'left-top'].includes(position!)) {
      child.reverse();
    }
    if (isSub) {
      return (
        <a
          key='button'
          className={classNames({
            [jssStyle.button]: true,
            [jssStyle.item]: true,
            [jssStyle.itemDisabled]: props.disabled,
            [jssStyle.itemActive]: !!open,
          })}
          data-role='item'
          onClick={!props.disabled ? handleFocus : undefined}
        >
          {child}
        </a>
      );
    } else
      return (
        <button
          type={'button'}
          disabled={props.disabled}
          onClick={handleFocus}
          // outline={outline}
          className={classNames({
            [jssStyle.button]: true,
            [jssStyle.splitButton]: !placeholder,
          })}
          // type={type}
          // size={size}
          key='button'
        >
          {child}
        </button>
      );
  };

  const renderList = () => {
    return props.data.map((dd, index) => {
      const d = dd as DropdownNode;
      const childPosition = positionMap[position];

      const renderPlaceholder = util.render(props.renderItem || 'content', d);
      const { children } = d;
      return children ? (
        <Dropdown
          jssStyle={jssStyle}
          animationListJssStyle={animationListJssStyle}
          style={{ width: '100%' }}
          data={children}
          disabled={!!d.disabled}
          placeholder={renderPlaceholder}
          key={index}
          position={childPosition as MenuPosition}
          onClick={props.onClick}
          renderItem={props.renderItem}
          trigger={props.trigger}
          isSub
        />
      ) : (
        <Item
          data={d}
          key={index}
          onClick={d.onClick || props.onClick}
          itemClassName={classNames({
            [jssStyle.item]: true,
          })}
          renderItem={props.renderItem}
          columns={columns}
          width={width}
        />
      );
    });
  };

  return (
    <div className={jssStyle.wrapper} ref={wrapRef}>
      {renderButton()}
      <AbsoluteList
        position={position}
        focus={open}
        parentElement={wrapRef.current}
        absolute={props.absolute}
        fixedWidth={'min'}
      >
        <AnimationList
          onRef={listRef}
          className={classNames({
            [jssStyle.list]: true,
            [jssStyle.boxList]: columns !== undefined && columns > 1,
          })}
          style={{
            width: width,
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
