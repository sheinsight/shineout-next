import { PopoverProps as UnStyledPopoverProps } from '@sheinx/base';

export type PopoverProps = Omit<UnStyledPopoverProps, 'jssStyle'>;
export type PopoverPosition = UnStyledPopoverProps['position'];
