import { Image } from 'shineout-v3';
import { IMG } from '../_shared/images';

const FITS = ['fill', 'center', 'fit', 'stretch'] as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {FITS.map((fit) => (
        <div key={fit} style={{ display: 'flex', flexDirection: 'column' }}>
          <Image fit={fit} width={128} height={128} src={IMG} />
          <div style={{ textAlign: 'center', color: '#141737', fontSize: 12, marginTop: 5 }}>{fit}</div>
        </div>
      ))}
    </div>
  );
}
