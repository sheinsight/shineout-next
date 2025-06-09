/**
 * cn - 禁用弹出
 *    -- 设置 `disabled` 属性可以禁用弹出
 * en - Disabled
 *    -- Set the disabled property to disable the popover
 */
import React from 'react';
import { Link, Switch, Popover } from 'shineout';

export default () => {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <div>
      <div style={{marginBottom: 12}}>
        <Switch checked={disabled} onChange={setDisabled} content={['禁用', '启用']} />
      </div>

      <Link type='primary' disabled>
        Link
        <Popover.Confirm disabled={disabled}>Are you sure?</Popover.Confirm>
      </Link>
    </div>
  );
};
