import { DropdownProps as BaseStyleDropdownProps } from '@sheinx/base';

export type { DropdownItem } from '@sheinx/base';

export type DropdownProps = Omit<BaseStyleDropdownProps, 'jssStyle' | 'animationListJssStyle'>;
