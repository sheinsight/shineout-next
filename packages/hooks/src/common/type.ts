import React from 'react';

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type ObjectType<V = any> = Record<string, V>;
export type HandlerType = Record<string, React.EventHandler<any> | undefined>;

export type AddNoProps<A, B> = Omit<B, keyof A> & A;

export type ValueOf<T> = T[keyof T];

export type ObjectKey<T = any> = T extends ObjectType ? keyof T & string : never;

export type KeygenResult = string | number;

export type KeygenType<DataItem> =
  | ObjectKey<DataItem>
  | ((data: DataItem, index?: number) => KeygenResult)
  | true;
export type StructKeygenType<DataItem> =
  | ObjectKey<DataItem>
  | ((data: DataItem, index?: number) => KeygenResult);

// 将可选属性转化为必选属性但是可以是undefined
type OptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T];

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

export type OptionalToRequired<T> = {
  [K in OptionalKeys<T>]-?: T[K] | undefined;
} & {
  [K in RequiredKeys<T>]: T[K];
};

export type StructKeygenStringType<DataItem> =
  | ObjectKey<DataItem>
  | ((data: DataItem, index: string) => KeygenResult);
