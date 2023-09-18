import { useState, useEffect, useRef } from 'react';
import type { BaseDescriptionsProps, DescriptionsItemProps } from './use-descriptions.type';
import { util, ResponsiveObserve } from '../..';
import type { Breakpoint, ScreenMap } from '../..';

const { isObject, isNumber, isArray } = util;

const getLengthByrow = (arr: DescriptionsItemProps[]) =>
  isArray(arr) ? arr.reduce((prev, now) => prev + (now.span || 1), 0) : 0;

const useDescriptions = (props: BaseDescriptionsProps) => {
  const { item, column } = props;
  const [screen, setScreen] = useState<Breakpoint>();
  const responsiveToken = useRef<string>();

  const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

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

  const renderItem: Array<DescriptionsItemProps[]> = [];

  if (isArray(item) && item.length && currentColumn) {
    item.forEach((d: DescriptionsItemProps) => {
      const lastRenderItem = renderItem[renderItem.length - 1];
      const lengthRow = getLengthByrow(lastRenderItem);
      if (lengthRow === 0 || lengthRow === currentColumn)
        renderItem.push([
          {
            ...d,
            span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1,
          },
        ]);
      else
        lastRenderItem.push({
          ...d,
          span: d.span
            ? d.span > currentColumn - lengthRow
              ? currentColumn - lengthRow
              : d.span
            : 1,
        });
    });
    const lastRenderItem = renderItem[renderItem.length - 1];
    const lengthRow = getLengthByrow(lastRenderItem);
    if (lengthRow < currentColumn)
      lastRenderItem[lastRenderItem.length - 1].span =
        lastRenderItem[lastRenderItem.length - 1].span! + currentColumn - lengthRow;
  }
  return {
    renderItem,
  };
};

export default useDescriptions;
