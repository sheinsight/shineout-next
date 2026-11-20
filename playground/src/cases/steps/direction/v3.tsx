import { Steps } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 500 }}>
      <div style={{ display: 'flex', gap: 32, marginBottom: 24, alignItems: 'flex-start' }}>
        <Steps current={1} direction='vertical'>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} direction='vertical'>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <Steps current={1} type='dot' direction='vertical'>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} type='dot' direction='vertical'>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
    </div>
  );
}
