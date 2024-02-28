import { styled } from '../jss-style';
import transferStyle, { TransferClasses } from './transfer';

const useTransferStyle = styled(transferStyle, 'transfer');

export { transferStyle, useTransferStyle };
export type { TransferClasses };
export default useTransferStyle;
