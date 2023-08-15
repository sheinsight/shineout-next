import Switch from './switch';

type RefSwitch = typeof Switch;

export interface SwitchComponent extends RefSwitch {
  displayName: string;
}

const SwitchComp: SwitchComponent = Switch as SwitchComponent;

SwitchComp.displayName = 'ShineoutSwitch';

export default SwitchComp;
