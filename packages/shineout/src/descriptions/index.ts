import Descriptions from './descriptions';

type RefDescriptions = typeof Descriptions;

export interface DescriptionsComponent extends RefDescriptions {
  displayName: string;
}

const DescriptionsComp: DescriptionsComponent = Descriptions as DescriptionsComponent;

DescriptionsComp.displayName = 'ShineoutDescriptions';

export default DescriptionsComp;
