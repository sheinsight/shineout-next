# Mock 服务

本包提供了用于开发和测试的 Mock 服务，包括用户数据模拟和文件上传服务。

## 文件上传服务

### 快速开始

1. 安装依赖（在项目根目录）：
```bash
pnpm install
```

2. 启动上传服务：
```bash
cd packages/mock
npm run dev:upload
```

3. 服务将在 `http://localhost:3001` 启动

### API 接口

#### 单文件上传
- **URL**: `POST /api/upload`
- **参数**: `file` (FormData)
- **响应**:
```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "filename": "file-1671234567890-123456789.jpg",
    "originalname": "example.jpg",
    "size": 102400,
    "url": "/uploads/file-1671234567890-123456789.jpg",
    "path": "/path/to/uploads/file-1671234567890-123456789.jpg"
  }
}
```

#### 多文件上传
- **URL**: `POST /api/upload/multiple`
- **参数**: `files` (FormData Array)
- **响应**: 返回文件数组

#### 上传失败测试
- **URL**: `POST /api/upload/error`
- **用途**: 测试上传失败的情况

#### 文件列表
- **URL**: `GET /api/uploads`
- **响应**: 返回已上传的所有文件列表

#### 删除文件
- **URL**: `DELETE /api/upload/:filename`
- **参数**: `filename` (路径参数)

#### 健康检查
- **URL**: `GET /api/health`
- **用途**: 检查服务是否正常运行

### 文件存储

- 上传的文件存储在 `packages/mock/uploads/` 目录下
- 文件名格式：`file-{timestamp}-{randomNumber}.{extension}`
- 可通过 `http://localhost:3001/uploads/{filename}` 访问文件

### 特性

- ✅ 跨域支持 (CORS)
- ✅ 单文件和多文件上传
- ✅ 文件大小限制 (10MB)
- ✅ 文件类型过滤
- ✅ 上传进度支持
- ✅ 错误处理
- ✅ 静态文件服务
- ✅ TypeScript 支持

### 在 Upload 组件中使用

```tsx
import { Upload } from 'shineout';

const App = () => (
  <Upload
    action="http://localhost:3001/api/upload"
    htmlName="file"
    onSuccess={(res, file) => {
      return {
        name: file.name,
        url: res.data?.url
      };
    }}
  >
    选择文件
  </Upload>
);
```

### 注意事项

1. 确保服务已启动再使用 Upload 组件
2. 默认端口是 3001，如有冲突请修改 `upload-server.ts` 中的 PORT 配置
3. 文件会持久化存储在本地，可通过删除接口或手动清理 uploads 目录

## 开发

### 项目结构

```
packages/mock/
├── src/
│   ├── upload-request.ts     # 上传请求工具函数（前端可用）
│   ├── start-upload-server.ts # 服务启动脚本
│   ├── mock/                # 模拟数据
│   └── index.ts             # 前端代码导出
├── server/
│   └── upload-server.ts     # 上传服务主文件（服务端专用）
├── uploads/                 # 文件存储目录
├── server.ts               # 服务端代码导出
└── package.json            # 包配置
```

### 扩展功能

可以根据需要扩展更多功能：

- 文件类型验证
- 图片缩放处理
- 文件加密/解密
- 数据库存储文件信息
- 文件分片上传
- 断点续传