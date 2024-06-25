import { isEmpty } from './is';
export type insertObject = {
  [x: string]: any;
};

export function insertPoint(name: string) {
  const reg = /(\[\d+\])/gi;
  return name.replace(reg, (s, m, i) => s.replace(m, i === 0 ? m : `.${m}`));
}

export type Result = {
  [x: string]: any;
};

export function flatten(data: Result, skipArray?: boolean) {
  if (isEmpty(data)) return data;
  const result: Result = {};
  function recurse(cur: any, prop: keyof Result) {
    if (
      Object(cur) !== cur ||
      typeof cur === 'function' ||
      cur instanceof Date ||
      cur instanceof Error ||
      (skipArray && Array.isArray(cur))
    ) {
      if (!(cur === undefined && /\[\d+\]$/.test(prop as string))) {
        result[prop] = cur;
      }
    } else if (Array.isArray(cur)) {
      if (cur.length === 0) {
        result[prop] = [];
      } else {
        for (let i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop ? `${prop}[${i}]` : `[${i}]`);
        }
      }
    } else {
      let empty = true;
      if (typeof cur === 'object') {
        // eslint-disable-next-line
        for (const p in cur) {
          empty = false;
          recurse(cur[p as keyof typeof cur], prop ? `${prop}.${p}` : p);
        }

        if (empty) {
          result[prop] = {};
        }
      }
    }
  }
  recurse(data, '');
  return result;
}
export function insertValue(obj: insertObject, name: string, index: number, value: any) {
  Object.keys(obj)
    .filter((n) => n.indexOf(`${name}[`) === 0)
    .sort()
    .reverse()
    .forEach((n) => {
      // const reg = new RegExp(`${name}\\[(\\d+)\\]`)
      const reg = new RegExp(`${name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}\\[(\\d+)\\]`);
      const match = reg.exec(n);
      const i = parseInt((match as RegExpExecArray)[1], 10);
      if (i < index) return;
      const newName = n.replace(reg, `${name}[${i + 1}]`);
      if (obj[n]) obj[newName] = obj[n];
      delete obj[n];
    });
  const newValue = flatten({ [`${name}[${index}]`]: value });
  Object.keys(newValue).forEach((k) => {
    if (newValue[k] !== undefined) obj[k] = newValue[k];
  });
}

export type SpliceValue = {
  [x: string]: any;
};

export function spliceValue(obj: SpliceValue, name: keyof SpliceValue & string, index: number) {
  const names = Object.keys(obj)
    .filter((n) => n === name || n.indexOf(`${name}[`) === 0)
    .sort();

  names.forEach((n) => {
    if (n === name && !Array.isArray(obj[name])) return;

    if (n === name && Array.isArray(obj[name])) {
      obj[name].splice(index, 1);
      return;
    }

    const reg = new RegExp(`${name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}\\[(\\d+)\\]`);
    const match = reg.exec(n);
    const i = parseInt((match as RegExpExecArray)[1], 10);
    if (i < index) return;
    if (i === index) {
      delete obj[n];
      return;
    }
    const newName = n.replace(reg, `${name}[${i - 1}]`);
    obj[newName] = obj[n];
    delete obj[n];
  });
}
