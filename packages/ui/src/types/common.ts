import { CSSProperties } from 'react';

export type TransType<T> = {
  [P in keyof T]: T[P] extends string
    ? string | number
    : T[P] extends number
    ? string | number
    : TransType<T[P]>;
};

export type CompStyle<CreateStyle extends (...args: any) => any> = TransType<
  ReturnType<CreateStyle>
>;

export interface CommonType {
  status?: 'error';
  className?: string;
  style?: CSSProperties;
}
