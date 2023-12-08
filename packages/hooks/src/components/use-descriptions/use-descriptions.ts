import { useState, useEffect, useRef } from 'react';
import type { BaseDescriptionsProps, DescriptionsItemProps } from './use-descriptions.type';
import { util, ResponsiveObserve } from '../..';
import type { Breakpoint, ScreenMap } from '../..';

const { isObject, isNumber, isArray } = util;

const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const getLengthByRow = (arr: DescriptionsItemProps[]) =>
  isArray(arr) ? arr.reduce((prev, now) => prev + (now.span || 1), 0) : 0;

const useDescriptions = (props: BaseDescriptionsProps) => {
  const { items, column, valueStyle, labelStyle } = props;
  const [screen, setScreen] = useState<Breakpoint>();
  const responsiveToken = useRef<string>();

  const renderItem: Array<DescriptionsItemProps[]> = [];

  useEffect(() => {
    responsiveToken.current = ResponsiveObserve.subscribe((screens: ScreenMap) => {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakPoint: Breakpoint = responsiveArray[i];
        if (screens[breakPoint]) {
          setScreen(breakPoint);
          break;
        }
      }
    });
    return () => {
      ResponsiveObserve.unsubscribe(responsiveToken.current!);
    };
  }, []);

  let currentColumn = 3;
  if (column && isObject(column)) currentColumn = column[screen as Breakpoint] || 3;
  if (column && isNumber(column) && column > 0) currentColumn = column;

  if (isArray(items) && items.length && currentColumn) {
    items.forEach((d: DescriptionsItemProps) => {
      const lastRenderItem = renderItem[renderItem.length - 1];
      const lengthRow = getLengthByRow(lastRenderItem);
      const span = d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1;
      const newItem = {
        ...d,
        span,
        ItemValueStyle: Object.assign({}, valueStyle, d?.ItemValueStyle),
        ItemLabelStyle: Object.assign({}, labelStyle, d?.ItemLabelStyle),
      };
      if (lengthRow === 0 || lengthRow === currentColumn) renderItem.push([newItem]);
      else
        lastRenderItem.push({
          ...newItem,
          span: d.span
            ? d.span > currentColumn - lengthRow
              ? currentColumn - lengthRow
              : d.span
            : 1,
        });
    });
    const lastRenderItem = renderItem[renderItem.length - 1];
    const lengthRow = getLengthByRow(lastRenderItem);
    if (lengthRow < currentColumn)
      lastRenderItem[lastRenderItem.length - 1].span! += currentColumn - lengthRow;
  }
  return {
    renderItem,
  };
};

export default useDescriptions;
