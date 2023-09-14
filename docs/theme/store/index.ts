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

export type ScrollType = 'visible' | 'hidden' | 'sticky';

export type Doc = 'shineout' | 'base';
export type Locales = 'cn' | 'en';
export type Env = 'GitHub' | 'SHEIN';
export type DocType = 'examples' | 'api' | 'guide' | 'changelog';

interface State {
  menu: Menus[];
  locales: Locales;
  doc: Doc;
  doctab: DocType;
  rtl: boolean;
  env: Env;
  scroll: boolean;
  activeAnchor: string;
  locked: boolean;
}

const regex = new RegExp(`component/(.*?)/`, 'i');
const state: State = {
  menu: [],
  locales: 'cn',
  doc: (window.location.hash.match(regex)?.[1] as Doc) || 'shineout',
  doctab: 'examples',
  rtl: false,
  env: 'SHEIN',
  scroll: false,
  activeAnchor: '',
  locked: false,
};

const proxyState = proxy(state);

export const dispatch = {
  setMenu: () => {
    const menus: Menus[] = [];

    const context = require(`chunk/${proxyState.doc}/index.ts`);
    const files = context.files as string[];
    files
      .filter((f) => f !== 'api')
      .forEach((file) => {
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
  setDoctab: (doctab: DocType) => {
    proxyState.doctab = doctab;
  },
  setScroll: (scroll: boolean) => {
    proxyState.scroll = scroll;
  },
  setLocked: (locked: boolean) => {
    proxyState.locked = locked;
  },
  setActiveAnchor: (anchor: string, lock: boolean = false) => {
    if (lock) {
      proxyState.locked = true;
    }
    if (proxyState.locked === true && lock === false) {
      return;
    }
    proxyState.activeAnchor = anchor;
  },
};

export default proxyState;
