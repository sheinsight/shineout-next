/**
 * cn - delay
 *    -- delay=300
 */

import { Input } from 'shineout';

export default () => {
  return <Input placeholder='input something' delay={300} onChange={(d) => console.log(d)} />;
};
