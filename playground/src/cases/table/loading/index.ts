import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表格 加载中',
  description: '来自 shineout 示例 table/08-loading，loading 状态下的表格，只测挂载',
  notes: [
    '数据来自 _shared/data.ts 的确定性数据，原示例用的是 @sheinx/mock 的随机数据；四个库用同一份',
    'Shineout 用 keygen=\'id\' + data + columns[].render，antd 用 rowKey=\'id\' + dataSource + columns[].dataIndex / render，写法对应',
    'antd 的 Table 默认每页 10 行并带分页器，这里全部关掉分页（pagination={false}），和 Shineout 一样一次渲染全部数据',
    '加载中的表现不同（截图 + 实测）：2.x 和 antd 的表格内容变淡（antd 的容器 opacity 0.5），中间叠一个旋转图标；3.x 的内容保持原样不变淡，中间只叠一个小的旋转图标，图标样式也不同（2.x 是齿轮式、3.x 和 antd 是圆点/圆弧）',
    '旋转动画是持续运行的 CSS 动画，只测挂载，动画持续占用的主线程不在数据里',
    '2.x 的 Td 组件在开发模式下会在控制台报 defaultProps 的 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
