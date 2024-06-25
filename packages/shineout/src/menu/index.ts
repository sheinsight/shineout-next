import Menu from './menu';
import Search from './search';

type RefMenu = typeof Menu;
type RefSearch = typeof Search;

export interface SearchComponent extends RefSearch {
  displayName: string;
}

const SearchComp: SearchComponent = Search as SearchComponent;
SearchComp.displayName = 'ShineoutMenuSearch';

export interface MenuComponent extends RefMenu {
  displayName: string;
  Search: SearchComponent;
}

const MenuComp: MenuComponent = Menu as MenuComponent;

MenuComp.displayName = 'ShineoutMenu';
MenuComp.Search = SearchComp;

export default MenuComp;
