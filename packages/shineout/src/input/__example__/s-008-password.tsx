import React from 'react';
import { Input, Form } from 'shineout';

const App: React.FC = () => (
  <Form>
    <Input.Password name={'password'} placeholder='input password' />
  </Form>
);

export default App;
