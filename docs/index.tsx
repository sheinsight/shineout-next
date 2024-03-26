import ReactDOM from 'react-dom/client';
import App from './theme/index';
import { setJssConfig } from '@sheinx/shineout-style';

if (process.env.NODE_ENV === 'development') {
  const camelToDash = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

  setJssConfig({
    generateId: (rule: any, sheet: any) => {
      const options = sheet.options;
      const ns = options.classNamePrefix;
      if (!ns) {
        console.warn('[sheinx/base]: styled should give namespace');
      }
      const prefix = 'soui-';
      return `${prefix}${ns}${camelToDash(rule.key)}`;
    },
  });
}

const app = document.getElementById('app');
if (app) {
  const root = ReactDOM.createRoot(app);
  root.render(<App></App>);
}
