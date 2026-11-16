import { Typography } from 'antd';

const { Link } = Typography;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Link
        href='#'
        classNames={({ props }) => ({ root: (props as { disabled?: boolean }).disabled ? 'link link--disabled' : 'link' })}
      >
        Semantic Link
      </Link>
      <Link href='#' type='danger' styles={{ root: { fontWeight: 'bold' } }}>
        Styled Link
      </Link>
    </div>
  );
}
