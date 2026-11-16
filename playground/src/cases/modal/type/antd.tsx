import { Button, Modal } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <span data-bench='open'>
        <Button type='primary' onClick={() => Modal.info({ title: 'This is a info message', content: 'this is some information that user must know' })}>
          info
        </Button>
      </span>
      <Button onClick={() => Modal.confirm({ title: 'This is a message', content: 'this is show information' })}>show</Button>
      <Button danger onClick={() => Modal.error({ title: 'This is a error message', content: 'this is some information that user attended' })}>error</Button>
      <Button onClick={() => Modal.success({ title: 'This is a success message', content: 'this is some information that user successful operation' })}>success</Button>
      <Button onClick={() => Modal.warning({ title: 'This is a warning message', content: 'this is some information that user must know' })}>warning</Button>
    </div>
  );
}
