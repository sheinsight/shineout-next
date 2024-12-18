import { useEffect } from 'react';
import Layout from './layout';
import { setToken } from 'shineout';

const App = () => {
  useEffect(() => {
    setToken({
      selector: '.custom-header',
      token: {
        'Brand-6': 'Success-5',
      },
    });
  }, []);

  return <Layout></Layout>;
};

export default App;
