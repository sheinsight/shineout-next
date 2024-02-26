import ReactDOM from 'react-dom/client';
import App from './theme/index';
import { setJssConfig } from 'shineout';

if (process.env.NODE_ENV === 'development') {
  const camelToDash = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

  setJssConfig({
    generateId: (rule: any, sheet: any) => {
      const options = sheet.options;
      const ns = options.classNamePrefix;
      if (!ns) {
        console.warn('[sheinx/base]: styled should give namespace');
      }
      const prefix = 'so-';
      return `${prefix}${ns}${camelToDash(rule.key)}`;
    },
  });
}

const app = document.getElementById('app');

if (app) {
  const root = ReactDOM.createRoot(app);
  root.render(<App></App>);
}
