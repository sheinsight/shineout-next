import { useOutlet } from 'dumi';
import { StyleProvider } from '../../../packages/shineout-style/src';

export default () => {
  const outlet = useOutlet();

  return <StyleProvider>{outlet}</StyleProvider>;
};
