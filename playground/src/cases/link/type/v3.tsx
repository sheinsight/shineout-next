import { Gap, Link } from 'shineout-v3';

export default function Demo() {
  return (
    <Gap column={24}>
      <Link href='#' type='primary'>Link</Link>
      <Link href='#' type='secondary'>Link</Link>
      <Link href='#' type='danger'>Link</Link>
      <Link href='#' type='warning'>Link</Link>
      <Link href='#' type='success'>Link</Link>
    </Gap>
  );
}
