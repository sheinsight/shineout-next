import Token from '../token/token';
import { Tokens } from '../token/type';
import { prefix, replaceNonAlphanumeric } from '../utils/css-var';

export interface Props {
  target: string | HTMLElement | null | undefined;
  selector?: string;
}

const extraToken = [
  `--primary-color: var(--${prefix}-brand-6)`,
  `--gray-500: var(--${prefix}-neutral-6)`,
  `--primary-color-fade-50: rgba(25,122,250,0.5)`,
];

const setToken = (props: Props) => {
  const { target, selector = 'body' } = props;

  let dom: HTMLElement | null = null;

  if (!target) {
    // 警告：target 不能为空，请提供合法的目标元素
    console.warn('[theme] Target cannot be empty, please provide a valid target element');
    return;
  }

  if (typeof target === 'string') {
    if (target.indexOf('#') === -1) {
      // 警告：请提供合法的 id 选择器
      console.warn('[theme] Please provide a valid id selector');
      return;
    }

    dom = document.querySelector(target);

    if (!dom) {
      // 警告：未找到目标元素，请检查 id 是否正确
      console.warn('[theme] Target element not found, please check if the id is correct');
      return;
    }
  }

  if (target instanceof HTMLElement) {
    dom = target;
  }
  const tokens: string[] = [];
  Object.keys(Token).forEach((key: string) => {
    const token = `--${prefix}-${replaceNonAlphanumeric(key)}:${Token[key as keyof Tokens]}`;
    tokens.push(token);
  });
  if (dom) {
    dom.innerHTML = `${selector} {${tokens.concat(extraToken).join(';')}}`;
  }
};

export default setToken;
