import { styled } from '../jss-style';
import alertStyle from './alert';

const useAlertStyle = styled(alertStyle, 'alert');
export { alertStyle, useAlertStyle };
export type { AlertClasses } from './alert';
export default useAlertStyle;
