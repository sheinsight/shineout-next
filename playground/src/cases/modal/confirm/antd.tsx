import { Button, Modal } from 'antd';

export default function Demo() {
  return (
    <span data-bench='open'>
      <Button
        onClick={() =>
          Modal.confirm({
            title: 'This is a confirm message',
            content: 'this is some information that user confirm',
            okText: 'Yes',
            cancelText: 'No',
          })
        }
      >
        confirm
      </Button>
    </span>
  );
}
