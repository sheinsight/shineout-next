import { ComponentService } from './dist/tools/component-service.js';

console.log('🧪 测试多关键词搜索功能...\n');

const service = new ComponentService();

async function testSearch(query, description) {
  console.log(`\n📍 ${description}`);
  console.log(`🔍 搜索: "${query}"`);
  
  const result = await service.searchComponents(query);
  const content = result.content[0].text;
  
  // 提取搜索结果数量
  const match = content.match(/找到 (\d+) 个相关组件/);
  if (match) {
    console.log(`✅ 找到 ${match[1]} 个组件`);
    
    // 提取组件名称
    const componentMatches = content.matchAll(/## ([A-Za-z]+)\n/g);
    const components = Array.from(componentMatches).map(m => m[1]);
    console.log(`📋 结果: ${components.slice(0, 5).join(', ')}${components.length > 5 ? '...' : ''}`);
  } else {
    console.log(`❌ 没有找到组件`);
    
    // 检查是否有搜索建议
    if (content.includes('搜索建议')) {
      console.log('💡 收到搜索建议');
    }
  }
}

// 运行测试
await testSearch('table form input select', '测试 1: 多关键词搜索');
await testSearch('Button', '测试 2: 单个组件名称（精确）');
await testSearch('button', '测试 3: 单个组件名称（小写）');
await testSearch('表单', '测试 4: 中文关键词');
await testSearch('data picker', '测试 5: 数据选择器相关');
await testSearch('modal dialog popup', '测试 6: 弹窗相关组件');
await testSearch('xyz123', '测试 7: 不存在的关键词（应显示建议）');

console.log('\n✨ 测试完成！');