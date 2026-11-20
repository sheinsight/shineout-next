import { Button, Modal } from 'shineout-v2';

// 原示例的 onOk 返回一个 2 秒的 Promise（测确认按钮的 loading）；这里去掉，让场景能立刻点确认关掉
export default function Demo() {
  return (
    <span data-bench='open'>
      <Button
        outline
        onClick={() =>
          Modal.confirm({
            title: 'This is a confirm message',
            content: 'this is some information that user confirm',
            text: { ok: 'Yes', cancel: 'No' },
          })
        }
      >
        confirm
      </Button>
    </span>
  );
}
