import { defineCase } from '../../../core/define';

export default defineCase({
  title: '空状态 基础用法',
  description: '来自 shineout 示例 empty/001-base，默认的空状态，只测挂载',
  notes: [
    '2.x 没有 Empty 组件，只有 3.x、antd5、antd6 参与',
    '默认图标是各库自己的：Shineout 的默认图 svg 里有 38 个节点，antd 只有 11~12 个，所以 3.x 的节点数明显更多（43 对 15），这是默认图本身的复杂度差异',
    '默认文案各库自己的：Shineout 是英文 “Data not found”，antd 跟随它的默认语言显示中文“暂无数据”，没有统一，只影响文字，不影响结构',
  ],
});
