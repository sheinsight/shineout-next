import Alert from './alert';

type RefAlert = typeof Alert;

export interface AlertComponent extends RefAlert {
  displayName: string;
}

const AlertComp: AlertComponent = Alert as AlertComponent;

AlertComp.displayName = 'ShineoutAlert';

export default AlertComp;
