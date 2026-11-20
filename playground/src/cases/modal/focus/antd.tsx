import { Button, Modal } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button onClick={() => Modal.confirm({ title: 'This is a confirm message', content: 'the cancel button will be focus', okText: 'ok', cancelText: 'cancel', focusable: { autoFocusButton: 'cancel' } })}>
        cancel
      </Button>
      <span data-bench='open'>
        <Button onClick={() => Modal.confirm({ title: 'This is a confirm message', content: 'the ok button will be focus', okText: 'ok', cancelText: 'cancel', focusable: { autoFocusButton: 'ok' } })}>
          ok
        </Button>
      </span>
    </div>
  );
}
