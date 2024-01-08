import ReactDOM from 'react-dom/client';
import App from './theme/index';
import { setConfig } from 'shineout';

const app = document.getElementById('app');
setConfig({
  popupContainer: () => document.getElementById('layout'),
});

if (app) {
  const root = ReactDOM.createRoot(app);
  root.render(<App></App>);
}
