import { Button, Modal } from 'shineout-v3';

// 原示例用 Message 提示选择结果；这里去掉（Message 的开销不属于 Modal）
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button mode='outline' onClick={() => Modal.confirm({ title: 'This is a confirm message', content: 'the cancel button will be focus', text: { ok: 'ok', cancel: 'cancel' }, autoFocusButton: 'cancel' })}>
        cancel
      </Button>
      <span data-bench='open'>
        <Button mode='outline' onClick={() => Modal.confirm({ title: 'This is a confirm message', content: 'the ok button will be focus', text: { ok: 'ok', cancel: 'cancel' }, autoFocusButton: 'ok' })}>
          ok
        </Button>
      </span>
    </div>
  );
}
