import { PopoverConfirmProps as UnStyledPopoverConfirmProps } from '@sheinx/base';
import type { PopoverProps } from './popover.type'

export type PopoverConfirmProps = Omit<UnStyledPopoverConfirmProps, 'jssStyle'>;

/**
 * @title Popover.Confirm
 * @cn 基本API 和 Popover 一致，特定API如下
 * @en The basic API is consistent with Popover, and the specific API is as follows
 * @sort 2
 */
type _PopoverConfirmPropsWithoutConfirm = Omit<PopoverConfirmProps, keyof Omit<PopoverProps, 'children' | 'type'>>;
