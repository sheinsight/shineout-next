import React, { cloneElement } from 'react';
import { escapeRegExp } from './string';
import { isArray } from './is';

export function getHighlightText<T>({
  nodeList,
  searchWords,
  highlightClassName,
}: {
  nodeList: T;
  searchWords?: string;
  highlightClassName: string;
}): T {
  if (!searchWords) {
    return nodeList;
  }

  const transformNode = (node:any) => {
    if (node && typeof node.props?.children === 'string') {
      return cloneElement(
        node,
        undefined,
        <HighlightText
          textToHighlight={node.props.children}
          searchWords={searchWords}
          highlightClassName={highlightClassName}
        />
      );
    }

    if(node && typeof node === 'string'){
      return <HighlightText
        textToHighlight={node}
        searchWords={searchWords}
        highlightClassName={highlightClassName}
      />
    }

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

  // 注意这里的括号，这里使用了带capture group功能的正则，来split字符串
  // 从而在strArr中可以保留匹配文本
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
        )
      )}
    </>
  );
}
