import ReactDOM from 'react-dom/client';
import App from './theme/index';
import { setConfig } from 'shineout';
import { setJssConfig } from '@sheinx/shineout-style';
import './index.css'

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

const search = window.location.href.split('?')[1];
const params = new URLSearchParams(search);
const direction = params.get('direction') === 'rtl' ? 'rtl' : 'ltr';
setConfig({ direction });
document.body.className = direction;

const app = document.getElementById('app');

// import ReactDOM from 'react-dom';
// ReactDOM.render(<App></App>, app);
// @ts-ignore
if (app && !window.__ALITA__) {
  const root = ReactDOM.createRoot(app);
  root.render(<App></App>);
}
