import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

// 扩展 Request 类型以包含 file 和 files
interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

// 响应数据类型
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  error?: string;
}

// 文件信息类型
interface FileInfo {
  filename: string;
  originalname: string;
  size: number;
  url: string;
  path: string;
}

// 文件列表项类型
interface FileListItem {
  filename: string;
  size: number;
  url: string;
  uploadTime: Date;
}

const app = express();
const PORT = 3001;

// 确保 uploads 目录存在
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 配置 CORS 允许跨域
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// 解析 JSON 请求体
app.use(express.json());

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, uploadsDir);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    // 生成唯一文件名：原文件名 + 时间戳 + 随机数
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000000);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    cb(null, `file-${timestamp}-${randomNum}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    // 可以在这里添加文件类型过滤
    cb(null, true);
  }
});

// 解析速率参数（如 "1M/s", "100kb/s"）
const parseSpeed = (speedStr: string): number => {
  if (!speedStr) return 0;
  
  const match = speedStr.toLowerCase().match(/^(\d+(?:\.\d+)?)(k|kb|m|mb)?\/s$/);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = match[2] || '';
  
  switch (unit) {
    case 'k':
    case 'kb':
      return value * 1024; // KB/s to bytes/s
    case 'm':
    case 'mb':
      return value * 1024 * 1024; // MB/s to bytes/s
    default:
      return value; // bytes/s
  }
};

// 模拟慢速上传的中间件
const simulateSlowUpload = (req: MulterRequest, res: Response, next: Function) => {
  const speed = parseSpeed(req.query.speed as string);
  
  if (!speed || !req.file) {
    return next();
  }

  const fileSize = req.file.size;
  const chunkSize = Math.min(8192, speed); // 8KB 或设定速率，取较小值
  const chunkDelay = (chunkSize / speed) * 1000; // 每个chunk的延迟时间（毫秒）
  const totalChunks = Math.ceil(fileSize / chunkSize);
  
  console.log('模拟上传速率:', {
    speed: `${speed} bytes/s`,
    fileSize,
    chunkSize,
    chunkDelay: `${chunkDelay}ms`,
    totalChunks,
    estimatedTime: `${(fileSize / speed).toFixed(1)}s`
  });

  // 设置响应头，准备流式响应
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });

  let sentChunks = 0;
  const responseData = {
    code: 0,
    message: '上传成功',
    data: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      path: req.file.path
    }
  };

  const sendChunk = () => {
    sentChunks++;
    const progress = (sentChunks / totalChunks) * 100;
    
    console.log(`发送chunk ${sentChunks}/${totalChunks}, 进度: ${progress.toFixed(1)}%`);
    
    if (sentChunks >= totalChunks) {
      // 发送最终响应
      res.end(JSON.stringify(responseData));
      console.log('上传模拟完成');
    } else {
      // 发送一个空chunk来模拟上传进度
      res.write('');
      setTimeout(sendChunk, chunkDelay);
    }
  };

  // 开始发送chunks
  setTimeout(sendChunk, chunkDelay);
};

// 上传成功接口
app.post('/api/upload', upload.single('file'), (req: MulterRequest, res: Response<ApiResponse<FileInfo>>) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        code: 1,
        message: '没有上传文件'
      });
    }

    // 从查询参数获取配置
    const delay = parseInt(req.query.delay as string) || 0; // 延迟时间（毫秒）
    const shouldFail = req.query.fail === 'true'; // 是否模拟失败
    const progressSteps = parseInt(req.query.progress as string) || 0; // 进度步骤数
    const speed = req.query.speed as string; // 上传速率（如 "1M/s", "100kb/s"）

    console.log('文件上传配置:', { delay, shouldFail, progressSteps, speed, filename: req.file.filename });

    // 模拟上传失败
    if (shouldFail) {
      setTimeout(() => {
        res.status(500).json({
          code: 1,
          message: '模拟上传失败',
          error: '服务器处理失败'
        });
      }, delay);
      return;
    }

    // 如果设置了速率，使用速率模拟
    if (speed && parseSpeed(speed) > 0) {
      return simulateSlowUpload(req, res, () => {});
    }

    // 模拟上传进度和延迟
    if (progressSteps > 0 || delay > 0) {
      const stepDelay = delay / Math.max(progressSteps, 1);
      let currentStep = 0;

      const sendProgress = () => {
        currentStep++;
        const progress = Math.min((currentStep / Math.max(progressSteps, 1)) * 100, 100);
        
        if (currentStep >= progressSteps || progress >= 100) {
          // 上传完成
          const fileInfo: FileInfo = {
            filename: req.file!.filename,
            originalname: req.file!.originalname,
            size: req.file!.size,
            url: `http://localhost:${PORT}/uploads/${req.file!.filename}`,
            path: req.file!.path
          };

          res.json({
            code: 0,
            message: '上传成功',
            data: fileInfo
          });
        } else {
          setTimeout(sendProgress, stepDelay);
        }
      };

      setTimeout(sendProgress, stepDelay);
    } else {
      // 立即返回结果
      const fileInfo: FileInfo = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
        path: req.file.path
      };

      res.json({
        code: 0,
        message: '上传成功',
        data: fileInfo
      });
    }
  } catch (error: any) {
    console.error('上传错误:', error);
    res.status(500).json({
      code: 1,
      message: '上传失败',
      error: error.message
    });
  }
});

// 上传失败测试接口
app.post('/api/upload/error', upload.single('file'), (req: MulterRequest, res: Response<ApiResponse>) => {
  res.status(500).json({
    code: 1,
    message: '模拟上传失败',
    error: '服务器内部错误'
  });
});

// 多文件上传接口
app.post('/api/upload/multiple', upload.array('files'), (req: MulterRequest, res: Response<ApiResponse<FileInfo[]>>) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        code: 1,
        message: '没有上传文件'
      });
    }

    const fileInfos: FileInfo[] = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      url: `http://localhost:${PORT}/uploads/${file.filename}`,
      path: file.path
    }));

    console.log(`多文件上传成功，共 ${(req.files as Express.Multer.File[]).length} 个文件`);
    
    res.json({
      code: 0,
      message: '批量上传成功',
      data: fileInfos
    });
  } catch (error: any) {
    console.error('批量上传错误:', error);
    res.status(500).json({
      code: 1,
      message: '批量上传失败',
      error: error.message
    });
  }
});

// 静态文件服务 - 访问上传的文件
app.use('/uploads', express.static(uploadsDir));

// 获取上传文件列表
app.get('/api/uploads', (req: Request, res: Response<ApiResponse<FileListItem[]>>) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    const fileInfos: FileListItem[] = files.map((filename: string) => {
      const filePath = path.join(uploadsDir, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        size: stats.size,
        url: `http://localhost:${PORT}/uploads/${filename}`,
        uploadTime: stats.birthtime
      };
    });

    res.json({
      code: 0,
      message: '获取文件列表成功',
      data: fileInfos
    });
  } catch (error: any) {
    console.error('获取文件列表错误:', error);
    res.status(500).json({
      code: 1,
      message: '获取文件列表失败',
      error: error.message
    });
  }
});

// 删除文件接口
app.delete('/api/upload/:filename', (req: Request, res: Response<ApiResponse>) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('文件删除成功:', filename);
      res.json({
        code: 0,
        message: '文件删除成功'
      });
    } else {
      res.status(404).json({
        code: 1,
        message: '文件不存在'
      });
    }
  } catch (error: any) {
    console.error('删除文件错误:', error);
    res.status(500).json({
      code: 1,
      message: '删除文件失败',
      error: error.message
    });
  }
});

// 健康检查接口
app.get('/api/health', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    code: 0,
    message: 'Mock 上传服务运行正常',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uploadsDir
    }
  });
});

// 启动服务器
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Mock 上传服务已启动:`);
    console.log(`   - 服务地址: http://localhost:${PORT}`);
    console.log(`   - 上传接口: http://localhost:${PORT}/api/upload`);
    console.log(`   - 多文件上传: http://localhost:${PORT}/api/upload/multiple`);
    console.log(`   - 文件列表: http://localhost:${PORT}/api/uploads`);
    console.log(`   - 健康检查: http://localhost:${PORT}/api/health`);
    console.log(`   - 文件存储: ${uploadsDir}`);
    console.log(`   - 文件访问: http://localhost:${PORT}/uploads/filename`);
  });
};

// 如果直接运行此文件，则启动服务器
if (require.main === module) {
  startServer();
}

export default app;
export { startServer };