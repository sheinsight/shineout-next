/**
 * cn - 滚动加载
 *    -- 通过配置`onLoadMore`方法，当下拉面板内容滚动至一定程度时，会触发该方法，实现滚动加载的效果
 *    -- 通过配置`threshold`属性控制触发加载的阈值，默认为 1 即滚动至底部时触发加载，范围为 0 ~ 1
 *    -- 注意，加载中样式及效果需自行设置，`onLoadMore`方法需自行设置触发频率，避免高频调用
 * en - Basic
 *    --
 */
import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

export default () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current: c, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const onLoadMore = async () => {
    if (current >= 10) return;
    // 避免高频调用
    if (loading) return;
    await fetchData(current + 1);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div>
      <Select
        width={300}
        clearable
        data={data}
        keygen='id'
        format='id'
        threshold={1}
        renderItem={(d) => d.firstName}
        placeholder='Select User'
        onLoadMore={onLoadMore}
        renderOptionList={(List) => {
          return (
            <Spin loading={loading} name='ring' size={14}>
              {List}
            </Spin>
          );
        }}
      />
    </div>
  );
};
