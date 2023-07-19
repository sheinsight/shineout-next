import { styled } from '../jss-style';
import buttonStyle from './button';
import buttonGroupStyle from './button-group';

const useButtonStyle = styled(buttonStyle, 'button');
const useButtonGroupStyle = styled(buttonGroupStyle, 'button-group');

export { buttonStyle, useButtonStyle, useButtonGroupStyle };
export default useButtonStyle;
