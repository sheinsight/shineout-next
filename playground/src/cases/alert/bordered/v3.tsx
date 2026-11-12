import { Alert } from 'shineout-v3';

export default function Demo() {
  return (
    <Alert icon type='info' bordered={false}>
      This is a line of important text for alerting purposes
    </Alert>
  );
}
