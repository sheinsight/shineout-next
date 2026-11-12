import { Alert } from 'antd';

export default function Demo() {
  return (
    <Alert
      showIcon
      closable
      type='info'
      title='Heading'
      description='This is a line of important text for alerting purposes'
    />
  );
}
