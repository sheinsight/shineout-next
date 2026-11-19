import { Skeleton } from 'shineout-v3';

const style = { marginTop: 32, marginBottom: 16 };

export default function Demo() {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>文本</p>
      <Skeleton loading text={{ rows: 1 }}>I am the content after loading. </Skeleton>

      <p style={style}>段落</p>
      <Skeleton loading text={{ rows: 3, width: '70%' }}>I am the content after loading. </Skeleton>

      <p style={style}>头像</p>
      <Skeleton loading text={false} image={{ size: 'large' }}>I am the content after loading. </Skeleton>

      <p style={style}>图片</p>
      <Skeleton loading text={false} image={{ shape: 'square', size: 'large' }}>I am the content after loading. </Skeleton>

      <p style={style}>按钮</p>
      <Skeleton loading text={false} button>I am the content after loading. </Skeleton>
    </div>
  );
}
