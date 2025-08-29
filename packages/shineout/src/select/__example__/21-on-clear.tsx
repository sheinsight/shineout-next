/**
 * cn - 清除事件
 *    -- Select 通过`onClear`属性监听清除事件
 * en - Clear Event
 *    -- Set the onClear property to listen the clear event
 */
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

export default () => {
  return (
    <div>
      <Select
        width={300}
        clearable
        data={primitiveData}
        keygen
        placeholder='Select Color'
        onClear={() => console.log('Select onClear triggered')}
      />
    </div>
  );
};
