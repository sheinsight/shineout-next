import { Steps } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} type='dot' style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Complete information' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps current={1} type='dot' style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Complete information' description='Please fill in your home address and phone number' />
        <Steps.Step title='Pending' description='This is a description' />
      </Steps>
    </div>
  );
}
