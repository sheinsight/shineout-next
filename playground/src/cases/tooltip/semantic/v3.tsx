import { Tooltip } from 'shineout-v3';

export default function Demo() {
  return (
    <Tooltip
      tip='Static className on arrow & content'
      trigger='hover'
      classNames={{ arrow: 'my-tooltip-arrow' }}
      styles={{ content: { padding: 16 } }}
    >
      <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>Static classNames</span>
    </Tooltip>
  );
}
