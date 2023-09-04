import { BaseTreeProps } from '@sheinx/hooks';

export interface TreeClasses {
  tree: string;
  root: string;
  line: string;
}

export interface TreeProps extends BaseTreeProps {
  jssStyle?: {
    tree: TreeClasses;
  };
  data: any[];
  active?: string | number;
}
