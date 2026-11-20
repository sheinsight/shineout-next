import { Steps } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps size='small' current={1} style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps current={1} style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps size='large' current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
}
