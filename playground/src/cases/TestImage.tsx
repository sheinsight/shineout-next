/**
 * 🔴 Image Gallery 命令式调用测试
 *
 * Image 组件点击预览时通过 ReactRender 将 ImageGallery 渲染到动态容器。
 */
import { useState } from 'react';

export default function TestImage() {
  const [log, setLog] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [Image, setImage] = useState<any>(null);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const loadImage = async () => {
    try {
      const mod = await import('shineout');
      setImage(() => mod.Image);
      setLoaded(true);
      addLog('Image 模块加载成功');
    } catch (err: any) {
      addLog(`❌ Image 模块加载失败: ${err.message}`);
      console.error(err);
    }
  };

  const images = [
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  ];

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Image Gallery 命令式测试</h3>
      <p style={{ color: '#999', fontSize: 13 }}>
        点击图片预览时使用 ReactRender 渲染 ImageGallery。如果图片点击后没有弹出预览，说明
        ReactRender 在 React 19 下失效。
      </p>

      {!loaded ? (
        <button onClick={loadImage}>加载 Image 模块</button>
      ) : (
        <div>
          <p>请点击下方图片测试预览功能：</p>
          {Image && (
            <Image.Group>
              {images.map((src, i) => (
                <Image
                  key={i}
                  width={120}
                  height={80}
                  fit="cover"
                  src={src}
                  style={{ marginRight: 8 }}
                />
              ))}
            </Image.Group>
          )}
        </div>
      )}

      <details open style={{ marginTop: 16 }}>
        <summary>日志 ({log.length})</summary>
        <pre style={{ background: '#1a1a2e', color: '#0f0', padding: 12, borderRadius: 6, fontSize: 12, maxHeight: 200, overflow: 'auto' }}>
          {log.length === 0 ? '等待操作...' : log.join('\n')}
        </pre>
      </details>
    </div>
  );
}
