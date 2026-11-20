import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表格 尺寸',
  description: '来自 shineout 示例 table/03-size，各尺寸的表格同时渲染，只测挂载',
  notes: [
    '数据来自 _shared/data.ts 的确定性数据，原示例用的是 @sheinx/mock 的随机数据；四个库用同一份',
    'Shineout 用 keygen=\'id\' + data + columns[].render，antd 用 rowKey=\'id\' + dataSource + columns[].dataIndex / render，写法对应',
    'antd 的 Table 默认每页 10 行并带分页器，这里全部关掉分页（pagination={false}），和 Shineout 一样一次渲染全部数据',
    '实测行高：2.x small 31 / default 37；3.x small 31 / default 39 / large 55；antd small 39 / middle 47 / large 55。两边相同名称的尺寸实际大小不同（例如 3.x small 31 对 antd small 39），各库自己的设计',
    '原示例用 Radio.Group 切换 size，这里把各个取值同时渲染（沿用 Radio 迁移前的做法）；2.x 的 size 只有 small / default，3.x 是 small / default / large，antd 是 small / middle / large，所以 2.x 渲染 2 个表格，3.x 和 antd 各渲染 3 个',
    '2.x 的 Td 组件在开发模式下会在控制台报 defaultProps 的 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
