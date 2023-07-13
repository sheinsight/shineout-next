import React, { useRef, useState } from 'react';
import { DropdownClass, SimpleDropdownProps } from './dropdown.type';
import { useClickAway, util } from '@sheinx/hooks';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import { useControlOpen } from '../common/use-control-open';

const Dropdown = (props: SimpleDropdownProps) => {
  const { open, setOpen } = useControlOpen({ open: props.open });
  const [position, setPosition] = useState(props.position || 'bottom-left');
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { placeholder, animationListJssStyle, jssStyle = {} as DropdownClass } = props;

  const handleFocus = () => {
    const { onCollapse } = props;
    const wrapper = wrapRef.current;
    if (props.position === 'auto' || !props.position) {
      const position = util.getMenuPosition(wrapper);
      console.log(position);
      setPosition(position as any);
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

  const clickAwayRef = useClickAway(handleBlur, open);

  return (
    <div
      className={jssStyle.wrapper}
      ref={(el) => {
        wrapRef.current = el;
        clickAwayRef.current = el;
      }}
    >
      <span
        onClick={() => {
          handleFocus();
        }}
      >
        {placeholder || '请选择'}
      </span>
      <AbsoluteList
        position={position as any}
        focus={open}
        parentElement={wrapRef.current}
        absolute={props.absolute}
        fixedWidth={'min'}
      >
        {({ style }) => {
          return (
            <AnimationList
              className={jssStyle.list}
              style={style}
              type={'fade'}
              duration={'fast'}
              show={open}
              jssStyle={animationListJssStyle}
            >
              <div>hello world</div>
              <div>{position}</div>
            </AnimationList>
          );
        }}
      </AbsoluteList>
    </div>
  );
};

export default Dropdown;
