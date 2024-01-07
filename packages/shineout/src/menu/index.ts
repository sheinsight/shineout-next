import Menu from './menu';

type RefMenu = typeof Menu;

export interface MenuComponent extends RefMenu {
  displayName: string;
}

const MenuComp: MenuComponent = Menu as MenuComponent;

MenuComp.displayName = 'ShineoutMenu';

export default MenuComp;
