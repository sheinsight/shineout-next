import { PickerProps } from './picker.type';
import { useConfig, getLocale } from '../config';

interface PickerTitleProps {
  position: 'start' | 'end' | undefined;
  jssStyle: PickerProps['jssStyle'];
}
const PickerTitle = (props: PickerTitleProps) => {
  const { position, jssStyle } = props;
  const { locale } = useConfig();
  if (!position) return null;
  return (
    <div className={jssStyle?.datePicker?.pickerTitle}>
      <span>{getLocale(locale, position === 'start' ? 'startTime' : 'endTime')}</span>
    </div>
  );
};

export default PickerTitle;
