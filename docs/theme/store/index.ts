import { proxy } from 'valtio';

export interface Menu {
  group?: string;
  name: string;
  title: {
    en: string;
    cn: string;
  };
}

export interface Menus {
  group: string;
  components: Menu[];
}

interface State {
  menu: Menus[];
  locales: 'cn' | 'en';
  rtl: boolean;
}

const state: State = {
  menu: [],
  locales: 'cn',
  rtl: false,
};

export default proxy(state);
