import { setConfig, Message } from 'shineout';
import { getJssConfig } from '@sheinx/shineout-style';

const flush = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

const countMessageStyle = () =>
  Array.from(document.head.querySelectorAll('style')).filter((s) =>
    (s.getAttribute('data-meta') || '').startsWith('message'),
  ).length;

const showAndClose = async () => {
  Message.success('copied', 0);
  await flush();
  expect(countMessageStyle()).toBe(1);
  Message.close();
  await flush();
};

describe('Message[keepStyleSheet]', () => {
  afterEach(() => {
    setConfig({ keepStyleSheet: false });
  });
  test('should insert message style sheet when keepStyleSheet is enabled', async () => {
    expect(countMessageStyle()).toBe(0);
    setConfig({ keepStyleSheet: true });
    await flush();
    expect(countMessageStyle()).toBe(1);
  });
  test('should forward keepStyleSheet to jss config', () => {
    setConfig({ keepStyleSheet: true });
    expect(getJssConfig().keepStyleSheet).toBe(true);
    setConfig({ keepStyleSheet: false });
    expect(getJssConfig().keepStyleSheet).toBe(false);
  });
  test('should remove style sheet after unmount by default', async () => {
    await showAndClose();
    expect(countMessageStyle()).toBe(0);
  });
  test('should keep style sheet after unmount when keepStyleSheet is true', async () => {
    setConfig({ keepStyleSheet: true });
    await showAndClose();
    expect(countMessageStyle()).toBe(1);
  });
});
