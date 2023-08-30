import {useMemo} from 'react';
import {EditableArea} from '@sheinx/base';
import {useEditableAreaStyle} from '@sheinx/shineout-style';
import {EditableAreaProps} from './editable-area.type';

export default (props: EditableAreaProps) => {
  const {} = props;
  const editableAreaStyle = useEditableAreaStyle();
  const jssStyle = useMemo(() => ({ editableArea: editableAreaStyle }), [editableAreaStyle]);

  return (
    <EditableArea
      jssStyle={jssStyle}
      // ...
    />
  );
};
