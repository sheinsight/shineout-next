import { deepMerge } from '../object';
import { MessageType } from './rule.type';

const options = { skipUndefined: true };

export default ({ message }: { message?: MessageType } = {}) =>
  (regExp: string | RegExp, msg?: MessageType) => {
    if (typeof regExp !== 'string' && !(regExp instanceof RegExp)) {
      console.error(
        new Error(`Rule "reg" param expect a RegExp object or a string, get ${typeof regExp}`),
      );
      return null;
    }
    return deepMerge(
      { message: '$rules.reg' },
      deepMerge({ message, regExp }, { message: msg }, options),
      options,
    );
  };
