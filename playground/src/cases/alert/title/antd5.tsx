import { Alert } from 'antd-v5';

export default function Demo() {
  return (
    <Alert
      showIcon
      closable
      type='info'
      message='Heading'
      description='This is a line of important text for alerting purposes'
    />
  );
}
