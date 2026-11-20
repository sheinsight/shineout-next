import { Skeleton } from 'shineout-v3';

const style = { marginTop: 32, marginBottom: 16 };

export default function Demo() {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>头像 + 文本</p>
      <Skeleton loading text={{ rows: 5, width: '70%' }} image={{ size: 'large' }} style={{ marginBottom: 32 }}>I am the content after loading. </Skeleton>
      <Skeleton loading text={{ rows: 3, width: '70%' }} image={{ size: 'large' }}>I am the content after loading. </Skeleton>

      <p style={style}>图片 + 文本 + 按钮</p>
      <Skeleton loading text={{ rows: 5, width: '70%' }} image={{ shape: 'square', size: 'large' }} style={{ marginBottom: 32 }}>I am the content after loading. </Skeleton>
      <Skeleton loading text={{ rows: 5, width: '70%' }} image={{ shape: 'square', size: 'large' }} button={{ count: 2 }}>I am the content after loading. </Skeleton>
    </div>
  );
}
