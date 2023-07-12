/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import { Button } from 'shineout';
export default () => {
  return (
    <div>
      <div>shineout</div>
      <div>
        <Button>Default</Button>

        <Button type='primary'>Primary</Button>
        <Button type='success'>Success</Button>
        <Button type='danger'>Danger</Button>
        <Button type='warning'>Warning</Button>
        <Button type='secondary'>Secondary</Button>
      </div>
    </div>
  );
};
