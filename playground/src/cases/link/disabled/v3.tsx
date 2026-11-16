import { Gap, Link } from 'shineout-v3';

export default function Demo() {
  return (
    <Gap column={24}>
      <Link href='#' type='primary' disabled>Link</Link>
      <Link href='#' type='secondary' disabled>Link</Link>
      <Link href='#' type='danger' disabled>Link</Link>
      <Link href='#' type='warning' disabled>Link</Link>
      <Link href='#' type='success' disabled>Link</Link>
    </Gap>
  );
}
