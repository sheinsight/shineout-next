import Token from '../token/token';

const initTheme = () => {
  const style = document.createElement('style');

  const innerText = Object.keys(Token)
    .map((value) => {
      return `--${value.toLocaleLowerCase()}:${Token[value]}`;
    })
    .join(';');

  style.setAttribute('type', 'text/css');
  style.innerText = `body {${innerText}}`;
  document.head.appendChild(style);
};

export default initTheme;
