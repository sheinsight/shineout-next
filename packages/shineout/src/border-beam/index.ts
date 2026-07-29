import BorderBeam from './border-beam';

type RefBorderBeam = typeof BorderBeam;

export interface BorderBeamComponent extends RefBorderBeam {
  displayName: string;
}

const BorderBeamComp: BorderBeamComponent = BorderBeam as BorderBeamComponent;

BorderBeamComp.displayName = 'ShineoutBorderBeam';

export default BorderBeamComp;
