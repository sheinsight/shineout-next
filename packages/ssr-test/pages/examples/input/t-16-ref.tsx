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
      width={300}
      placeholder='input something'
      forwardRef={(e) => {
        console.log('ref', e);
      }}
    />
  );
};
