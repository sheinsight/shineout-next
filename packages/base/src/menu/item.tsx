import { cloneElement } from 'react';
import classNames from 'classnames';
import { useMenuItem, util } from '@sheinx/hooks';
import Icons from '../icons';
import { useConfig } from '../config';

import type { OptionalToRequired } from '@sheinx/hooks';
import type { MenuItemProps } from './menu.type';

const MenuItem = (props: OptionalToRequired<MenuItemProps>) => {
  const classes = props.jssStyle?.menu?.();
  const children = props.dataItem.children || [];
  const { inlineIndent = 24, frontCaretType = 'solid' } = props;
  const config = useConfig();

  const hasExpandAbleChildren = children.some(
    (item: any) => item && item.children && (props.looseChildren || item.children.length),
  );

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
    toggleDuration: props.toggleDuration,
    disabled: props.disabled,
    mode: props.mode,
    scrollRef: props.scrollRef,
  });
  const renderItem = () => {
    const item = util.render(props.renderItem, props.dataItem, props.index);
    const link = props.linkKey
      ? (util.getKey(props.linkKey, props.dataItem, props.index) as string)
      : undefined;
    let title: React.ReactNode = null;
    if (util.isLink(item)) {
      const mergeClass = classNames(classes?.title, item.props && item.props.className);
      title = cloneElement(item, { className: mergeClass });
    } else {
      const linkProps = {
        className: classes?.title,
        href: link,
      };
      title = <a {...linkProps}>{util.wrapSpan(item)}</a>;
    }

    const indent =
      props.mode === 'inline' && props.level ? (
        <div style={{ width: props.level * inlineIndent, flexShrink: 0 }} />
      ) : null;

    if (props.frontCaret) {
      return (
        <div
          className={classNames(classes?.itemContent, classes?.itemContentFront)}
          onClick={handleItemClick}
        >
          {indent}
          <div
            style={{ color: props.caretColor }}
            className={classNames(
              classes?.expand,
              classes?.expandFront,
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
          {indent}
          {title}
          {expandAble && (
            <div
              onClick={handleExpandClick}
              style={{ color: props.caretColor }}
              className={classNames(
                classes?.expand,
                classes?.expandBack,
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
        isOpen && classes?.itemOpen,
        isChecked && classes?.itemActive,
        expandAble && classes?.itemHasChildren,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dir={config.direction}
    >
      {renderItem()}
      {children.length > 0 && (
        <ul
          className={classNames(
            classes?.children,
            isUp && classes?.childrenUp,
            hasExpandAbleChildren && classes?.childrenHasExpand,
          )}
          dir={config.direction}
        >
          {children.map((item: any, index: number) => {
            const key = util.getKey(props.keygen, item, index);
            return (
              <MenuItem
                {...props}
                parentId={id}
                dataItem={item}
                key={key}
                index={index}
                keyResult={key}
                level={props.level + 1}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
