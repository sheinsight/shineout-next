import { Gap, Link } from 'shineout-v3';

export default function Demo() {
  return (
    <Gap column={24}>
      <Link href='#'>Link</Link>
      <Link href='#' underline>Link</Link>
      <Link href='#' underline='hover'>Link</Link>
    </Gap>
  );
}
