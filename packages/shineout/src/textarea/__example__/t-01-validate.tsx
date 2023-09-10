/**
 * cn - Rules
 *   --
 * en - Rules
 *    --
 */
import { Rule, Textarea } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Textarea
      rules={[rule.required('必填')]}
      tip={'input something'}
      placeholder='input something'
    />
  );
};
