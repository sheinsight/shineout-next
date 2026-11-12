import { BorderBeam } from 'shineout-v3';
import { panel } from '../_shared/panel';

// 原示例用 react-jss 写悬浮样式，这里改成一段普通 CSS，避免用例依赖 jss，
// 也不会往 JSS 的样式表里再多插入一张表而影响计时
const CSS = `
.bench-beam-host { position: relative; width: 360px; }
.bench-beam { opacity: 0; transition: opacity 0.2s ease-in-out; }
.bench-beam::before { animation-play-state: paused; }
.bench-beam-host:hover > .bench-beam { opacity: 1; }
.bench-beam-host:hover > .bench-beam::before { animation-play-state: running; }
`;

export default function Demo() {
  return (
    <>
      <style>{CSS}</style>
      <BorderBeam className='bench-beam'>
        <div className='bench-beam-host' style={{ ...panel, width: 360 }}>
          <strong>Hover preview</strong>
          <p style={{ margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' }}>
            The beam is visible while this container is hovered.
          </p>
        </div>
      </BorderBeam>
    </>
  );
}
