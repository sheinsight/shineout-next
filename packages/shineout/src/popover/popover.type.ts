import { PopoverProps as UnStyledPopoverProps } from '@sheinx/base';

/**
 * @title Popover
 * @sort 1
 */
export type PopoverProps = Omit<UnStyledPopoverProps, 'jssStyle'>;
export type PopoverPosition = UnStyledPopoverProps['position'];
