import { Skeleton } from 'antd';

const style = { marginTop: 32, marginBottom: 16 };

export default function Demo() {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>文本</p>
      <Skeleton loading title={false} paragraph={{ rows: 1, width: '100%' }}>I am the content after loading. </Skeleton>

      <p style={style}>段落</p>
      <Skeleton loading title={false} paragraph={{ rows: 3, width: '70%' }}>I am the content after loading. </Skeleton>

      <p style={style}>头像</p>
      <Skeleton loading title={false} paragraph={false} avatar={{ size: 64 }}>I am the content after loading. </Skeleton>

      <p style={style}>图片</p>
      <Skeleton loading title={false} paragraph={false} avatar={{ shape: 'square', size: 64 }}>I am the content after loading. </Skeleton>

      <p style={style}>按钮</p>
      <Skeleton.Button />
    </div>
  );
}
