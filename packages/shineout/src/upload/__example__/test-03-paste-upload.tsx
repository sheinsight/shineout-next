/**
 * cn - 自定义粘贴上传
 *    -- 通过监听 paste 事件获取剪贴板中的文件，触发 Upload 内部的文件处理逻辑。
 *    -- 点击上传区域使其获得焦点后，即可通过 Ctrl+V / Cmd+V 粘贴图片上传。
 * en - Custom Paste to Upload
 *    -- Listen to the paste event to extract files from the clipboard and trigger the Upload's internal file handling logic.
 *    -- Click the upload area to focus it, then use Ctrl+V / Cmd+V to paste images for uploading.
 */
import React, { useRef } from 'react';
import { Upload } from 'shineout';

const App: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const files = e.clipboardData?.files;
    if (!files || files.length === 0) return;

    // 找到 Upload 内部隐藏的 <input type="file"> 并通过 DataTransfer 注入文件
    const input = wrapperRef.current?.querySelector('input[type="file"]') as HTMLInputElement;
    if (!input) return;

    // 利用 DataTransfer API 设置文件
    const dt = new DataTransfer();
    Array.from(files).forEach((file) => dt.items.add(file));
    input.files = dt.files;

    // 手动触发 change 事件让 Upload 处理文件
    const event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
  };

  return (
    <div
      ref={wrapperRef}
      onPaste={handlePaste}
      tabIndex={0}
      style={{
        outline: 'none',
        border: '2px dashed #d9d9d9',
        borderRadius: 8,
        padding: 24,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#1890ff';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#d9d9d9';
      }}
    >
      <Upload.Image
        accept='image/*'
        multiple
        limit={6}
        leftHandler
        request={(options) => {
          const { file, onLoad } = options;
          if (file) {
            setTimeout(() => {
              onLoad({ status: 200 });
            }, 500);
          }
        }}
        onSuccess={(_res, file) => {
          return file instanceof File ? URL.createObjectURL(file) : file;
        }}
      />
      <p style={{ margin: '12px 0 0', color: '#999', fontSize: 13, textAlign: 'center' }}>
        点击此区域获得焦点后，可直接 Ctrl+V / Cmd+V 粘贴图片上传
      </p>
    </div>
  );
};

export default App;
