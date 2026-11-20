import { Input } from 'shineout-v3';

export default function Demo() {
  return (
    <Input.Password
      width={300}
      name='password'
      defaultValue='12312312312321312321312'
      placeholder='input password'
      visibilityToggle
      clearable
    />
  );
}
