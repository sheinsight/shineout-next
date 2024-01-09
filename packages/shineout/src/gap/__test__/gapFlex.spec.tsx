import { render } from '@testing-library/react';
import { Gap, Button } from 'shineout';
import { styleTest } from '../../tests/utils';

const GapDemo = (props: any) => (
  <Gap style={{ width: 400 }} {...props}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Button key={i} type='primary'>
        Item
        {i}
      </Button>
    ))}
  </Gap>
);

const defaultFlexGapStyle =
  'display: flex; flex-direction: row; flex-wrap: wrap; row-gap: 8px; column-gap: 8px; width: 400px;';
describe('Gap[FlexGap]', () => {
  test('should render when supportFlexGap', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 1 });
    const { container } = render(<GapDemo className='demo' />);
    styleTest(container.querySelector('.demo')!, defaultFlexGapStyle);
  });
});
