import { styled } from '../jss-style';

import formItemStyle from './form-item';
import formStyle from './form';

const useFormStyle = styled(formStyle, 'form');
const useFormItemStyle = styled(formItemStyle, 'form-item');

export { formStyle, formItemStyle, useFormStyle, useFormItemStyle };

export default useFormStyle;
