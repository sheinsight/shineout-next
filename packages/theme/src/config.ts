import Notification from './utils/notification';

interface ConfigOption {
  /**
   * @cn css 变量的固定前缀
   * @en The fixed prefix of the css variable
   * @default '--'
   */
  cssvarPrefix?: string;
  /**
   * @cn css 变量的前缀
   * @en The prefix of the css variable
   * @default 'soui'
   */
  prefix?: string;
}

export const noti = new Notification();

const config = {
  prefix: 'soui',
  cssvarPrefix: '--',
};

export type ObjectType<V = any> = { [name: string]: V };

export const entries = (obj: ObjectType) => {
  if (!obj) return [];
  const keys = Object.keys(obj);
  return keys.map((key) => [key, obj[key]]);
};

export function set<Key extends keyof ConfigOption>(name: Key, value: ConfigOption[Key]) {
  if (value !== undefined && name in config) config[name] = value;
  noti.dispatch(name);
}

export const setConfig = (options: Partial<ConfigOption>) => {
  for (const [key, value] of entries(options)) {
    set(key, value);
  }
};

export const getConfig = () => {
  return config;
};
