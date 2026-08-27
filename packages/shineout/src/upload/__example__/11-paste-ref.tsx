/**
 * cn -
 *    -- 通过 `getComponentRef` 获取组件实例方法。可调用 addFiles 编程式添加文件进行上传。
 *    -- 示例中通过监听页面级粘贴事件，将文件传递给 Upload 组件上传。
 * en -
 *    -- Use `getComponentRef` to get component instance methods. You can call addFiles to programmatically add files for upload.
 *    -- In this example, we listen to the page-level paste event and pass files to the Upload component.
 */
import React, { useEffect, useRef } from 'react';
import { Upload, TYPE } from 'shineout';

type UploadRef = TYPE.Upload.Ref;

const App: React.FC = () => {
  const uploadRef = useRef<UploadRef>();

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const files = e.clipboardData?.files;
      if (!files || files.length === 0) return;
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (imageFiles.length === 0) return;
      uploadRef.current?.addFiles(imageFiles);
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <Upload.Image
      accept='image/*'
      multiple
      limit={6}
      leftHandler
      getComponentRef={uploadRef}
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
  );
};

export default App;
