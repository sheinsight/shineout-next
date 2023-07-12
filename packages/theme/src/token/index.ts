import { cssvar } from '../utils/css-var';

export interface Token {
  name: string;
  type: string;
  value: string;
  describe: string;
}

export type TokenKeys = keyof typeof Tokens;

const Tokens = {
  'Success-1': {
    type: 'color',
    name: '成功色',
    value: '#F1FAEB',
    describe: '浅色背景',
  },
  'Success-2': {
    type: 'color',
    name: '成功色',
    value: '#DFF6C3',
    describe: '聚焦',
  },
  'Success-3': {
    type: 'color',
    name: '成功色',
    value: '#C2E999',
    describe: '禁用',
  },
  'Success-4': {
    type: 'color',
    name: '成功色',
    value: '#90D959',
    describe: '悬浮',
  },
  'Success-5': {
    type: 'color',
    name: '成功色',
    value: '#74D13D',
    describe: '常规',
  },
  'Success-6': {
    type: 'color',
    name: '成功色',
    value: '#62B237',
    describe: '点击',
  },
  'Warning-1': {
    type: 'color',
    name: '警告色',
    value: '#FFF6EB',
    describe: '浅色背景',
  },
  'Warning-2': {
    type: 'color',
    name: '警告色',
    value: '#FDE5B5',
    describe: '聚焦',
  },
  'Warning-3': {
    type: 'color',
    name: '警告色',
    value: '#FDD18B',
    describe: '禁用',
  },
  'Warning-4': {
    type: 'color',
    name: '警告色',
    value: '#FDA344',
    describe: '悬浮',
  },
  'Warning-5': {
    type: 'color',
    name: '警告色',
    value: '#F7862A',
    describe: '常规',
  },
  'Warning-6': {
    type: 'color',
    name: '警告色',
    value: '#CC641F',
    describe: '点击',
  },
  'Danger-1': {
    type: 'color',
    name: '危险色',
    value: '#FFEDED',
    describe: '浅色背景',
  },
  'Danger-2': {
    type: 'color',
    name: '危险色',
    value: '#FFD7CF',
    describe: '聚焦',
  },
  'Danger-3': {
    type: 'color',
    name: '危险色',
    value: '#FFBBB1',
    describe: '禁用',
  },
  'Danger-4': {
    type: 'color',
    name: '危险色',
    value: '#FF7A71',
    describe: '悬浮',
  },
  'Danger-5': {
    type: 'color',
    name: '危险色',
    value: '#FF4D50',
    describe: '常规',
  },
  'Danger-6': {
    type: 'color',
    name: '危险色',
    value: '#CC3D3A',
    describe: '点击',
  },
  'Tangerine-1': {
    type: 'color',
    name: '橘红色',
    value: '#FFF0E5',
    describe: '浅色背景',
  },
  'Tangerine-2': {
    type: 'color',
    name: '橘红色',
    value: '#FED4B9',
    describe: '聚焦',
  },
  'Tangerine-3': {
    type: 'color',
    name: '橘红色',
    value: '#FDB58F',
    describe: '禁用',
  },
  'Tangerine-4': {
    type: 'color',
    name: '橘红色',
    value: '#FD7445',
    describe: '悬浮',
  },
  'Tangerine-5': {
    type: 'color',
    name: '橘红色',
    value: '#F75229',
    describe: '常规',
  },
  'Tangerine-6': {
    type: 'color',
    name: '橘红色',
    value: '#CD3A1D',
    describe: '点击',
  },
  'Magenta-1': {
    type: 'color',
    name: '洋红色',
    value: '#FCF1F6',
    describe: '浅色背景',
  },
  'Magenta-2': {
    type: 'color',
    name: '洋红色',
    value: '#F8D8E6',
    describe: '聚焦',
  },
  'Magenta-3': {
    type: 'color',
    name: '洋红色',
    value: '#F3B1D0',
    describe: '禁用',
  },
  'Magenta-4': {
    type: 'color',
    name: '洋红色',
    value: '#E564A8',
    describe: '悬浮',
  },
  'Magenta-5': {
    type: 'color',
    name: '洋红色',
    value: '#D84293',
    describe: '常规',
  },
  'Magenta-6': {
    type: 'color',
    name: '洋红色',
    value: '#B4317D',
    describe: '点击',
  },
  'Purple-1': {
    type: 'color',
    name: '紫色',
    value: '#F8EEFE',
    describe: '浅色背景',
  },
  'Purple-2': {
    type: 'color',
    name: '紫色',
    value: '#EDD6FE',
    describe: '聚焦',
  },
  'Purple-3': {
    type: 'color',
    name: '紫色',
    value: '#CFA3F3',
    describe: '禁用',
  },
  'Purple-4': {
    type: 'color',
    name: '紫色',
    value: '#8B48D5',
    describe: '悬浮',
  },
  'Purple-5': {
    type: 'color',
    name: '紫色',
    value: '#6C23C6',
    describe: '常规',
  },
  'Purple-6': {
    type: 'color',
    name: '紫色',
    value: '#4E159E',
    describe: '点击',
  },
  'Roxo-azulado-1': {
    type: 'color',
    name: '紫蓝色',
    value: '#EEF2FE',
    describe: '浅色背景',
  },
  'Roxo-azulado-2': {
    type: 'color',
    name: '紫蓝色',
    value: '#D7DDFF',
    describe: '聚焦',
  },
  'Roxo-azulado-3': {
    type: 'color',
    name: '紫蓝色',
    value: '#ABB4FB',
    describe: '禁用',
  },
  'Roxo-azulado-4': {
    type: 'color',
    name: '紫蓝色',
    value: '#6972F6',
    describe: '悬浮',
  },
  'Roxo-azulado-5': {
    type: 'color',
    name: '紫蓝色',
    value: '#4446F7',
    describe: '常规',
  },
  'Roxo-azulado-6': {
    type: 'color',
    name: '紫蓝色',
    value: '#3431CD',
    describe: '点击',
  },
  'Cyan-1': {
    type: 'color',
    name: '青色',
    value: '#E3FEFA',
    describe: '浅色背景',
  },
  'Cyan-2': {
    type: 'color',
    name: '青色',
    value: '#ADF2E9',
    describe: '聚焦',
  },
  'Cyan-3': {
    type: 'color',
    name: '青色',
    value: '#7DE3D9',
    describe: '禁用',
  },
  'Cyan-4': {
    type: 'color',
    name: '青色',
    value: '#34C6C1',
    describe: '悬浮',
  },
  'Cyan-5': {
    type: 'color',
    name: '青色',
    value: '#1DB8B9',
    describe: '常规',
  },
  'Cyan-6': {
    type: 'color',
    name: '青色',
    value: '#158B90',
    describe: '点击',
  },
  'Fluorescent-green-1': {
    type: 'color',
    name: '荧光绿色',
    value: '#FBFFE4',
    describe: '浅色背景',
  },
  'Fluorescent-green-2': {
    type: 'color',
    name: '荧光绿色',
    value: '#F0FFB3',
    describe: '聚焦',
  },
  'Fluorescent-green-3': {
    type: 'color',
    name: '荧光绿色',
    value: '#E4FF8B',
    describe: '禁用',
  },
  'Fluorescent-green-4': {
    type: 'color',
    name: '荧光绿色',
    value: '#AEE341',
    describe: '悬浮',
  },
  'Fluorescent-green-5': {
    type: 'color',
    name: '荧光绿色',
    value: '#92D42C',
    describe: '常规',
  },
  'Fluorescent-green-6': {
    type: 'color',
    name: '荧光绿色',
    value: '#6EAA21',
    describe: '点击',
  },
  'Lemon-yellow-1': {
    type: 'color',
    name: '柠檬黄色',
    value: '#FDFFE4',
    describe: '浅色背景',
  },
  'Lemon-yellow-2': {
    type: 'color',
    name: '柠檬黄色',
    value: '#FDFFB4',
    describe: '聚焦',
  },
  'Lemon-yellow-3': {
    type: 'color',
    name: '柠檬黄色',
    value: '#FCFC8B',
    describe: '禁用',
  },
  'Lemon-yellow-4': {
    type: 'color',
    name: '柠檬黄色',
    value: '#FCEB49',
    describe: '悬浮',
  },
  'Lemon-yellow-5': {
    type: 'color',
    name: '柠檬黄色',
    value: '#F6D833',
    describe: '常规',
  },
  'Lemon-yellow-6': {
    type: 'color',
    name: '柠檬黄色',
    value: '#D9B62A',
    describe: '点击',
  },
  'Orange-1': {
    type: 'color',
    name: '橘黄色',
    value: '#FEFBE3',
    describe: '浅色背景',
  },
  'Orange-2': {
    type: 'color',
    name: '橘黄色',
    value: '#FDF0B3',
    describe: '聚焦',
  },
  'Orange-3': {
    type: 'color',
    name: '橘黄色',
    value: '#FDE38A',
    describe: '禁用',
  },
  'Orange-4': {
    type: 'color',
    name: '橘黄色',
    value: '#FCC045',
    describe: '悬浮',
  },
  'Orange-5': {
    type: 'color',
    name: '橘黄色',
    value: '#F7A72D',
    describe: '常规',
  },
  'Orange-6': {
    type: 'color',
    name: '橘黄色',
    value: '#CC8021',
    describe: '点击',
  },
  'Brand-1': {
    type: 'color',
    name: '主题色',
    value: '#E9F5FE',
    describe: '浅色背景',
  },
  'Brand-2': {
    type: 'color',
    name: '主题色',
    value: '#BDE2FF',
    describe: '聚焦',
  },
  'Brand-3': {
    type: 'color',
    name: '主题色',
    value: '#94CDFF',
    describe: '禁用',
  },
  'Brand-4': {
    type: 'color',
    name: '主题色',
    value: '#429AFF',
    describe: '悬浮',
  },
  'Brand-5': {
    type: 'color',
    name: '主题色',
    value: '#197AFA',
    describe: '常规',
  },
  'Brand-6': {
    type: 'color',
    name: '主题色',
    value: '#0B5BD4',
    describe: '点击',
  },
  'Neutral-text-5': {
    type: 'color',
    name: '文字色',
    value: '#141737',
    describe: '主要/正文文字',
  },
  'Neutral-text-4': {
    type: 'color',
    name: '文字色',
    value: '#666C7C',
    describe: '次要文字',
  },
  'Neutral-text-3': {
    type: 'color',
    name: '文字色',
    value: '#999DA8',
    describe: '禁用文字',
  },
  'Neutral-text-2': {
    type: 'color',
    name: '文字色',
    value: '#B3B7C1',
    describe: '占位符文字',
  },
  'Neutral-text-1': {
    type: 'color',
    name: '文字色',
    value: '#FFFFFF',
    describe: '纯白文字',
  },
  'Neutral-border-2': {
    type: 'color',
    name: '边框色',
    value: '#CCCFD7',
    describe: '默认/禁用边框',
  },
  'Neutral-border-1': {
    type: 'color',
    name: '边框色',
    value: '#E8EBF0',
    describe: '分割线',
  },
  'Neutral-fill-5': {
    type: 'color',
    name: '填充色',
    value: '#B3B7C1',
    describe: '点击',
  },
  'Neutral-fill-4': {
    type: 'color',
    name: '填充色',
    value: '#CCCFD7',
    describe: '悬浮',
  },
  'Neutral-fill-3': {
    type: 'color',
    name: '填充色',
    value: '#E8EBF0',
    describe: '常规',
  },
  'Neutral-fill-2': {
    type: 'color',
    name: '填充色',
    value: '#F4F5F8',
    describe: '禁用/表头/底层背景',
  },
  'Neutral-fill-1': {
    type: 'color',
    name: '填充色',
    value: '#FFFFFF',
    describe: '白色背景',
  },
  '12/regular': {
    type: 'string',
    name: '12/regular',
    value: '12px',
    describe: '提示、标签、辅助文案',
  },
  mediium: {
    type: 'string',
    name: '12',
    value: '12px',
    describe: '提示、标签、辅助文案',
  },
  '14/regular': {
    type: 'string',
    name: '14/regular',
    value: '14px',
    describe: '正文内容',
  },
  '14/medium': {
    type: 'string',
    name: '14/medium',
    value: '14px',
    describe: '正文内容突出显示',
  },
  '16/regular': {
    type: 'string',
    name: '16/regular',
    value: '16px',
    describe: '标题-小',
  },
  '16/medium': {
    type: 'string',
    name: '16/medium',
    value: '16px',
    describe: '标题-小',
  },
  '18/regular': {
    type: 'string',
    name: '18/regular',
    value: '18px',
    describe: '标题-中',
  },
  '18/medium': {
    type: 'string',
    name: '18/medium',
    value: '18px',
    describe: '标题-中',
  },
  '24/regular': {
    type: 'string',
    name: '24/regular',
    value: '24px',
    describe: '标题-大',
  },
  '24/medium': {
    type: 'string',
    name: '24/medium',
    value: '24px',
    describe: '标题-大',
  },
  '32/regular': {
    type: 'string',
    name: '32/regular',
    value: '32px',
    describe: '运营数据-小',
  },
  '32/medium': {
    type: 'string',
    name: '32/medium',
    value: '32px',
    describe: '运营数据-小',
  },
  '36/regular': {
    type: 'string',
    name: '36/regular',
    value: '36px',
    describe: '运营数据-中',
  },
  '36/medium': {
    type: 'string',
    name: '36/medium',
    value: '36px',
    describe: '运营数据-中',
  },
  '48/regular': {
    type: 'string',
    name: '48/regular',
    value: '48px',
    describe: '运营数据-大',
  },
  '48/medium': {
    type: 'string',
    name: '48/medium',
    value: '48px',
    describe: '运营数据-大',
  },
  'Padding-1': {
    type: 'string',
    name: '1/padding',
    value: '1px',
    describe: '1 内边距',
  },
  'Padding-2': {
    type: 'string',
    name: '2/padding',
    value: '2px',
    describe: '2 内边距',
  },
  'Padding-3': {
    type: 'string',
    name: '3/padding',
    value: '3px',
    describe: '3 内边距',
  },
  'Padding-4': {
    type: 'string',
    name: '4/padding',
    value: '4px',
    describe: '4 内边距',
  },
  'Padding-5': {
    type: 'string',
    name: '5/padding',
    value: '5px',
    describe: '5 内边距',
  },
  'Padding-6': {
    type: 'string',
    name: '6/padding',
    value: '6px',
    describe: '6 内边距',
  },
  'Padding-7': {
    type: 'string',
    name: '7/padding',
    value: '7px',
    describe: '7 内边距',
  },
  'Padding-8': {
    type: 'string',
    name: '8/padding',
    value: '8px',
    describe: '8 内边距',
  },
  'Padding-9': {
    type: 'string',
    name: '9/padding',
    value: '9px',
    describe: '9 内边距',
  },
  'Padding-10': {
    type: 'string',
    name: '10/padding',
    value: '10px',
    describe: '10 内边距',
  },
  'Margin-4': {
    type: 'string',
    name: '4/margin',
    value: '4px',
    describe: '4 外边距',
  },
  'Margin-8': {
    type: 'string',
    name: '8/margin',
    value: '8px',
    describe: '8 外边距',
  },
  'Margin-12': {
    type: 'string',
    name: '12/margin',
    value: '12px',
    describe: '12 外边距',
  },
  'Margin-16': {
    type: 'string',
    name: '16/margin',
    value: '16px',
    describe: '16 外边距',
  },
  'Margin-24': {
    type: 'string',
    name: '24/margin',
    value: '24px',
    describe: '24 外边距',
  },
  'Margin-32': {
    type: 'string',
    name: '32/margin',
    value: '32px',
    describe: '32 外边距',
  },
  'Radius-0': {
    type: 'string',
    name: '0/radius',
    value: '0px',
    describe: '直角',
  },
  'Radius-2': {
    type: 'string',
    name: '2/radius',
    value: '2px',
    describe: '2 圆角',
  },
  'Radius-4': {
    type: 'string',
    name: '4/radius',
    value: '4px',
    describe: '4 圆角',
  },
  'Radius-8': {
    type: 'string',
    name: '8/radius',
    value: '8px',
    describe: '8 圆角',
  },
  'Radius-12': {
    type: 'string',
    name: '12/radius',
    value: '12px',
    describe: '12 圆角',
  },
  'Radius-1000': {
    type: 'string',
    name: '1000/radius',
    value: '1000px',
    describe: '1000 大圆角',
  },
  'Radius-50%': {
    type: 'string',
    name: '50%/radius',
    value: '50%',
    describe: '50% 全圆角',
  },
  'Shadow-1': {
    type: 'string',
    name: '基础阴影',
    value:
      '0px 2px 4px -1px rgba(2, 11, 24, 0.12),0px 4px 5px 0px rgba(2, 11, 24, 0.08),0px 1px 10px 0px rgba(2, 11, 24, 0.05)',
    describe: '表格拖拽、树组件拖拽',
  },
  'Shadow-2': {
    type: 'string',
    name: '中阴影',
    value:
      '0px 5px 5px -3px rgba(2, 11, 24, 0.1),0px 8px 10px 1px rgba(2, 11, 24, 0.06),0px 3px 14px 2px rgba(2, 11, 24, 0.05)',
    describe: '所有下拉组件使用，下拉菜单、气泡确认框、选择器',
  },
  'Shadow-3': {
    type: 'string',
    name: '重阴影',
    value:
      '0px 8px 10px -5px rgba(2, 11, 24, 0.08),0px 16px 24px 2px rgba(2, 11, 24, 0.04),0px 6px 30px 5px rgba(2, 11, 24, 0.05)',
    describe: '所有下拉组件使用，下拉菜单、气泡确认框、选择器',
  },
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const tokenToVars = <T extends {}>(
  componentToken: T,
  tokens?: { [key: string]: Token },
): T => {
  const token: {
    [key in keyof T]?: string;
  } = {};
  const TOKEN = tokens || Tokens;
  Object.keys(componentToken).forEach((key) => {
    const Key = key as keyof T & string;
    const tokenKey = componentToken[Key] as keyof typeof TOKEN;
    token[Key] = cssvar(Key, TOKEN[tokenKey]?.value);
  });

  return token as T;
};

export default Tokens;
