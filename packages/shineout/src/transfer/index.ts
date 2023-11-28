import Transfer from './transfer';

type RefTransfer = typeof Transfer;

interface TransferComponent extends RefTransfer {
  displayName: string;
}

(Transfer as TransferComponent).displayName = 'ShineoutTransfer';
export default Transfer as TransferComponent;
