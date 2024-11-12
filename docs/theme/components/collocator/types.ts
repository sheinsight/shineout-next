import { MarkdownProps, Example } from 'docs/types';

export enum ComponentType {
  SWITCH = 'switch',
  SELECT = 'select',
  TEXTAREA = 'textarea',
  INPUT = 'input',
  OTHER = 'other',
  INPUTWITHARRAY = 'inputWithArray',
  INPUTWITHNUMBER = 'inputWithNumber',
  NUMBER = 'number',
}

export enum IInputType {
  INPUTWITHNUMBER = 'inputWithNumber',
  INPUTWITHARRAY = 'inputWithArray'
}

export interface IItem {
  name: string;
  type: ComponentType;
  value?: any;
  defaultValue?: any;
  required?: boolean;
  initValue?: any;
  alias?: string;
  multiple?: boolean;
  notHideDefaultValue?: boolean
  related?: Record<string, any>
  mergeRelated?: Record<string, any>
  hide?: boolean
}

export enum AttachedType {
  NONE = 'none',
  CODE = 'code',
  CONSOLE = 'console',
}

export interface Icomponent {
  item: IItem;
  config: Record<string, any>;
  sign: boolean;
  parent?: string
  setSign: (sign: boolean) => void;
  setConfig: (config: Record<string, any>) => void;
}

export interface CollocatorProps {
  api: MarkdownProps['api']
  name: string
  examples: Example
  className?: string
}

export type UseCollocatorProps = Omit<CollocatorProps, 'className' | 'examples'>

export type IConsoleType = 'console' | 'error'

export interface IConsole {
  type: IConsoleType,
  message: string
}
