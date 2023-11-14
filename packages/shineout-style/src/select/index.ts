import { styled } from '../jss-style';
import selectStyle, { SelectClasses } from './select';

const useSelectStyle = styled(selectStyle, 'select');
export type { SelectClasses };
export { selectStyle, useSelectStyle };
export default useSelectStyle;
