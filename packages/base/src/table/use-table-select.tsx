import { TableProps } from './table.type';
import { util, usePersistFn } from '@sheinx/hooks';
import { useEffect, useRef } from 'react';
export interface UseTableSelectProps {
  cellSelectable: TableProps<any, any>['cellSelectable'];
}

const { isMacOS, isFirefox, ready, getParent } = util;
interface CacheType {
  xIndex?: number;
  yIndex?: number;
  dom?: HTMLTableCellElement;
}

const selectAttribute = util.getDataAttributeName("table-selection");
const tableAttribute = util.getDataAttributeName("table");
const tdSelect = `td[${selectAttribute}]`;

let instanceNum = 0;

function isEventCombination(event: KeyboardEvent | MouseEvent | React.MouseEvent) {
  const ismo = isMacOS();
  return (ismo && event.metaKey) || (!ismo && event.ctrlKey);
}

// 根据table tr层次   合并td
function mergeDomsText(nodes: NodeListOf<HTMLTableRowElement>) {
  if (!nodes || nodes.length <= 0) return [];
  const trs: HTMLTableRowElement[] = [];
  const res: string[][] = [];
  nodes.forEach((node) => {
    const tr = getParent(node, `tr`) as HTMLTableRowElement;
    let index = trs.indexOf(tr);
    if (index === -1) {
      trs.push(tr);
      index = trs.length - 1;
    }
    if (res[index]) {
      res[index].push(node.innerText);
    } else {
      res[index] = [node.innerText];
    }
  });
  return res;
}

// format table text
// 组合 text
type arrSource = Array<string | arrSource>;
function formatTableText(arrs: arrSource) {
  if (!arrs || arrs.length <= 0) return '';
  let txt = '';
  arrs.forEach((value) => {
    if (typeof value === 'string') {
      txt += `${value}\t`;
    } else {
      txt += `${formatTableText(value)}\n`;
    }
  });
  return txt;
}

// 生成 textarea，并且执行 copy
function execCopyCommand(text: string) {
  // if none, return;
  if (!text) return;
  const textarea = document.createElement('textarea');
  textarea.setAttribute('readonly', 'readonly');
  textarea.value = text;

  // out window
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';

  document.body.append(textarea);
  textarea.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  if (textarea && textarea.parentNode) textarea.parentNode.removeChild(textarea);
}

function setBodyAttr(flag?: boolean) {
  if (flag) {
    document.body.setAttribute(selectAttribute, 'true');
    return;
  }
  document.body.removeAttribute(selectAttribute);
}

// remove all selectClass from dom
function removeSelectAttribute(dom?: HTMLTableCellElement) {
  if (dom) {
    dom.removeAttribute(selectAttribute);
    return;
  }
  const nodes = document.querySelectorAll(tdSelect);
  if (nodes.length <= 0) return;
  nodes.forEach((elem) => {
    removeSelectAttribute(elem as HTMLTableCellElement);
  });
}

// add selection class
function addSelectionAttribute(dom?: HTMLTableCellElement) {
  if (!dom) return;
  dom.setAttribute(selectAttribute, 'true');
}

// handle document click
function docClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (getParent(target, `[${tableAttribute}]`) && isEventCombination(event)) return;
  removeSelectAttribute();
  setBodyAttr(false);
}

// 批量操作
// bulk operation doms
function bulkOperation(doms: HTMLTableRowElement, start: number, end: number) {
  if (!doms || doms.childNodes.length <= 0 || start <= -1 || end <= -1) return;
  const arr = Array.prototype.slice.call(doms.childNodes, start, end + 1);
  arr.forEach((dom: HTMLTableCellElement) => {
    addSelectionAttribute(dom);
  });
}

// 批量操作 -->  添加 selection classname
function bulkAddSelectionClass(td: HTMLTableCellElement, cache: CacheType) {
  const tr = getParent(td, `tr`) as HTMLTableRowElement;

  if (!tr) return;

  const trs = tr.parentNode!.childNodes;
  const xIndex = Array.prototype.indexOf.call(tr.childNodes, td);

  let count = 0;
  // xIndex - cache.xIndex
  while (count < trs.length) {
    if (cache.yIndex! <= count) {
      const Atr = trs[count] as HTMLTableRowElement;
      bulkOperation(Atr, cache.xIndex!, xIndex);
    }
    if (trs[count] === tr) {
      break;
    }
    count += 1;
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (!isEventCombination(event) || event.keyCode !== 67) return;

  const texts = formatTableText(mergeDomsText(document.querySelectorAll(tdSelect)));
  execCopyCommand(texts);
}

// ctrl + c
ready(() => {
  document.addEventListener('keydown', handleKeyDown);
});

const useTableSelect = (props: UseTableSelectProps) => {
  const { current: context } = useRef({
    isFirefox: isFirefox(),
    move: false,
    prevDom: null as null | HTMLElement,
    cache: {} as CacheType,
    cancel: () => {},
  });

  const handleMouseDown = usePersistFn((e: React.MouseEvent) => {
    if (!props.cellSelectable) return;
    if (context.isFirefox) return;
    if (!isEventCombination(e)) return;
    setBodyAttr(true);
    context.move = true;
    const td = getParent(e.target as HTMLElement, 'td') as HTMLTableCellElement;
    const tr = getParent(td, `tr`) as HTMLTableRowElement;
    context.prevDom = td;
    if (!tr) return;
    const xIndex = Array.prototype.indexOf.call(tr.childNodes, td);
    const yIndex = Array.prototype.indexOf.call(tr.parentNode!.childNodes, tr);
    context.cache.xIndex = xIndex;
    context.cache.yIndex = yIndex;
    context.cache.dom = td;
  });

  const handleMouseMove = usePersistFn((event: React.MouseEvent) => {
    if (!props.cellSelectable) return;
    if (context.isFirefox) return;
    if (!context.move) return;
    const td = getParent(event.target as HTMLElement, 'td') as HTMLTableCellElement;
    if (context.prevDom === td) return;
    context.prevDom = td;

    // clear class name
    removeSelectAttribute();

    bulkAddSelectionClass(td, context.cache);
  });

  const handleMouseUp = usePersistFn((event: React.MouseEvent) => {
    if (!props.cellSelectable) return;
    if (context.isFirefox) return;
    if (!isEventCombination(event)) return;
    const target = event.target as HTMLElement;
    const td = getParent(target, 'td') as HTMLTableCellElement;
    if (td === context.cache.dom) {
      context.cache = {};
      context.move = false;
      if (td.hasAttribute(selectAttribute)) {
        removeSelectAttribute(td);
        return;
      }
      addSelectionAttribute(td);
      return;
    }
    context.prevDom = null;

    bulkAddSelectionClass(td, context.cache);

    // reset
    context.cache = {};
    context.move = false;
  });

  useEffect(() => {
    if (!context.isFirefox && props.cellSelectable) {
      document.addEventListener('click', docClick);
      instanceNum += 1;
    }
    return () => {
      instanceNum -= 1;
      if (instanceNum <= 0) {
        document.removeEventListener('click', docClick);
      }
    };
  }, [props.cellSelectable]);

  const getTableProps = usePersistFn(() => {
    if (!props.cellSelectable) return {};
    return {
      [tableAttribute]: 'true',
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
    };
  });

  return {
    getTableProps,
  };
};

export default useTableSelect;
