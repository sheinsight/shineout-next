import { Steps } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Steps current={1} classNames={{ root: 'my-steps' }} styles={{ root: { padding: 16 } }}>
        <Steps.Step title='Completed' description='First step' styles={{ icon: { boxShadow: '0 0 0 2px #1890ff' } }} />
        <Steps.Step title='In Progress' description='Second step' styles={{ title: { fontWeight: 'bold', color: '#1890ff' } }} />
        <Steps.Step title='Waiting' description='Third step' />
      </Steps>
      <Steps current={2}>
        <Steps.Step
          title='Step 1'
          classNames={{
            step: ({ status }) => (status === 'finish' ? 'step-done' : ''),
            icon: ({ status }) => (status === 'finish' ? 'icon-done' : ''),
          }}
        />
        <Steps.Step title='Step 2' classNames={{ step: ({ status }) => (status === 'finish' ? 'step-done' : '') }} />
        <Steps.Step
          title='Step 3'
          classNames={{ step: ({ status }) => (status === 'process' ? 'step-active' : '') }}
          styles={{ title: { color: '#52c41a' } }}
        />
      </Steps>
    </div>
  );
}
