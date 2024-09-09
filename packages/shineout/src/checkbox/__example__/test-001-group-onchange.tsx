/**
 * cn - Group OnChange
 *    -- 被Checkbox.Group包裹的Checkbox的onChange依然能触发
 * en - Group OnChange
 *    -- The onChange of the Checkbox wrapped by Checkbox.Group can still be triggered
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => {
  const [myState, setMyState] = React.useState();

  console.log('myState: >>', myState);
  const handleChange = (value, checked, raw) => {
    console.log('value, checked, raw: >>', value, checked, raw)
    setMyState(value)
  }
  return (
    <Checkbox.Group keygen>
      <Checkbox
        value={myState}
        onChange={handleChange}
        htmlValue="htmlValue"
      >
        {myState ? 'Checked' : 'Unchecked'}
      </Checkbox>
    </Checkbox.Group>
  );
};

export default App;
