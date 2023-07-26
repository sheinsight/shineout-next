import ReactDOM from 'react-dom/client';
import App from './theme/index.tsx';
import { setConfig } from 'shineout';

const app = document.getElementById('app');
setConfig({
  popupContainer: () => app!,
});

if (app) {
  const root = ReactDOM.createRoot(app);
  root.render(<App></App>);
}
