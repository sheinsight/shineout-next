import { deepMerge } from '../object';
import { ObjectType } from '../../common/type';
import { MessageType } from './rule.type';

export const typeMessage = (props: ObjectType) => {
  return props.title ? 'rules.type' : 'rules.reg';
};

const options = { skipUndefined: true };

export default (type: string, { message, tip }: { message?: MessageType; tip?: string } = {}) =>
  (msg: MessageType) =>
    deepMerge(
      {
        type,
        message: typeMessage,
      },
      deepMerge({ message, tip }, { message: msg }, options),
      options,
    );
