import type { Theme } from './type';

const basic: Theme['basic'] = {
  color: {
    secondaryText: '#767676',
    secondaryText2: '#959595',
    secondaryText3: '#98A2B3',
    primaryText: '#fff',
    primary2: '#222222',
    primary: '#222222',
    primaryActive: '#616161',
    text: '#222',
    background: '#fff',
    border: '#ccc',
    active: '#f2f3f5',
    warning: '#FF323D',
    disabledBackground: '#ebedf0',
    disabledText: '#c8c9cc',
    mask: `rgba(75, 76, 78, 0.3)`,
  },
  borderRadius: {
    md: 8,
    sm: 0,
    lg: 16,
    round: 99,
  },
  size: {
    font: {
      md: 14,
      sm: 12,
      xs: 10,
      lg: 16,
    },
  },
  weight: {
    bold: {
      family: '',
      value: 500,
    },
  },
  padding: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
  },
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

const def: Theme = {
  components: {
    input: {
      color: {
        background: '#F6F6F6',
        placeholder: '#bbb',
      },
      size: {
        font: basic.size.font.lg,
        padding: {
          v: 14,
          h: 12,
        },
        height: 44,
      },
      borderRadius: basic.borderRadius.md,
      groupRadius: basic.borderRadius.md,
    },
  },
  basic,
};

export default def;
