import { styled } from '../js-style';
import type {} from 'jss';
import { Theme } from '../js-style/type';

const createStyle = (t: Theme) => ({
  wrapper: {
    position: 'relative',
    background: t.components.input.color.background,
    borderRadius: t.components.input.borderRadius,
    overflow: 'hidden',
    height: t.components.input.size.height,
    color: t.basic.color.primary2,
    fontSize: t.basic.size.font.md,
    display: 'flex',
    alignItems: 'center',
    '& input': {
      height: '100%',
      width: '100%',
      border: 'none',
      color: t.basic.color.primary2,
      background: 'transparent',
      borderRadius: 0,
      outline: 0,
      padding: [t.components.input.size.padding.v, t.components.input.size.padding.h],
      boxSizing: 'border-box',
      fontSize: t.components.input.size.font,
      '&::placeholder': {
        color: t.components.input.color.placeholder,
      },
    },
  },
  left: {
    marginLeft: t.components.input.size.padding.h,
  },
  right: {
    marginRight: t.components.input.size.padding.h,
  },
  clear: {
    marginRight: 12,
    display: 'flex',
    '& svg': {
      width: 20,
      height: 20,
    },
  },
  pwd: {
    display: 'flex',
    '& svg': {
      fill: t.basic.color.secondaryText,
      width: 20,
      height: 20,
      boxSizing: 'content-box',
      paddingRight: t.components.input.size.padding.h,
    },
  },
  gropu_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& >:first-child': {
      borderTopLeftRadius: t.components.input.groupRadius,
      borderBottomLeftRadius: t.components.input.groupRadius,
    },
    '& $group_item + $group_item': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '& >:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& >:last-child': {
      borderTopRightRadius: t.components.input.groupRadius,
      borderBottomRightRadius: t.components.input.groupRadius,
    },
  },
  group_item: {
    height: t.components.input.size.height,
  },
});

type TransType<T> = {
  [P in keyof T]: T[P] extends string
    ? string | number
    : T[P] extends number
    ? string | number
    : TransType<T[P]>;
};
export type InputStyleType = TransType<ReturnType<typeof createStyle>>;

type SetCustomInputStyle = (style: InputStyleType, t: Theme) => InputStyleType;

export const getInputStyle = (trans: SetCustomInputStyle = (style: InputStyleType) => style) =>
  styled((t) => trans(createStyle(t), t), 'input');

export default getInputStyle();
