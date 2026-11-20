import { Tooltip } from 'antd';

export default function Demo() {
  return (
    <Tooltip
      title='Static className on arrow & content'
      trigger='hover'
      classNames={{ arrow: 'my-tooltip-arrow' }}
      styles={{ container: { padding: 16 } }}
    >
      <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>Static classNames</span>
    </Tooltip>
  );
}
