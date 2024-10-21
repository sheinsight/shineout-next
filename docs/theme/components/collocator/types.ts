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
  notHideDefaultValue?: boolean
}

export enum AttachedType {
  NONE = 'none',
  CODE = 'code',
}

export interface Icomponent {
  item: IItem;
  config: Record<string, any>;
  sign: boolean;
  parent?: string
  setSign: (sign: boolean) => void;
  setConfig: (config: Record<string, any>) => void;
}
