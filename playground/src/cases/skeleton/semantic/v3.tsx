import { Skeleton } from 'shineout-v3';

export default function Demo() {
  return (
    <Skeleton
      loading
      animation
      image
      button
      styles={{
        root: { padding: 16 },
        image: { borderRadius: 8 },
        text: { marginTop: 8 },
        button: { marginTop: 16 },
      }}
    />
  );
}
