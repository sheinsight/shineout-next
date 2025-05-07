/**
* cn - 基本用法
*    -- 设置 `loading` 为true，开启加载状态
* en - Basic
*    -- Set `loading` to true to enable loading state
 */
import { Skeleton } from 'shineout';

export default () => {
  return (
    <Skeleton loading>
      <div>
        I am the content after loading. I am the content after loading. I am the content after loading.
      </div>
    </Skeleton>
  );
};
