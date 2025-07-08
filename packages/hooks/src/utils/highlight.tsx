import React, { cloneElement } from 'react';
import { escapeRegExp } from './string';
import { isArray } from './is';

export function getHighlightText<T>({
  nodeList,
  searchWords,
  highlightClassName,
  enable,
}: {
  enable?: boolean;
  nodeList: T;
  searchWords?: string;
  highlightClassName: string;
}): T {
  if (!enable || !searchWords) {
    return nodeList;
  }

  // 递归转换节点
  const transformNode = (node: any, index: number): any => {
    // 如果是合法的 React 元素
    if (React.isValidElement(node) && node.props && (node.props as any).children) {
      // 对 children 递归调用 getHighlightText 进行转换
      const transformedChildren = getHighlightText({
        nodeList: (node.props as any).children,
        searchWords,
        highlightClassName,
        enable,
      });

      return cloneElement(node, { ...node.props, key: index }, transformedChildren);
    }
    // 如果节点为字符串，则直接高亮替换
    if (typeof node === 'string') {
      return (
        <HighlightText
          textToHighlight={node}
          searchWords={searchWords}
          highlightClassName={highlightClassName}
        />
      );
    }
    // 其他情况直接返回原节点
    return node;
  };

  return isArray(nodeList) ? nodeList.map(transformNode) : transformNode(nodeList);
}

function HighlightText({
  textToHighlight,
  searchWords,
  highlightClassName,
}: {
  textToHighlight: string;
  searchWords?: string;
  highlightClassName?: string;
}) {
  if (!searchWords) return <>{textToHighlight}</>;

  if (searchWords.length > 500) {
    searchWords = searchWords.slice(0, 500);
  }

  // 带 capture group 的正则用于 split 保留匹配文本
  const re = new RegExp(`(${escapeRegExp(searchWords)})`, 'i');
  const strArr = textToHighlight.split(re);

  return (
    <>
      {strArr.map((item, index) =>
        re.test(item) ? (
          <span key={index} className={highlightClassName}>
            {item}
          </span>
        ) : (
          <React.Fragment key={index}>{item}</React.Fragment>
        ),
      )}
    </>
  );
}
