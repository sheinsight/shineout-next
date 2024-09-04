/**
 * cn - Group OnChange
 *    -- 被Checkbox.Group包裹的Checkbox的onChange依然能触发
 * en - Group OnChange
 *    -- The onChange of the Checkbox wrapped by Checkbox.Group can still be triggered
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => {
  const [checked, setChecked] = React.useState();

  console.log('useState checked: >>', checked);
  const handleChange = (v) => {
    setChecked(v)
  }
  return (
    <Checkbox.Group keygen>
      <Checkbox
        value={checked}
        onChange={handleChange}
      >
        {checked ? 'Checked' : 'Unchecked'}
      </Checkbox>
    </Checkbox.Group>
  );
};

export default App;
