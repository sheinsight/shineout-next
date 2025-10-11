import { PopoverProps as UnStyledPopoverProps } from '@sheinx/base';

/**
 * @title Popover
 * @sort 1
 */
export type PopoverProps = Omit<UnStyledPopoverProps, 'jssStyle' | 'boundary'>;
export type PopoverPosition = UnStyledPopoverProps['position'];
