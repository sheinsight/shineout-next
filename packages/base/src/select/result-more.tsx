import React from 'react';
import { SelectClasses } from '@sheinx/shineout-style';
import { ReultMoreProps } from './result-more.type';
import { parsePxToNumber } from '@sheinx/hooks';
import Tag from '../tag';

export function getResetMore(
  onFilter: ((...args: any) => void) | undefined,
  container: HTMLElement,
  doms: NodeListOf<HTMLElement>,
) {
  if (!container || !doms || !doms.length) return -1;
  const items = Array.from(doms);
  console.log(items);
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
  const { jssStyle, data, showNum } = props;

  const styles = jssStyle?.select?.() as SelectClasses;

  if (showNum! < 0 || showNum! >= data.length) {
    return (
      <React.Fragment>
        {data}
        <Tag
          className={styles.tag}
          jssStyle={jssStyle}
          style={{
            position: 'absolute',
            zIndex: -100,
            userSelect: 'none',
            msUserSelect: 'none',
            contain: 'layout',
          }}
          key='hidden'
        >
          +
        </Tag>
      </React.Fragment>
    );
  }

  const before = new Array(showNum).fill(undefined).map((_item, index) => data[index]);
  const after = new Array(data.length - showNum!)
    .fill(undefined)
    .map((_item, index) => data[showNum! + index]);
  const itemsLength = after.length;

  return (
    <React.Fragment>
      {before}
      <Tag className={styles.tag} jssStyle={jssStyle} key='more'>{`+${itemsLength}`}</Tag>
    </React.Fragment>
  );
};

export default More;
