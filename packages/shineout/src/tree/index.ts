import Tree from './tree';

type RefTree = typeof Tree;

export interface TreeComponent extends RefTree {
  displayName: string;
}

(Tree as TreeComponent).displayName = 'ShineoutTree';

export default Tree as TreeComponent;
