import { Skeleton } from 'antd';

export default function Demo() {
  return (
    <>
      <Skeleton
        loading
        active
        avatar={{ size: 48 }}
        title={false}
        paragraph={{ rows: 3, width: '100%' }}
        styles={{
          root: { padding: 16 },
          avatar: { borderRadius: 8 },
          paragraph: { marginTop: 8 },
        }}
      />
      <Skeleton.Button active style={{ marginTop: 16 }} />
    </>
  );
}
