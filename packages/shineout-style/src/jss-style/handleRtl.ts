interface ObjectType {
  [key: string]: any;
}

const handleStyle = (
  style: ObjectType,
  {
    originStyle,
    supportStyle,
    unSupportStyle,
  }: {
    originStyle: ObjectType;
    supportStyle: ObjectType;
    unSupportStyle: ObjectType;
  },
) => {
  Object.keys(style).forEach((key) => {
    const value = style[key];
    if (typeof value === 'object') {
      originStyle[key] = {};
      supportStyle[key] = {};
      unSupportStyle[key] = {};
      const data = {
        originStyle: originStyle[key],
        supportStyle: supportStyle[key],
        unSupportStyle: unSupportStyle[key],
      };
      handleStyle(value, data);
    } else {
      const reg = /^(margin|padding|border)(Left|Right)/;
      if (reg.test(key)) {
        const [_, kind, direction, end] = key.match(reg)!;
        const newKey = `${kind}${direction === 'Left' ? 'InlineStart' : 'InlineEnd'}${end || ''}`;
        supportStyle[newKey] = value;
        unSupportStyle[key] = value;
      } else if ('text-align'.indexOf(key) > -1 && (value === 'left' || value === 'right')) {
        supportStyle['text-align'] = value === 'left' ? 'start' : 'end';
        unSupportStyle['text-align'] = value;
      } else {
        originStyle[key] = value;
      }
    }
  });
};
const handleRtl = <T extends ObjectType>(style: T) => {
  const originStyle = {};
  const supportStyle = {};
  const unSupportStyle = {};

  const data = { originStyle, supportStyle, unSupportStyle };
  handleStyle(style, data);
  return {
    ...(originStyle as T),
    '@supports (margin-inline-start: 1px)': {
      ...supportStyle,
    },
    '@supports not (margin-inline-start: 1px)': {
      ...unSupportStyle,
    },
  };
};

export default handleRtl;
