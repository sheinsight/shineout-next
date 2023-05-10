import React from 'react';

export type ObjectType<V = any> = Record<string, V>;
export type HandlerType = Record<string, React.EventHandler<any> | undefined>;

export type AddNoProps<A, B> = Omit<B, keyof A> & A;

export type ValueOf<T> = T[keyof T];
