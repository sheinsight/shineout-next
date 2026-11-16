import { Pagination } from 'antd-v5';

// antd 没有 mode（outline / text 两种按钮风格），页码按钮默认就是无边框的文字风格，这里两个只能画同一个样子
export default function Demo() {
  return (
    <div>
      <Pagination style={{ marginBottom: 24 }} total={100} defaultCurrent={1} showSizeChanger={false} />
      <Pagination total={100} defaultCurrent={1} showSizeChanger={false} />
    </div>
  );
}
