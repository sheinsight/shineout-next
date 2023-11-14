import { VirtualScrollClasses } from './virtual-scroll.type';

export interface VirtualBarProps {
  jssStyle: {
    virtualScroll: () => VirtualScrollClasses;
  };
  direction: 'x' | 'y';
}
