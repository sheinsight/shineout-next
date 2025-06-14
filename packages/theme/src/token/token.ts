import { getConfig } from '../config';
import { Tokens } from './type';
import { replaceNonAlphanumeric } from '../utils/css-var';

const Token: Tokens = {
  'Brand-1': '#E9F5FE',
  'Brand-2': '#BDE2FF',
  'Brand-10': '#001D61',
  'Brand-3': '#94CDFF',
  'Brand-4': '#6BB5FF',
  'Brand-5': '#429AFF',
  'Brand-6': '#197AFA',
  'Brand-7': '#0B5BD4',
  'Brand-8': '#0040AD',
  'Brand-9': '#002D87',
  'Cyan-1': '#E3FEFA',
  'Cyan-10': '#051F24',
  'Cyan-2': '#ADF2E9',
  'Cyan-3': '#7DE3D9',
  'Cyan-4': '#54D4CC',
  'Cyan-5': '#34C6C1',
  'Cyan-6': '#1DB8B9',
  'Cyan-7': '#158B90',
  'Cyan-8': '#0D6169',
  'Cyan-9': '#093D45',
  'Danger-1': '#FCE6E6',
  'Danger-10': '#4D000A',
  'Danger-2': '#F7C1C0',
  'Danger-3': '#F29896',
  'Danger-4': '#F38981',
  'Danger-5': '#EF6661',
  'Danger-6': '#EB4242',
  'Danger-7': '#CC2C29',
  'Danger-8': '#9C161F',
  'Danger-9': '#740813',
  'Indigo-1': '#EEF2FE',
  'Indigo-10': '#170F69',
  'Indigo-2': '#D7DDFF',
  'Indigo-3': '#ABB4FB',
  'Indigo-4': '#848FF9',
  'Indigo-5': '#6972F6',
  'Indigo-6': '#4446F7',
  'Indigo-7': '#3431CD',
  'Indigo-8': '#2822A6',
  'Indigo-9': '#1E1782',
  'Lemon-1': '#FCFADE',
  'Lemon-10': '#4D3000',
  'Lemon-2': '#FFF9BF',
  'Lemon-3': '#FFE76C',
  'Lemon-4': '#FFE76C',
  'Lemon-5': '#FFD943',
  'Lemon-6': '#FFC91A',
  'Lemon-7': '#D29F10',
  'Lemon-8': '#A67708',
  'Lemon-9': '#795203',
  'Magenta-1': '#FCF1F6',
  'Magenta-10': '#4B0C37',
  'Magenta-2': '#F8D8E6',
  'Magenta-3': '#F3B1D0',
  'Magenta-4': '#EF8BBE',
  'Magenta-5': '#E564A8',
  'Magenta-6': '#D84293',
  'Magenta-7': '#B4317D',
  'Magenta-8': '#912266',
  'Magenta-9': '#6E164E',
  'Neon-1': '#F1FAE1',
  'Neon-10': '#194D00',
  'Neon-2': '#DDF2BE',
  'Neon-3': '#C4E598',
  'Neon-4': '#AAD974',
  'Neon-5': '#90CC54',
  'Neon-6': '#77BF37',
  'Neon-7': '#5AA223',
  'Neon-8': '#418613',
  'Neon-9': '#2B6908',
  'Neutral-1': '#000000',
  'Neutral-10': '#020B18',
  'Neutral-2': '#F4F5F8',
  'Neutral-3': '#E8EBF0',
  'Neutral-4': '#CCCFD7',
  'Neutral-5': '#B3B7C1',
  'Neutral-6': '#999DA8',
  'Neutral-7': '#666C7C',
  'Neutral-8': '#333E59',
  'Neutral-9': '#141737',
  'Orange-1': '#FAF4E3',
  'Orange-10': '#4D2100',
  'Orange-2': '#EBDDBC',
  'Orange-3': '#D6C094',
  'Orange-4': '#C2A470',
  'Orange-5': '#AD8951',
  'Orange-6': '#996F37',
  'Orange-7': '#865824',
  'Orange-8': '#734415',
  'Orange-9': '#603109',
  'Brown-1': '#FAF4E3',
  'Brown-10': '#4D2100',
  'Brown-2': '#EBDDBC',
  'Brown-3': '#D6C094',
  'Brown-4': '#C2A470',
  'Brown-5': '#AD8951',
  'Brown-6': '#996F37',
  'Brown-7': '#865824',
  'Brown-8': '#734415',
  'Brown-9': '#603109',
  'Purple-1': '#F8EEFE',
  'Purple-10': '#150530',
  'Purple-2': '#EDD6FE',
  'Purple-3': '#CFA3F3',
  'Purple-4': '#AD72E4',
  'Purple-5': '#8B48D5',
  'Purple-6': '#6C23C6',
  'Purple-7': '#4E159E',
  'Purple-8': '#360C77',
  'Purple-9': '#220652',
  'Success-1': '#E4FCED',
  'Success-2': '#ADEEC9',
  'Success-10': '#004D36',
  'Success-3': '#78DCA7',
  'Success-4': '#4ACB8A',
  'Success-5': '#22B973',
  'Success-6': '#00A85F',
  'Success-7': '#009157',
  'Success-8': '#007A4D',
  'Success-9': '#006342',
  'Tangerine-1': '#FFF0E5',
  'Tangerine-10': '#56130A',
  'Tangerine-2': '#FED4B9',
  'Tangerine-3': '#FDB58F',
  'Tangerine-4': '#FD9568',
  'Tangerine-5': '#FD7445',
  'Tangerine-6': '#F75229',
  'Tangerine-7': '#CD3A1D',
  'Tangerine-8': '#A22614',
  'Tangerine-9': '#7B1B0E',
  'Warning-1': '#FFF3E2',
  'Warning-10': '#4D1600',
  'Warning-2': '#FDDFBA',
  'Warning-3': '#FBC68D',
  'Warning-4': '#FDBB66',
  'Warning-5': '#F78C35',
  'Warning-6': '#F56C0A',
  'Warning-7': '#CB5206',
  'Warning-8': '#A13A03',
  'Warning-9': '#772601',
  'Neutral-text-5': '#141737',
  'Neutral-text-4': '#666C7C',
  'Neutral-text-3': '#999DA8',
  'Neutral-text-2': '#B3B7C1',
  'Neutral-text-1': '#FFFFFF',
  'Neutral-border-2': '#CCCFD7',
  'Neutral-border-1': '#E8EBF0',
  'Neutral-fill-7': '#666C7C',
  'Neutral-fill-5': '#B3B7C1',
  'Neutral-fill-9': '#141737',
  'Neutral-fill-10': '#020B18',
  'Neutral-fill-6': '#999DA8',
  'Neutral-fill-8': '#333E59',
  'Neutral-fill-4': '#CCCFD7',
  'Neutral-fill-3': '#E8EBF0',
  'Neutral-fill-2': '#F4F5F8',
  'Neutral-fill-1': '#FFFFFF',
  'Padding-1': '1px',
  'Padding-2': '2px',
  'Padding-3': '3px',
  'Padding-4': '4px',
  'Padding-5': '5px',
  'Padding-6': '6px',
  'Padding-7': '7px',
  'Padding-8': '8px',
  'Padding-9': '9px',
  'Padding-10': '10px',
  'Padding-11': '11px',
  'Padding-12': '12px',
  'Padding-13': '13px',
  'Padding-14': '14px',
  'Padding-15': '15px',
  'Padding-16': '16px',
  'Padding-17': '17px',
  'Padding-18': '18px',
  'Padding-19': '19px',
  'Padding-20': '20px',
  'Padding-21': '21px',
  'Padding-22': '22px',
  'Padding-23': '23px',
  'Padding-24': '24px',
  'Margin-4': '4px',
  'Margin-8': '8px',
  'Margin-12': '12px',
  'Margin-16': '16px',
  'Margin-24': '24px',
  'Margin-32': '32px',
  'Radius-0': '0px',
  'Radius-2': '2px',
  'Radius-3': '3px',
  'Radius-4': '4px',
  'Radius-8': '8px',
  'Radius-12': '12px',
  'Radius-1000': '1000px',
  'Shadow-1': '0px 2px 5px rgba(2, 11, 24, 0.1)',
  'Shadow-2': '0px 4px 10px rgba(2, 11, 24, 0.1)',
  'Shadow-3': '0px 8px 20px rgba(2, 11, 24, 0.1)',
  'Shadow-4': '0px -2px 10px rgba(232, 235, 240, 0.8)',
  'Shadow-5':
    'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  'Line-height-dynamic': 'calc( 1em + 8px )',
  'Line-height-dynamic-min': 'calc( max(1em, 14px) + 8px )',
  Transparent: 'transparent',
  'Mask-fill-1': 'rgba(2, 11, 24, 0.3)',
  Size: '2',
  'Radius-rect': '0px',
  'Radius-lesser': '2px',
  'Radius-small': '3px',
  'Radius-default': '4px',
  'Radius-large': '8px',
  'Radius-full': '1000px',
  'Radius-circle': '50%',
  'Border-0': '0px',
  'Border-1': '1px',
  'Border-2': '2px',
  'Border-3': '3px',
  'Weight-light': '300',
  'Weight-regular': '400',
  'Weight-medium': '500',
  'Weight-Semibold': '600',
  'Weight-Bold': '700',
  'Font-12': '12px',
  'Font-14': '14px',
  'Font-16': '16px',
  'Font-18': '18px',
  'Font-20': '20px',
  'Font-24': '24px',
  'Font-28': '28px',
  'Font-32': '32px',
  'Font-36': '36px',
  'Font-48': '48px',
  'Spacing-0': '0px',
  'Spacing-1': '1px',
  'Spacing-2': '2px',
  'Spacing-3': '3px',
  'Spacing-4': '4px',
  'Spacing-5': '5px',
  'Spacing-6': '6px',
  'Spacing-7': '7px',
  'Spacing-8': '8px',
  'Spacing-9': '9px',
  'Spacing-10': '10px',
  'Spacing-11': '11px',
  'Spacing-12': '12px',
  'Spacing-13': '13px',
  'Spacing-14': '14px',
  'Spacing-15': '15px',
  'Spacing-16': '16px',
  'Spacing-17': '17px',
  'Spacing-18': '18px',
  'Spacing-19': '19px',
  'Spacing-20': '20px',
  'Spacing-21': '21px',
  'Spacing-22': '22px',
  'Spacing-23': '23px',
  'Spacing-24': '24px',
  'Spacing-25': '25px',
  'Spacing-26': '26px',
  'Spacing-27': '27px',
  'Spacing-28': '28px',
  'Spacing-29': '29px',
  'Spacing-30': '30px',
  'Spacing-31': '31px',
  'Spacing-32': '32px',
  'Spacing-33': '33px',
  'Spacing-34': '34px',
  'Spacing-35': '35px',
  'Spacing-36': '36px',
  'Spacing-37': '37px',
  'Spacing-38': '38px',
  'Spacing-39': '39px',
  'Spacing-40': '40px',
  'Spacing-41': '41px',
  'Spacing-42': '42px',
  'Spacing-43': '43px',
  'Spacing-44': '44px',
  'Spacing-45': '45px',
  'Spacing-46': '46px',
  'Spacing-47': '47px',
  'Spacing-48': '48px',
  'Size-1': '2px',
  'Size-2': '4px',
  'Size-3': '6px',
  'Size-4': '8px',
  'Size-5': '10px',
  'Size-6': '12px',
  'Size-7': '14px',
  'Size-8': '16px',
  'Size-9': '18px',
  'Size-10': '20px',
  'Size-11': '22px',
  'Size-12': '24px',
  'Size-13': '26px',
  'Size-14': '28px',
  'Size-15': '30px',
  'Size-16': '32px',
  'Size-17': '34px',
  'Size-18': '36px',
  'Size-19': '38px',
  'Size-20': '40px',
  'Size-21': '42px',
  'Size-22': '44px',
  'Size-23': '46px',
  'Size-24': '48px',
  'Size-25': '50px',
  'Size-26': '52px',
  'Size-27': '54px',
  'Size-28': '56px',
};

// @ts-ignore
const CommonToken: Tokens = {};

Object.keys(Token).forEach((key) => {
  const { prefix } = getConfig();
  // @ts-ignore
  CommonToken[key] = `var(--${prefix}-${replaceNonAlphanumeric(key)}, ${Token[key]})`;
});

export { CommonToken };

export default Token;
