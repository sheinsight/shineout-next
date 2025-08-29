/**
 * Mock 上传服务单独入口
 * 避免前端打包时引入服务端依赖
 */

export { default as uploadServer, startServer } from './server/upload-server';