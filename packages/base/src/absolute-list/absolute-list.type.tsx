import React from 'react';

export type PickerPosition = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top';
export type DropdownPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type ListPosition = 'drop-down' | 'drop-up';

export interface AbsoluteListProps {
  children: (props: { style: React.CSSProperties }) => React.ReactElement;
  focus: boolean;
  parentElement: HTMLElement | null;
  fixedWidth: 'min' | boolean; // same width with parentElement
  position: ListPosition | PickerPosition | DropdownPosition;
  /**
   * @en When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container
   * @cn 为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器
   * @default false
   */
  absolute: boolean | (() => HTMLElement) | undefined;

  rootClass?: string;
  /**
   * @en options z-index should use with absolute
   * @cn 选项列表 z-index 值, 需要配合 absolute
   * @default 1000
   */
  zIndex?: number;

  scrollElement?: HTMLElement;
  scrollLeft?: number;
  scrollTop?: number;
}
