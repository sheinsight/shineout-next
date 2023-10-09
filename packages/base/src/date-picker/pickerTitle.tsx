import { PickerProps } from './picker.type';
import { getLocale, useConfig } from '../config';

interface PickerTitleProps {
  position: 'start' | 'end' | undefined;
  jssStyle: PickerProps['jssStyle'];
}
const PickerTitle = (props: PickerTitleProps) => {
  const { position, jssStyle } = props;
  const datePickerStyle = jssStyle?.datePicker?.();
  const { locale } = useConfig();
  if (!position) return null;
  return (
    <div className={datePickerStyle?.pickerTitle}>
      <span>{getLocale(locale, position === 'start' ? 'startTime' : 'endTime')}</span>
    </div>
  );
};

export default PickerTitle;
