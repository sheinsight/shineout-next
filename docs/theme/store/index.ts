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

export type Doc = 'shineout' | 'base';
export type Locales = 'cn' | 'en';
export type Env = 'GitHub' | 'SHEIN';

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
  setMenu: () => {
    const menus: Menus[] = [];

    const context = require(`chunk/${proxyState.doc}/index.ts`);
    const files = context.files as string[];
    files.forEach((file) => {
      const menu: Menu = {
        name: '',
        title: {
          en: '',
          cn: '',
        },
      };
      const component = require(`chunk/${proxyState.doc}/${file}`);
      const group = menus.find((item) => item.group === component.header.group);
      if (!group) {
        menus.push({
          group: component.header.group,
          components: [],
        });
      }
      menu.group = component.header.group;
      menu.name = component.header.name;
      menu.title = component.title;
      menus.find((item) => item.group === component.header.group)?.components.push(menu);
    });
    proxyState.menu = menus;
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
