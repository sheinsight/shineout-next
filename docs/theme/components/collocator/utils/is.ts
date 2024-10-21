export type ObjectType<V = any> = Record<string, V>;

export const isArray = (data: any) => data && Array.isArray(data) && data.length;

export const isBoolean = (val: unknown): val is boolean =>
  val instanceof Boolean || typeof val === 'boolean';

export const isObject = (val: unknown): val is ObjectType =>
  !!val && typeof val === 'object' && !isArray(val);
