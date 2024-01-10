interface ObjectType {
  [key: string]: any;
}

function flexGapSupport() {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  if (flex.parentNode) flex.parentNode.removeChild(flex);

  return isSupported;
}

let isSupportGap: boolean | null = null;

const handleRule = (key: string, rule: string, target: ObjectType) => {
  if (key === 'gap') {
    if (isSupportGap === null) {
      isSupportGap = flexGapSupport();
    }
    const valueArr = rule.split(' ');
    valueArr[1] = valueArr[1] || valueArr[0];

    if (isSupportGap) {
      target[key] = rule;
    } else {
      target['& > *'] = {
        ...(target?.['& > *'] || {}),
        marginRight: valueArr[1],
        marginBottom: valueArr[0],
      };
    }
    return;
  }
  const reg = /^(margin|padding|border)(Left|Right)([\s\S]*)/;
  if (reg.test(key)) {
    const [_, kind, direction, end] = key.match(reg)!;
    const newKey = `${kind}${direction === 'Left' ? 'InlineStart' : 'InlineEnd'}${end || ''}`;
    const condition = `@supports (margin-inline-start: 1px)`;
    const condition2 = `@supports not (margin-inline-start: 1px)`;
    target[`${condition}`] = {
      ...(target[`${condition}`] || {}),
      [newKey]: rule,
    };
    target[`${condition2}`] = {
      ...(target[`${condition2}`] || {}),
      [key]: rule,
    };
    return;
  }

  if ('text-align'.indexOf(key) > -1 && (rule === 'left' || rule === 'right')) {
    const condition = `@supports (text-align: start)`;
    const condition2 = `@supports not (text-align: start)`;
    target[`${condition}`] = {
      ...(target[`${condition}`] || {}),
      'text-align': rule === 'left' ? 'start' : 'end',
    };
    target[`${condition2}`] = {
      ...(target[`${condition2}`] || {}),
      'text-align': rule,
    };
    return;
  }

  target[key] = rule;
};

const mapStyle = (style: ObjectType, cloneStyle: ObjectType) => {
  Object.keys(style).forEach((key) => {
    const value = style[key];
    if (typeof value === 'object' && key.indexOf('@') === -1) {
      cloneStyle[key] = {};
      mapStyle(value, cloneStyle[key]);
    } else {
      handleRule(key, value, cloneStyle);
    }
  });
};
const handleStyle = <T extends ObjectType>(style: T) => {
  const cloneStyle = {} as T;
  mapStyle(style, cloneStyle);
  return cloneStyle;
};

export default handleStyle;
