import React from 'react';

/**
 * 判断是否是两个中文字符
 *
 * @param str 文本内容
 * @returns boolean
 */
const isTwoCNChar = (str: string) => /^[\u4e00-\u9fa5]{2}$/.test(str);
const SPACE = ' ';

/**
 * 处理文本内容，如果是两个中文字符，插入空格
 *
 * @param children ReactNode
 * @param insertSpace 是否需要插入空格
 * @returns 处理后的 ReactNode
 */
export function wrapSpan(children: React.ReactNode, insertSpace = false): React.ReactNode {
  if (!children) return children;
  return React.Children.map(children, (item) => {
    if (typeof item === 'string') {
      if (insertSpace && isTwoCNChar(item)) return <span>{item.split('').join(SPACE)}</span>;
      return <span>{item}</span>;
    }
    return item;
  });
}
