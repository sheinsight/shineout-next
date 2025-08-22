/**
 * cn - 本地图片上传
 *    -- 使用本地 mock 上传服务测试图片上传和预览功能
 * en - Local Image Upload
 *    -- Use local mock upload service to test image upload and preview functionality
 */
import React from 'react';
import { Upload, Button, Message } from 'shineout';

const App: React.FC = () => {
  const [value, setValue] = React.useState<any[]>([]);

  // 启动本地上传服务的提示
  const showServerTip = () => {
    Message.info(
      '请先启动本地上传服务：cd packages/mock && npm run dev:upload',
      5000
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="secondary" onClick={showServerTip}>
          如何启动上传服务？
        </Button>
      </div>
      
      <Upload.Image
        action="http://localhost:3001/api/upload"
        accept="image/*"
        value={value}
        htmlName="file"
        multiple
        limit={3}
        recoverAble
        leftHandler
        removeConfirm="确定要删除这张图片吗？"
        responseType="json"
        onSuccess={(res, file) => {
          console.log('图片上传成功:', res, file);
          // 返回完整的 URL，包含服务器地址
          return `http://localhost:3001${res.data?.url}`;
        }}
        onChange={(v) => {
          console.log('图片列表变化:', v);
          setValue(v);
        }}
        onHttpError={(xhr, file) => {
          console.error('图片上传失败:', xhr, file);
          Message.error(`图片上传失败: ${file.name}`);
          return '图片上传失败';
        }}
        validator={{
          size: (fileSize) => {
            if (fileSize > 5 * 1024 * 1024) {
              throw new Error('图片大小不能超过 5MB');
            }
          },
          ext: (ext) => {
            const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            if (!allowedExts.includes(ext.toLowerCase())) {
              throw new Error('只支持 jpg、png、gif、webp 格式的图片');
            }
          }
        }}
      />
      
      <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
        <p>本示例支持图片预览功能，使用本地 mock 上传服务：</p>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
          cd packages/mock{'\n'}
          npm run dev:upload
        </pre>
        <p>支持的图片格式：jpg、png、gif、webp</p>
        <p>最大文件大小：5MB</p>
        <p>最大文件数量：3张</p>
      </div>
    </div>
  );
};

export default App;