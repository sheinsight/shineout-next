import { useEffect, useMemo, useRef, useState } from 'react';
import { useMenu, util, useRender } from '@sheinx/hooks';
import Item from './item';
import classNames from 'classnames';
// import Scroll from './scroll';

import type { MenuProps } from './menu.type';
import type { KeygenResult } from '@sheinx/hooks';

const emptyArray: any[] = [];
const Menu = <DataItem, Key extends KeygenResult>(props: MenuProps<DataItem, Key>) => {
  const { data = emptyArray, mode: modeProps = 'inline', theme = 'light', collapse } = props;
  const  render = useRender();

  // const [inTransition, setInTransition] = useState(false);
  const mode = collapse ? 'vertical-auto' : modeProps;

  const {current: context} = useRef({
    inTransition: false,
    lastCollapse: !!props.collapse,
  });
  if (props.mode !== 'horizontal' && !!context.lastCollapse !== !!collapse) {
    context.inTransition = true;
    context.lastCollapse = !!props.collapse;
  }

  const classes = props.jssStyle?.menu?.();
  const isVertical = mode === 'vertical' || mode === 'vertical-auto';
  // const isHorizontal = mode === 'horizontal';
  const [hasOpen, setHasOpen] = useState(false);

  // 当使用 active 函数且 openKeys 非受控时，自动展开激活项的父级菜单
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mergedDefaultOpenKeys = useMemo(() => {
    if (props.openKeys !== undefined || !props.active) return props.defaultOpenKeys;
    const parentKeys: Key[] = [];
    const walk = (items: DataItem[], ancestors: Key[]) => {
      items.forEach((item: any, index: number) => {
        const key = util.getKey(props.keygen, item, index) as Key;
        if (props.active!(item)) {
          parentKeys.push(...ancestors);
        }
        if (item.children?.length) {
          walk(item.children, [...ancestors, key]);
        }
      });
    };
    walk(data, []);
    if (!parentKeys.length) return props.defaultOpenKeys;
    const merged = new Set([...(props.defaultOpenKeys || []), ...parentKeys]);
    return Array.from(merged) as Key[];
  }, []);

  const { openKeys, onOpenChange, bindUpdate, unbindUpdate, changeActiveId } = useMenu({
    data,
    active: props.active,
    defaultOpenKeys: mergedDefaultOpenKeys,
    openKeys: props.openKeys,
    onOpenChange: props.onOpenChange as any,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const hasExpand = data.some(
    (item) => item && item.children && (props.looseChildren || item.children.length),
  );

  // const showScrollBar = isHorizontal || isVertical;

  const renderHeader = () => {
    if (modeProps === 'horizontal') return;
    if (props.header) {
      return <div className={classes?.header}>{props.header}</div>;
    }
    return null;
  };

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
        classes?.rootClass,
        classes?.wrapper,
        mode === 'inline' && classes?.wrapperInline,
        (mode === 'vertical' || mode === 'vertical-auto') && classes?.wrapperVertical,
        mode === 'horizontal' && classes?.wrapperHorizontal,
        hasOpen && classes?.wrapperHasOpen,
        theme === 'dark' ? classes?.wrapperDark : classes?.wrapperLight,
        collapse && classes?.wrapperCollapse,
        context.inTransition && classes?.wrapperInTransition,
        props.inlineAnimate && classes?.wrapperInlineAnimate,
      )}
      {...util.getDataAttribute({
        theme,
        mode: isVertical ? 'vertical' : mode,
      })}
      style={{
        height: props.height,
        ...props.style,
      }}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) {
          context.inTransition = false;
          render();
        }
      }}
      // todo: 其实可以把scrollRef指向到这里，后续验证相关功能后重构
      // ref={scrollRef}
    >
      {renderHeader()}
      <div className={classes?.scrollbox} ref={scrollRef}>
        <ul className={classNames(classes?.root, hasExpand && classes?.childrenHasExpand)}>
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
                inlineAnimate={props.inlineAnimate}
                scrollRef={scrollRef}
                theme={theme}
                renderIcon={props.renderIcon}
                collapse={collapse}
                isEdgeItem={false}
                getItemProps={props.getItemProps}
              />
            );
          })}
        </ul>
      </div>
      {/* {showScrollBar && (
        <Scroll
          targetRef={scrollRef}
          direction={mode === 'vertical' || mode === 'vertical-auto' ? 'y' : 'x'}
          data={data}
          jssStyle={props.jssStyle}
        />
      )} */}
    </div>
  );
};

export default Menu;
