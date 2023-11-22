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

export type StructKeygenStringType<DataItem> =
  | ObjectKey<DataItem>
  | ((data: DataItem, index: string) => KeygenResult);

export type OptionalKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never;
}[keyof T];

export type OptionalToRequired<T> = {
  [P in OptionalKeys<T>]: T[P] | undefined;
} & {
  [P in Exclude<keyof T, OptionalKeys<T>>]: T[P];
};
