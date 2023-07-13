import { deepMerge } from '../object';
import { ObjectType } from '../../common/type';
import { MessageType } from './rule.type';

const options = { skipUndefined: true };

export const requiredMessage = (props: ObjectType) => {
  const type = props.type === 'array' ? 'array' : 'string';
  return `$rules.required.${type}`;
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
