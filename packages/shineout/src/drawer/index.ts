import Drawer from './drawer';
import Modal from '../modal';

type RefDrawer = typeof Drawer;

export interface DrawerComponent extends RefDrawer {
  displayName: string;
  Submit: typeof Modal.Submit;
}

const DrawerComp: DrawerComponent = Drawer as DrawerComponent;

DrawerComp.displayName = 'ShineoutDrawer';
DrawerComp.Submit = Modal.Submit;

export default DrawerComp;
