/**
 * cn - 本地上传服务
 *    -- 使用本地 mock 上传服务测试文件上传功能
 * en - Local Upload Service
 *    -- Use local mock upload service to test file upload functionality
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
      
      <Upload
        action="http://localhost:3001/api/upload?delay=3000"
        accept="*"
        value={value}
        htmlName="file"
        multiple
        limit={5}
        responseType="json"
        onSuccess={(res, file) => {
          console.log('上传成功:', res, file);
          return {
            name: file.name,
            url: res.data?.url,
            size: file.size
          };
        }}
        onProgress={(fileInfo) => {
          console.log('上传进度:', fileInfo.name, `${fileInfo.process}%`);
          return fileInfo;
        }}
        onChange={(v) => {
          console.log('文件列表变化:', v);
          setValue(v);
        }}
        onHttpError={(xhr, file) => {
          console.error('上传失败:', xhr, file);
          Message.error(`上传失败: ${file.name}`);
          return '上传失败';
        }}
        renderResult={(f) => (
          <div style={{ 
            padding: '8px 12px', 
            border: '1px solid #d9d9d9', 
            borderRadius: 4, 
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{f.name} ({(f.size / 1024).toFixed(1)}KB)</span>
            {f.url && (
              <a 
                href={`http://localhost:3001${f.url}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#1890ff' }}
              >
                查看文件
              </a>
            )}
          </div>
        )}
      >
        <Button>选择文件上传</Button>
      </Upload>
      
      <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
        <p>本示例使用本地 mock 上传服务，需要先启动服务：</p>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
          cd packages/mock{'\n'}
          npm run dev:upload
        </pre>
        <p>服务地址: http://localhost:3001</p>
        <p>支持的调试参数：</p>
        <ul style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          <li>delay=3000 - 延迟3秒响应</li>
          <li>fail=true - 模拟上传失败</li>
          <li>progress=10 - 模拟进度步骤</li>
        </ul>
        <p>示例: http://localhost:3001/api/upload?delay=3000&amp;fail=false</p>
      </div>
    </div>
  );
};

export default App;