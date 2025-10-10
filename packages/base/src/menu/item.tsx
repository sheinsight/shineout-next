import React, { cloneElement, useState } from 'react';
import classNames from 'classnames';
import { useMenuItem, usePersistFn, util } from '@sheinx/hooks';
import Icons from '../icons';
import { useConfig } from '../config';
import Popover from '../popover';

import type { OptionalToRequired } from '@sheinx/hooks';
import type { MenuItemProps } from './menu.type';

const MenuItem = (props: OptionalToRequired<MenuItemProps>) => {
  const classes = props.jssStyle?.menu?.();
  const children = props.dataItem.children || [];
  const { inlineIndent = 24, frontCaretType = 'solid', mode, toggleDuration = 50 } = props;
  const config = useConfig();
  const shoudPop = mode === 'vertical' || mode === 'vertical-auto' || mode === 'horizontal';
  const isVertical = mode === 'vertical' || mode === 'vertical-auto';
  const isSubHorizontal = mode === 'horizontal' && props.level > 0;
  const isRootHorizontal = mode === 'horizontal' && props.level === 0;
  const [popOpen, setOpen] = useState(false);
  const liRef = React.useRef<HTMLLIElement>(null);

  const hasExpandAbleChildren = children.some(
    (item: any) => item && item.children && (props.looseChildren || item.children.length),
  );

  const handleVisibleChange = usePersistFn((visible: boolean) => {
    if (isRootHorizontal) {
      setOpen(visible);
    }
  });

  const {
    id,
    isChecked,
    isDisabled,
    isInPath,
    isOpen,
    expandAble,
    isUp,
    handleExpandClick,
    handleItemClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useMenuItem({
    dataItem: props.dataItem,
    keyResult: props.keyResult,
    openKeys: props.openKeys,
    onOpenChange: props.onOpenChange,
    bindUpdate: props.bindUpdate,
    unbindUpdate: props.unbindUpdate,
    changeActiveId: props.changeActiveId,
    onClick: props.onClick,
    parentId: props.parentId,
    looseChildren: props.looseChildren,
    parentSelectable: props.parentSelectable,
    disabled: props.disabled,
    mode: props.mode,
    scrollRef: props.scrollRef,
  });

  const renderChildren = () => {
    let items = children;
    let isTitle = false;
    if (!items?.length) {
      if (props.level === 0 && props.collapse && shoudPop) {
        items = [props.dataItem];
        isTitle = true;
      } else {
        return null;
      }
    }

    const content = (close?: () => void) => (
      <ul
        className={classNames(
          shoudPop && classes?.childrenShow,
          classes?.children,
          isUp && classes?.childrenUp,
          hasExpandAbleChildren && classes?.childrenHasExpand,
        )}
        // 子菜单点击弹出
        onClick={close}
        dir={config.direction}
      >
        {items.map((item: any, index: number, arr: any[]) => {
          const key = util.getKey(props.keygen, item, index);
          return (
            <MenuItem
              {...props}
              mode={mode}
              parentId={id}
              dataItem={item}
              key={key}
              index={index}
              keyResult={key}
              level={props.level + 1}
              renderIcon={isTitle ? undefined : props.renderIcon}
              // 顶部或底部的menuItem的popover边缘与menu的边缘对齐
              isEdgeItem={index === 0 || index === arr.length - 1}
            />
          );
        })}
      </ul>
    );
    if (shoudPop) {
      const position =
        isVertical || isSubHorizontal ? (isUp ? 'right-bottom' : 'right-top') : 'bottom-left';
      const offset = isVertical && props.isEdgeItem ? [0, 4] as [number, number] : undefined;
      let popoverContentStyle: React.CSSProperties | undefined;
      if (mode === 'horizontal' && props.level === 0 && liRef.current) {
        popoverContentStyle = { minWidth: liRef.current.clientWidth };
      }
      return (
        <Popover
          mouseLeaveDelay={toggleDuration}
          className={classNames(classes?.popover)}
          attributes={util.getDataAttribute({
            theme: props.theme || 'light',
            mode: isVertical ? 'vertical' : mode,
          })}
          onVisibleChange={handleVisibleChange}
          jssStyle={props.jssStyle}
          arrowClass={classNames(
            classes?.popArrow,
            props.theme === 'dark' && classes?.popArrowDark,
          )}
          showArrow={mode !== 'horizontal'}
          position={position}
          lazy={false}
          offset={offset}
          style={popoverContentStyle}
        >
          {(close) => {
            return content(close);
          }}
        </Popover>
      );
    }

    return content();
  };

  const renderItem = () => {
    const icon = util.isFunc(props.renderIcon) ? props.renderIcon(props.dataItem) : null;
    const iconEl = icon ? <div className={classes?.titleIcon}>{icon}</div> : null;
    const indent =
      props.mode === 'inline' && props.level ? (
        <div style={{ width: props.level * inlineIndent, flexShrink: 0 }} />
      ) : null;
    const item = util.render(props.renderItem, props.dataItem, props.index);
    const link = props.linkKey
      ? (util.getKey(props.linkKey, props.dataItem, props.index, true) as string)
      : undefined;
    let title: React.ReactNode = null;
    if (util.isLink(item)) {
      const mergeClass = classNames(classes?.title, item.props && item.props.className);
      title = cloneElement(item, {
        className: mergeClass,
        children: (
          <>
            {indent}
            {iconEl}
            <div className={classes?.titleContent}>{item.props.children}</div>
          </>
        ),
      });
    } else {
      const linkProps = {
        className: classes?.title,
        href: link,
      };
      title = (
        <a {...linkProps}>
          {indent}
          {iconEl}
          <div className={classes?.titleContent}>{util.wrapSpan(item)}</div>
        </a>
      );
    }

    if (props.frontCaret) {
      return (
        <div
          className={classNames(classes?.itemContent, classes?.itemContentFront)}
          onClick={handleItemClick}
        >
          <div
            style={{ color: props.caretColor }}
            className={classNames(
              classes?.expand,
              classes?.expandFront,
              (isVertical || isSubHorizontal) && classes?.expandVertical,
              props.parentSelectable && classes?.expandHover,
            )}
            onClick={handleExpandClick}
            dir={config.direction}
          >
            {
              <div className={classes?.icon}>
                {frontCaretType === 'hollow'
                  ? Icons.menu.CollapseArrow
                  : Icons.menu.FrontSolidArrowDown}
              </div>
            }
          </div>
          {title}
        </div>
      );
    } else {
      return (
        <div
          className={classNames(classes?.itemContent, classes?.itemContentBack)}
          onClick={handleItemClick}
        >
          {title}
          {expandAble && (
            <div
              onClick={handleExpandClick}
              style={{ color: props.caretColor }}
              className={classNames(
                classes?.expand,
                classes?.expandBack,
                (isVertical || isSubHorizontal) && classes?.expandVertical,
                props.parentSelectable && classes?.expandHover,
              )}
              dir={config.direction}
            >
              <div className={classes?.icon}>{Icons.menu.CollapseArrow}</div>
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <li
      className={classNames(
        classes?.item,
        isDisabled && classes?.itemDisabled,
        isInPath && classes?.itemInPath,
        (isOpen || popOpen) && classes?.itemOpen,
        isChecked && classes?.itemActive,
        expandAble && classes?.itemHasChildren,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dir={config.direction}
      ref={liRef}
    >
      {renderItem()}
      {renderChildren()}
    </li>
  );
};

export default MenuItem;
