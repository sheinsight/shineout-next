import { Steps } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Steps
        current={1}
        classNames={{ root: 'my-steps' }}
        styles={{ root: { padding: 16 } }}
        items={[
          { title: 'Completed', content: 'First step', styles: { icon: { boxShadow: '0 0 0 2px #1890ff' } } },
          { title: 'In Progress', content: 'Second step', styles: { title: { fontWeight: 'bold', color: '#1890ff' } } },
          { title: 'Waiting', content: 'Third step' },
        ]}
      />
      <Steps
        current={2}
        items={[
          { title: 'Step 1', classNames: { root: 'step-done', icon: 'icon-done' } },
          { title: 'Step 2', classNames: { root: 'step-done' } },
          { title: 'Step 3', classNames: { root: 'step-active' }, styles: { title: { color: '#52c41a' } } },
        ]}
      />
    </div>
  );
}
