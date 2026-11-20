import { Skeleton, Space } from 'antd-v5';

const style = { marginTop: 32, marginBottom: 16 };

export default function Demo() {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>头像 + 文本</p>
      <Skeleton loading title={false} paragraph={{ rows: 5, width: '70%' }} avatar={{ size: 64 }} style={{ marginBottom: 32 }}>I am the content after loading. </Skeleton>
      <Skeleton loading title={false} paragraph={{ rows: 3, width: '70%' }} avatar={{ size: 64 }}>I am the content after loading. </Skeleton>

      <p style={style}>图片 + 文本 + 按钮</p>
      <Skeleton loading title={false} paragraph={{ rows: 5, width: '70%' }} avatar={{ shape: 'square', size: 64 }} style={{ marginBottom: 32 }}>I am the content after loading. </Skeleton>
      <Skeleton loading title={false} paragraph={{ rows: 5, width: '70%' }} avatar={{ shape: 'square', size: 64 }}>I am the content after loading. </Skeleton>
      <Space style={{ marginTop: 8 }}>
        <Skeleton.Button />
        <Skeleton.Button />
      </Space>
    </div>
  );
}
