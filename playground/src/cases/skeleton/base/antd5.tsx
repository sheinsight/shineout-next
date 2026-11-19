import { Skeleton } from 'antd-v5';

export default function Demo() {
  return (
    <Skeleton loading title={false} paragraph={{ rows: 3, width: '100%' }}>
      <div>I am the content after loading. I am the content after loading. I am the content after loading. </div>
    </Skeleton>
  );
}
