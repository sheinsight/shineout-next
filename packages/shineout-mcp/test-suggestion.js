import { ComponentService } from './dist/tools/component-service.js';

const service = new ComponentService();

console.log('🧪 测试搜索建议功能...\n');

// 测试不存在的组件
const result = await service.searchComponents('datepicker calendar time');
console.log(result.content[0].text);