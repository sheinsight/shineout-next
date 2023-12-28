import { useMenu, util } from '@sheinx/hooks';
import Item from './item';

import type { MenuProps } from './menu.type';
import type { KeygenResult } from '@sheinx/hooks';
import classNames from 'classnames';

const emptyArray: any[] = [];
const Menu = <DataItem, Key extends KeygenResult>(props: MenuProps<DataItem, Key>) => {
  const { data = emptyArray, mode = 'inline' } = props;
  const classes = props.jssStyle?.menu?.();
  const { openKeys, onOpenChange, bindUpdate, unbindUpdate, changeActiveId } = useMenu({
    data,
    active: props.active,
    defaultOpenKeys: props.defaultOpenKeys,
    openKeys: props.openKeys,
    onOpenChange: props.onOpenChange as any,
  });

  const hasExpand = data.some(
    (item) => item.children && (props.looseChildren || item.children.length),
  );

  return (
    <div
      className={classNames(
        props.className,
        classes?.wrapper,
        mode === 'inline' && classes?.wrapperInline,
        mode === 'vertical' && classes?.wrapperVertical,
        mode === 'horizontal' && classes?.wrapperHorizontal,
        mode === 'vertical-auto' && classes?.wrapperVerticalAuto,
        hasExpand && classes?.wrapperHasExpand,
      )}
      style={props.style}
    >
      <ul className={classes?.root}>
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
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
