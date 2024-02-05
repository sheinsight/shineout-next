import Cascader from './cascader';

type RefCascader = typeof Cascader;

export interface CascaderComponent extends RefCascader {
  displayName: string;
}

const CascaderComp: CascaderComponent = Cascader as CascaderComponent;

CascaderComp.displayName = 'ShineoutCascader';

export default CascaderComp;
