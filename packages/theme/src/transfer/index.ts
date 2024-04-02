import token, { tokenToVars } from '../token';
import Transfer from './transfer';

export { Transfer };
export default tokenToVars(Transfer, token);
