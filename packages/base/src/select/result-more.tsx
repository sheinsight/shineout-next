import React, { useState, memo } from 'react';
import { ReultMoreProps } from './result-more.type';
import { parsePxToNumber } from '@sheinx/hooks';
import Tag from '../tag';
import Popover from '../popover';

export function getResetMore(
  onFilter: boolean,
  container: HTMLElement,
  doms: NodeListOf<HTMLElement>,
) {
  if (!container || !doms || !doms.length) return -1;
  const items = Array.from(doms);
  const style = getComputedStyle(container);
  const { clientWidth } = container;
  const paddingLeft = parsePxToNumber(style.paddingLeft);
  const paddingRight = parsePxToNumber(style.paddingRight);
  const minFilterWidth = onFilter ? 16 : 0;
  const contentWidth = clientWidth - paddingLeft - paddingRight - minFilterWidth - 1;

  const hideEl = items.pop() as HTMLElement;
  const hideElStyle = getComputedStyle(hideEl);
  const hideMargin =
    parsePxToNumber(hideElStyle.marginLeft) + parsePxToNumber(hideElStyle.marginRight);

  let num = 0;
  let sumWidth = 0;
  const itemWidthArr = items.map((item) => {
    const itemStyle = getComputedStyle(item);
    const itemLen =
      item.offsetWidth +
      parsePxToNumber(itemStyle.marginLeft) +
      parsePxToNumber(itemStyle.marginRight);
    sumWidth += itemLen;
    return itemLen;
  });
  if (sumWidth <= contentWidth) {
    num = -1;
  } else {
    let len = 0;
    for (let i = 0; i < itemWidthArr.length; i++) {
      const itemLen = itemWidthArr[i];
      // number length
      const resetNum = items.length - 1 - i;
      let moreWidth;
      if (resetNum <= 0) {
        moreWidth = 0;
      } else {
        const reset = `+${resetNum}`;
        (hideEl.childNodes[0] as HTMLElement).innerText = reset;
        // (+num) width
        moreWidth = hideEl.offsetWidth + hideMargin;
      }

      len += itemLen;
      if (len > contentWidth - moreWidth) {
        break;
      }
      num += 1;
      if (i === items.length - 1) {
        // not show more
        num = -1;
      }
    }
  }
  // at least show one
  if (num === 0 && itemWidthArr[0]) {
    num = 1;
  }
  return num;
}

const More = <DataItem, Value>(props: ReultMoreProps<DataItem, Value>) => {
  const { jssStyle, data, showNum, size, compressed, compressedClassName, classes } = props;
  const [visible, setVisible] = useState(false);

  const styles = classes;

  const shouldShowMore = showNum! < 0 || showNum! >= data.length;
  let before: React.ReactElement[] = [];
  let after: React.ReactElement[] = [];
  let itemsLength = 0;
  let tagStlye: React.CSSProperties = shouldShowMore
    ? {
        position: 'absolute',
        zIndex: -100,
        userSelect: 'none',
        msUserSelect: 'none',
        contain: 'layout',
        opacity: 0,
        pointerEvents: 'none',
      }
    : {};

  if (!shouldShowMore) {
    before = new Array(showNum!)
      .fill(undefined)
      .map((_item, index) => data[index] as React.ReactElement);

    after = new Array(data.length - showNum!)
      .fill(undefined)
      .map((_item, index) => data[showNum! + index] as React.ReactElement);
    itemsLength = after.length;
  }

  if (showNum! < 0 || showNum! >= data.length) {
    return (
      <React.Fragment>
        {data}
        {/* { for compute width} */}
        <Tag
          className={styles.tag}
          jssStyle={jssStyle as any}
          key='hidden'
          size={size}
          style={{
            position: 'absolute',
            zIndex: -100,
            userSelect: 'none',
            msUserSelect: 'none',
            contain: 'layout',
          }}
          mode={visible ? 'fill' : 'bright'}
          color={visible ? 'info' : 'default'}
        >
          <span>+</span>
        </Tag>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {shouldShowMore ? data : before}
      <span style={{ display: 'inline-flex' }}>
        <Tag
          className={styles.tag}
          jssStyle={jssStyle as any}
          key='more'
          size={size}
          style={tagStlye}
          mode={visible ? 'fill' : 'bright'}
          color={visible ? 'info' : 'default'}
        >
          {shouldShowMore ? '+' : `+${itemsLength}`}
        </Tag>
        <Popover
          jssStyle={jssStyle}
          className={compressedClassName}
          visible={visible}
          onVisibleChange={setVisible}
        >
          <div className={styles.moreWrapper} onClick={(e) => e.stopPropagation()}>
            {compressed === 'no-repeat' ? null : before}
            {after}
          </div>
        </Popover>
      </span>
    </React.Fragment>
  );
};

export default memo(More) as typeof More;
