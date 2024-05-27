import { useEffect, useRef, useState } from 'react';
import { useMenu, util } from '@sheinx/hooks';
import Item from './item';
import classNames from 'classnames';
import Scroll from './scroll';

import type { MenuProps } from './menu.type';
import type { KeygenResult } from '@sheinx/hooks';

const emptyArray: any[] = [];
const Menu = <DataItem, Key extends KeygenResult>(props: MenuProps<DataItem, Key>) => {
  const { data = emptyArray, mode = 'inline', theme = 'light' } = props;
  const classes = props.jssStyle?.menu?.();
  const isVertical = mode === 'vertical' || mode === 'vertical-auto';
  const isHorizontal = mode === 'horizontal';
  const [hasOpen, setHasOpen] = useState(false);
  const { openKeys, onOpenChange, bindUpdate, unbindUpdate, changeActiveId } = useMenu({
    data,
    active: props.active,
    defaultOpenKeys: props.defaultOpenKeys,
    openKeys: props.openKeys,
    onOpenChange: props.onOpenChange as any,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const hasExpand = data.some(
    (item) => item && item.children && (props.looseChildren || item.children.length),
  );

  const showScrollBar = isHorizontal || isVertical;

  const listStyle = isVertical ? { width: props.style?.width } : undefined;

  useEffect(() => {
    const newOpen =
      (openKeys || []).filter((k) => data!.find((d, i) => util.getKey(props.keygen, d, i) === k))
        .length > 0;
    if (newOpen !== hasOpen) {
      setHasOpen(newOpen);
    }
  }, [data, openKeys]);

  return (
    <div
      className={classNames(
        props.className,
        classes?.wrapper,
        mode === 'inline' && classes?.wrapperInline,
        (mode === 'vertical' || mode === 'vertical-auto') && classes?.wrapperVertical,
        mode === 'horizontal' && classes?.wrapperHorizontal,
        hasOpen && classes?.wrapperHasOpen,
        theme === 'dark' ? classes?.wrapperDark : classes?.wrapperLight,
      )}
      style={{
        height: props.height,
        ...props.style,
      }}
    >
      <div className={classes?.scrollbox} ref={scrollRef}>
        <ul
          className={classNames(classes?.root, hasExpand && classes?.childrenHasExpand)}
          style={listStyle}
        >
          {data.map((item, index) => {
            const key = util.getKey(props.keygen, item, index);
            return (
              <Item
                level={0}
                index={index}
                parentId=''
                dataItem={item}
                key={key}
                keyResult={key}
                openKeys={openKeys}
                mode={mode}
                onOpenChange={onOpenChange}
                bindUpdate={bindUpdate}
                unbindUpdate={unbindUpdate}
                changeActiveId={changeActiveId}
                onClick={props.onClick}
                looseChildren={props.looseChildren}
                parentSelectable={props.parentSelectable}
                toggleDuration={props.toggleDuration}
                disabled={props.disabled}
                renderItem={props.renderItem}
                keygen={props.keygen}
                jssStyle={props.jssStyle}
                linkKey={props.linkKey}
                frontCaret={props.frontCaret}
                frontCaretType={props.frontCaretType}
                caretColor={props.caretColor}
                inlineIndent={props.inlineIndent}
                scrollRef={scrollRef}
              />
            );
          })}
        </ul>
      </div>
      {showScrollBar && (
        <Scroll
          targetRef={scrollRef}
          direction={mode === 'vertical' || mode === 'vertical-auto' ? 'y' : 'x'}
          data={data}
          jssStyle={props.jssStyle}
        />
      )}
    </div>
  );
};

export default Menu;
