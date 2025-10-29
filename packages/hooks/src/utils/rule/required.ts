import { getLocale, config } from '@sheinx/base';
import { deepMerge } from '../object';
import { ObjectType } from '../../common/type';
import { MessageType } from './rule.type';
import { substitute } from '../string';

const options = { skipUndefined: true };

export const requiredMessage = (props: ObjectType) => {
  const type = props.type === 'array' ? 'array' : 'string';
  return substitute(getLocale(config.locale, `rules.required.${type}`), props)
};
export default ({ message }: { message?: MessageType } = {}) =>
  (msg: MessageType) =>
    deepMerge(
      {
        required: true,
        message: requiredMessage,
      },
      deepMerge({ message }, { message: msg }, options),
      options,
    );
