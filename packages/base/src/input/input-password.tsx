import React from 'react';
import SimpleInput from './simple-input';
import { useInputPassword, util } from '@sheinx/hooks';
import useInputCommon from './use-input-common';

import { InputPasswordProps } from './input-password.type';
import icons from '../icons';

const Password = (props: InputPasswordProps) => {
  const commonProps = useInputCommon<InputPasswordProps['value'], InputPasswordProps>(props);
  const inputStyle = props.jssStyle?.input?.();

  const inputPasswordParams = {
    point: props.point,
    // 是否显示切换密码可见状态的按钮
    visibilityToggle: props.visibilityToggle,
    // 是否显示密码
    visibility: props.visibility,
    // 初始状态是否显示密码
    defaultVisibility: props.defaultVisibility,
    // 切换密码可见状态的按钮的图标
    onVisibilityChange: props.onVisibilityChange,
  };

  const { inputProps, toggleProps, visibility, visibilityToggle } = useInputPassword({
    value: commonProps.value,
    onChange: commonProps.onChange,
    ...inputPasswordParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...inputPasswordParams,
  });

  const suffix = (
    <>
      {props.suffix}
      {visibilityToggle ? (
        <span {...toggleProps} className={inputStyle?.passwordToggle}>
          {visibility ? icons.Hide : icons.Display}
        </span>
      ) : null}
    </>
  );

  return <SimpleInput {...forwardProps} {...inputProps} suffix={suffix} />;
};

export default React.memo(Password);
