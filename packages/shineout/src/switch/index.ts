import ISwitch from './switch';

type RefSwitch = typeof ISwitch;

export interface SwitchComponent extends RefSwitch {
  displayName: string;
}

const SwitchComp: SwitchComponent = ISwitch as SwitchComponent;

SwitchComp.displayName = 'ShineoutSwitch';

export default SwitchComp;
