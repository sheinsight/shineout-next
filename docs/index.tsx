import ReactDOM from 'react-dom/client';
import App from './theme/index.tsx';
import 'prismjs/components/prism-jsx';

const app = document.getElementById('app');

if (app) {
  const root = ReactDOM.createRoot(app);
  root.render(<App></App>);
}
