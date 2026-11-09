import { Button } from 'antd-v5';

const row = { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 } as const;

export default function Demo() {
  return (
    <div>
      <div style={row}>
        <Button type='primary'>主要</Button>
        <Button>默认</Button>
        <Button color='primary' variant='outlined'>
          线框
        </Button>
        <Button color='primary' variant='text'>
          文字
        </Button>
        <Button type='primary' danger>
          危险
        </Button>
      </div>
      <div style={row}>
        <Button type='primary' size='small'>
          小
        </Button>
        <Button type='primary'>默认</Button>
        <Button type='primary' size='large'>
          大
        </Button>
      </div>
      <div style={row}>
        <Button type='primary' disabled>
          禁用
        </Button>
        <Button type='primary' loading>
          加载中
        </Button>
      </div>
    </div>
  );
}
