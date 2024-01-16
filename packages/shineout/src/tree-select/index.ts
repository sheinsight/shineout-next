import TreeSelect from './tree-select';

type RefTreeSelect = typeof TreeSelect;

export interface TreeSelectComponent extends RefTreeSelect {
  displayName: string;
}

const TreeSelectComp: TreeSelectComponent = TreeSelect as TreeSelectComponent;

TreeSelectComp.displayName = 'ShineoutTreeSelect';

export default TreeSelectComp;
