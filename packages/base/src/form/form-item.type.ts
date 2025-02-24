import React from 'react';

import { FormLabelConfig } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { TooltipProps } from '../tooltip/tooltip.type';

export interface FormItemClasses {
  rootClass: string;
  wrapper: string;
  wrapperLabelTop: string;
  wrapperInline: string;
  wrapperLabelVerticalMiddle: string;
  wrapperLabelVerticalBottom: string;
  wrapperKeepHeight: string;
  wrapperRequired: string;
  wrapperTip: string;
  label: string;
  labelWithColon: string;
  labelWithTooltip: string;
  labelTooltip: string;
  labelColon: string;
  labelLeft: string;
  control: string;
  error: string;
  tip: string;
}

type LabelTooltip = Pick<TooltipProps, 'tip' | 'position'> & {
  icon: React.ReactNode;
}
interface LabelConfig {
  content: React.ReactNode;
  tooltip?: React.ReactNode | LabelTooltip;
}

export interface FormItemProps extends FormLabelConfig, Pick<CommonType, 'className' | 'style'> {
  /**
   * @en When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''.
   * @cn 未定义时，标签不会 render，也不会占位。如果无内容需要占位，使用空字符串 ''。
   */
  label?: React.ReactNode | LabelConfig;
  /**
   * @en Prompting information
   * @cn 提示文案
   */
  tip?: React.ReactNode;
  /**
   * @en Required tags for pure display. Do not trigger validation
   * @cn 必填标记，纯展示用，不会触发校验
   * @default false
   */
  required?: boolean;
  /**
   * @en form element
   * @cn 表单元素
   */
  children?: React.ReactNode;
  jssStyle?: {
    formItem?: () => FormItemClasses;
  };
}
