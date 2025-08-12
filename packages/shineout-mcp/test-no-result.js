import { ComponentService } from './dist/tools/component-service.js';

const service = new ComponentService();

console.log('🧪 测试搜索建议功能（无结果情况）...\n');

// 测试完全不存在的关键词
const result = await service.searchComponents('xyz123 abc456');
console.log(result.content[0].text);