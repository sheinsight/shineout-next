import { deepMerge } from '../object';
import { MessageType } from './rule.type';
import { devUseWarning } from '../warning';

const options = { skipUndefined: true };

export default ({ message }: { message?: MessageType } = {}) =>
  (regExp: string | RegExp, msg?: MessageType) => {
    if (typeof regExp !== 'string' && !(regExp instanceof RegExp)) {

      devUseWarning.error(`Rule "reg" param expect a RegExp object or a string, get ${typeof regExp}`)

      return null;
    }
    return deepMerge(
      { message: '$rules.reg' },
      deepMerge({ message, regExp }, { message: msg }, options),
      options,
    );
  };
