import { StyleProvider } from '../../../packages/view';
import { useOutlet } from 'dumi';

export default () => {
  const outlet = useOutlet();

  return <StyleProvider>{outlet}</StyleProvider>;
};
