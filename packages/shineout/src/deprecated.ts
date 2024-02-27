export const color: any = {
  danger: 'rgb(255, 77, 80)',
  gray100: 'rgb(244, 245, 248)',
  gray200: 'rgb(232, 235, 240)',
  gray300: 'rgb(204, 207, 215)',
  gray400: 'rgb(179, 183, 193)',
  gray500: 'rgb(153, 157, 168)',
  gray600: 'rgb(102, 108, 124)',
  gray700: 'rgb(51, 62, 89)',
  gray800: 'rgb(20, 23, 55)',
  gray900: 'rgb(2, 11, 24)',
  infoColor: 'rgb(24, 144, 255)',
  primary: 'rgb(44, 95, 193)',
  secondary: 'rgb(51, 62, 89)',
  setColor: (e) => {
    console.warn('shineout: color.setColor is deprecated');
  },
  success: 'rgb(82, 196, 26)',
  warning: 'rgb(255, 140, 0)',
};
export const style: any = {
  getClassName: () => {
    console.warn('shineout: style.getClassName is deprecated');
  },
  setStyle: () => {
    console.warn('shineout: style.getClassName is deprecated');
    return () => {};
  },
  cleanCache: () => {
    console.warn('shineout: style.getClassName is deprecated');
  },
  setInjectType: () => {
    console.warn('shineout: style.getClassName is deprecated');
  },
  getInjectType: () => {
    console.warn('shineout: style.getClassName is deprecated');
  },
};
