import { useEffect } from 'react';
import Layout from './layout';
import { setToken } from '@sheinx/theme';

const App = () => {
  useEffect(() => {
    setToken({
      selector: 'body',
      tokenName: 'doc',
    });
  }, []);
  return <Layout></Layout>;
};

export default App;
