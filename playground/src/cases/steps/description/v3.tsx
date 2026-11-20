import { Steps } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
      </Steps>
    </div>
  );
}
