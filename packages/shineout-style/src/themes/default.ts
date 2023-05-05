import deepMerge from 'ts-deepmerge';
const vars = {
  primary: '#197afa',
  white: '#fff',
  error: '#ff4d4f',
};

const inputBorder = {
  color: {
    background: {
      normal: vars.white,
      disabled: 'rgba(0,0,0,.04)',
    },
    border: {
      normal: '#cccfd7',
      disabled: '#d9d9d9',
      focus: vars.primary,
      error: vars.error,
    },
    text: {
      normal: '#333e59',
      disabled: 'rgba(0,0,0,.25)',
    },
  },
  radius: '4px',
  boxShadow: {
    focus: '0 0 0 2px rgba(5,145,255,.1)',
  },
};

const common = {
  size: {
    font: '14px',
    lineHeight: '1.42857143',
  },
  inputBorder: deepMerge({}, inputBorder) as typeof inputBorder,
  animate: {
    normal: {
      timer: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
      duration: `0.2s`,
    },
    zoomIn: {
      timer: `cubic-bezier(0.08, 0.82, 0.17, 1)`,
    },
    zoomOut: {
      timer: `cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
    },
  },
};

const inputTheme = {
  paddingX: '5px',
  paddingY: '8px',
};
const def = {
  components: {
    input: inputTheme,
  },
  common,
  vars,
};

export type DefTheme = typeof def;

export default def;
