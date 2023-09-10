import { PopoverProps as UnStyledPopoverProps } from '@sheinx/base';

/**
 * @title Popover
 */
export type PopoverProps = Omit<UnStyledPopoverProps, 'jssStyle'>;
export type PopoverPosition = UnStyledPopoverProps['position'];
