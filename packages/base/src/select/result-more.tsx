import React, { useState, memo } from 'react';
import { ResultMoreProps } from './result-more.type';
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
  const contentWidth = clientWidth - paddingLeft - paddingRight - minFilterWidth;

  const hideEl = items.pop() as HTMLElement;
  const hideElStyle = getComputedStyle(hideEl);
  const hideMargin =
    parsePxToNumber(hideElStyle.marginLeft) + parsePxToNumber(hideElStyle.marginRight);

  let num = 0;
  let sumWidth = 0;
  for (let i = 0; i < doms.length; i++) {
    const item = doms[i];
    const itemStyle = getComputedStyle(item);
    const itemWidth =
      item.offsetWidth +
      parsePxToNumber(itemStyle.marginLeft) +
      parsePxToNumber(itemStyle.marginRight);
    sumWidth += itemWidth;

    let moreWidth = 0;
    const resetNum = items.length - 1 - i;
    if (resetNum > 0) {
      const reset = `+${resetNum}`;
      (hideEl.childNodes[0] as HTMLElement).innerText = reset;
      moreWidth = hideEl.offsetWidth + hideMargin
    }

    if (sumWidth > contentWidth - moreWidth ) {
      num = i;
      break;
    }

    num = -1
  };

  return num;
}

const More = <DataItem, Value>(props: ResultMoreProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    showNum,
    size,
    datas,
    compressed,
    compressedClassName,
    renderCompressed,
    classes,
    onRemove,
  } = props;
  const [visible, setVisible] = useState(false);

  const styles = classes;

  const shouldShowMore = showNum! < 0 || showNum! >= data.length;
  let before: React.ReactElement[] = [];
  let after: React.ReactElement[] = [];
  let afterLength = 0;

  if (!shouldShowMore) {
    before = new Array(showNum!)
      .fill(undefined)
      .map((_item, index) => data[index] as React.ReactElement);

    after = new Array(data.length - showNum!)
      .fill(undefined)
      .map((_item, index) => data[showNum! + index] as React.ReactElement);
    afterLength = after.length;
  }

  if (shouldShowMore) {
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

  const renderCompressedTag = () => {
    return (
      <React.Fragment>
        <Tag
          className={styles.tag}
          jssStyle={jssStyle as any}
          key='more'
          size={size}
          mode={visible ? 'fill' : 'bright'}
          color={visible ? 'info' : 'default'}
        >
          {shouldShowMore ? '+' : `+${afterLength}`}
        </Tag>
        {compressed !== 'hide-popover' && (
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
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {shouldShowMore ? data : before}
      <span style={{ display: 'inline-flex' }}>
        {renderCompressed
          ? renderCompressed({
              data: datas as DataItem[],
              onRemove: onRemove as (item: DataItem) => void,
            })
          : renderCompressedTag()}
      </span>
    </React.Fragment>
  );
};

export default memo(More) as typeof More;
