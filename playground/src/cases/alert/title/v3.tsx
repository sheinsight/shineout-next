import { Alert } from 'shineout-v3';

export default function Demo() {
  return (
    <Alert type='info' icon title='Heading' closable>
      This is a line of important text for alerting purposes
    </Alert>
  );
}
