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
type Locales = 'cn' | 'en';
type Env = 'GitHub' | 'SHEIN';

interface State {
  menu: Menus[];
  locales: Locales;
  doc: Doc;
  rtl: boolean;
  env: Env;
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

export const dispatch = {
  setMenu: (menu: Menus[]) => {
    proxyState.menu = menu;
  },
  setLocales: (locales: Locales) => {
    proxyState.locales = locales;
  },
  setDoc: (doc: Doc) => {
    proxyState.doc = doc;
  },
  setRtl: (rtl: boolean) => {
    proxyState.rtl = rtl;
  },
  setEnv: (env: Env) => {
    proxyState.env = env;
  },
};

export default proxyState;
