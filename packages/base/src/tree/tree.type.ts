export interface TreeClasses {
  tree: string;
  line: string;
}

export interface TreeProps {
  jssStyle?: {
    tree: TreeClasses;
  };
  data: any[];
  childrenKey?: string;
  active?: string | number;
}
