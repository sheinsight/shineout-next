import { Link } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Link
        href='#'
        icon
        classNames={{
          root: ({ disabled }) => (disabled ? 'link link--disabled' : 'link'),
          icon: 'link-icon',
        }}
        styles={{ icon: { marginRight: 8 } }}
      >
        Semantic Link
      </Link>
      <Link href='#' type='danger' styles={{ root: { fontWeight: 'bold' } }}>
        Styled Link
      </Link>
    </div>
  );
}
