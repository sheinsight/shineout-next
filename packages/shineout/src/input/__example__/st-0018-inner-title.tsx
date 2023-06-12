/**
 * cn - innerTitle
 *    --
 * en - innerTitle
 *    --
 */

import { Input } from 'shineout';
export default () => {
  return (
    <div>
      <Input placeholder='small' innerTitle={'hello world'} clearable size={'small'} />
      <Input placeholder='default' innerTitle={'hello world'} clearable />
      <Input placeholder='large' innerTitle={'hello world'} clearable size={'large'} />
    </div>
  );
};
