/**
 * cn - 加载中按钮
 *    -- 通过设置 loading 可以让一个按钮处于加载中状态，处于加载中状态的按钮不会触发点击事件
 * en - Loading
 *    -- Set loading to make a button loading. The button in the loading state does not trigger the click event
 */

import { useState } from 'react';
import { Button, Gap, Icon, Message } from 'shineout';

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

const ShineoutIcon = Icon(url, 'FontAwesome', 'fa');

const prefixIconStyle = {
  marginRight: 4,
  fontSize: 12,
  width: 12,
  height: 12,
};

const suffixIconStyle = {
  marginLeft: 4,
  fontSize: 12,
};

export default () => {
  const [loadings, setLoadings] = useState([false, false, false, false]);

  const handleMockLoading = (index: number) => {
    setLoadings(prev => prev.map((loading, i) => i === index ? true : loading));
    Message.info('Deleting...', 2);
    setTimeout(() => {
      setLoadings(prev => prev.map((loading, i) => i === index ? false : loading));
      Message.success('Delete success');
    }, 2000);
  };

  return (
    <Gap style={{width: 400}}>
      <Gap>
        <Button type='primary' loading>
          Loading
        </Button>

        <Button type='primary' loading shape='square'>
          <ShineoutIcon name='trash-o' style={{ ...prefixIconStyle, marginRight: 0 }} />
        </Button>

        <Button type='primary' loading>
          <ShineoutIcon name='trash-o' style={prefixIconStyle} />
          Delete
        </Button>

        <Button type='primary' loading>
          <ShineoutIcon name='trash-o' style={prefixIconStyle} />
          Delete
          <ShineoutIcon name='info' style={suffixIconStyle} />
        </Button>
      </Gap>

      <Gap>
        <Button type='primary' loading={loadings[0]} onClick={() => handleMockLoading(0)}>
          Loading
        </Button>

        <Button type='primary' loading={loadings[1]} shape='square' onClick={() => handleMockLoading(1)}>
          <ShineoutIcon name='trash-o' style={{ ...prefixIconStyle, marginRight: 0 }}/>
        </Button>

        <Button type='primary' loading={loadings[2]} onClick={() => handleMockLoading(2)}>
          <ShineoutIcon name='trash-o' style={prefixIconStyle} />
          Delete
        </Button>

        <Button type='primary' loading={loadings[3]} onClick={() => handleMockLoading(3)}>
          <ShineoutIcon name='trash-o' style={prefixIconStyle} />
          Delete
          <ShineoutIcon name='info' style={suffixIconStyle} />
        </Button>
      </Gap>
    </Gap>
  );
};
