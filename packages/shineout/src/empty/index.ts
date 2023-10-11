import Empty from './empty';

type RefEmpty = typeof Empty;

export interface EmptyComponent extends RefEmpty {
  displayName: string;
}

const EmptyComp: EmptyComponent = Empty as EmptyComponent;

EmptyComp.displayName = 'ShineoutEmpty';

export default EmptyComp;
