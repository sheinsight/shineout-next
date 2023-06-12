/**
 * cn - ref
 *    --
 * en - ref
 *    --
 */

import { Input } from 'shineout';
export default () => {
  return (
    <Input
      placeholder='input something'
      forwardRef={(e) => {
        console.log('ref', e);
      }}
    />
  );
};
