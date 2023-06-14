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

type Doc = 'shineout' | 'ui';

interface State {
  menu: Menus[];
  locales: 'cn' | 'en';
  doc: 'shineout' | 'ui';
  rtl: boolean;
  env: 'GitHub' | 'SHEIN';
}

const regex = /(?<=\/\w+\/component\/)\w+/;

const state: State = {
  menu: [],
  locales: 'cn',
  doc: (window.location.hash.match(regex)?.[0] as Doc) || 'shineout',
  rtl: false,
  env: 'SHEIN',
};

const proxyState = proxy(state);

export default proxyState;
