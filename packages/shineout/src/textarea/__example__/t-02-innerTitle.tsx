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
      rows={1}
      innerTitle={'hello world'}
      rules={[rule.required('必填')]}
      placeholder='input something'
    />
  );
};
