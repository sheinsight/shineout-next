/**
 * cn - 基本用法
 *    -- Select 通过`data`属性设置数据源，通过`keygen`属性设置key生成器，通过`renderItem`属性设置渲染函数
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

const data: number[] = [];

for (let i = 0; i < 20; i++) {
  data.push(i);
}

export default () => {
  return (
    <div>
      <Select
        style={{ width: 300 }}
        data={[
          {
            id: 1,
            name: '12324356789',
            desc: '1',
          },
          {
            id: 2,
            name: '竞价单支持二次编辑，mes收到变更，需要更新表里数据，包含修改竞价时间、竞价未结束前可添加竞价供应商',
            desc: '2',
          },
          {
            id: 3,
            name: '二次议价环节',
            desc: '3',
          },
          {
            id: 4,
            name: '在转款场景下，需要支持兼容ISS发起的竞价场景；即转款后指派多家商参与竞价环节。',
            desc: '4',
          },
          {
            id: 5,
            name: '二次议价环节',
            desc: '5',
          },
          {
            id: 6,
            name: '二次议价环节',
            desc: '6',
          },
          {
            id: 7,
            name: '需要兼容ISS转款发起的竞价',
            desc: '7',
          },
          {
            id: 8,
            name: '二次议价环节',
            desc: '8',
          },
          {
            id: 9,
            name: '需要兼容ISS转款发起的竞价',
            desc: '9',
          },
        ]}
        renderItem={(row) => (
          <div>
            <div>{row.name}</div>
            <div>{row.desc}</div>
          </div>
        )}
        lineHeight='auto'
        keygen='id'
        format='id'
      />
    </div>
  );
};
