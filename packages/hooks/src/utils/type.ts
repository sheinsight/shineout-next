import * as React from 'react';
import { ObjectType } from '../common/type';

export type EventHandlers = Record<string, React.EventHandler<any>>;

export interface RuleFunc<T = any> {
  (
    value: T | undefined,
    formValue: ObjectType,
    cb: (result: Error | true) => void,
  ): void | Promise<undefined>;
}
