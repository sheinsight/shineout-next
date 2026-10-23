/**
 * cn - 大数据量性能
 *    -- 约 6MB、16629 个节点的真实业务数据，复现 virtual + multiple + onFilter 下打开弹出层和输入过滤时的卡顿
 * en - Big data performance
 *    -- About 6MB real data with 16629 nodes, reproduce lag when opening popup and filtering with virtual + multiple + onFilter
 */
import React, { Profiler, useRef, useState } from 'react';
import { TreeSelect, Checkbox } from 'shineout';
// @ts-ignore 项目未开启 resolveJsonModule，由 webpack 处理 json
import productTagOptions from './static/product-tag-options.json';

interface CommitRecord {
  id: number;
  phase: string;
  actual: number;
}

const countNodes = (list: any[]): number =>
  list.reduce((sum, item) => sum + 1 + (item.children ? countNodes(item.children) : 0), 0);

const nodeCount = countNodes(productTagOptions);

const handleFilter = (text: string) => (item: any) => {
  const searchText = text.toLowerCase();
  const itemName = (item.name || '').toLowerCase();
  const composeName = (item.compose_name || '').toLowerCase();
  return itemName.includes(searchText) || composeName.includes(searchText);
};

export default () => {
  const [virtual, setVirtual] = useState(true);
  const [records, setRecords] = useState<CommitRecord[]>([]);
  const seq = useRef(0);
  const pending = useRef<CommitRecord[]>([]);
  const flushTimer = useRef<ReturnType<typeof setTimeout>>();

  // 收集 commit 耗时，延迟刷新到面板，避免面板自身的渲染被计入
  const handleRender = (_id: string, phase: string, actualDuration: number) => {
    if (actualDuration < 5) return;
    seq.current += 1;
    pending.current.push({ id: seq.current, phase, actual: actualDuration });
    console.log(`[tree-select-perf] #${seq.current} ${phase} ${actualDuration.toFixed(1)}ms`);
    if (flushTimer.current) clearTimeout(flushTimer.current);
    flushTimer.current = setTimeout(() => {
      const next = pending.current;
      pending.current = [];
      setRecords((prev) => [...next.reverse(), ...prev].slice(0, 20));
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <span>节点数：{nodeCount}</span>
        <Checkbox checked={virtual} onChange={(_, checked) => setVirtual(checked)}>
          virtual
        </Checkbox>
      </div>
      <Profiler id='big-data-tree-select' onRender={handleRender}>
        <TreeSelect
          key={String(virtual)}
          virtual={virtual}
          multiple
          clearable
          absolute
          compressed
          compressedBound={1}
          data={productTagOptions}
          keygen='id'
          renderItem='name'
          mode={2}
          placeholder='请选择商品标签'
          style={{ width: '100%' }}
          onFilter={handleFilter}
        />
      </Profiler>
      <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'monospace' }}>
        <div>最近的 React commit（actualDuration ≥ 5ms）：</div>
        {records.map((r) => (
          <div key={r.id}>
            #{r.id} {r.phase} {r.actual.toFixed(1)}ms
          </div>
        ))}
      </div>
    </div>
  );
};
