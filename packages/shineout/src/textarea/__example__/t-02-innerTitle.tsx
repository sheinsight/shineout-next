/**
 * cn - innerTitle
 *   --
 * en - innerTitle
 *    --
 */
import { Rule, Textarea } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Textarea
      rows={3}
      innerTitle={'hello world'}
      rules={[rule.required('必填')]}
      tip={'input something'}
      placeholder='input something'
    />
  );
};
