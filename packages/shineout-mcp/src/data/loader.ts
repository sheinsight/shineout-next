import { ComponentData, ComponentIndex, SearchResult } from '../types/index.js';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let componentsIndex: ComponentIndex = {};
let dataLoaded = false;

export async function loadComponentData(): Promise<void> {
  if (dataLoaded) return;
  
  try {
    // 尝试从 all-components.json 读取
    const allComponentsPath = join(__dirname, 'generated', 'all-components.json');
    
    if (await fileExists(allComponentsPath)) {
      const dataContent = await readFile(allComponentsPath, 'utf-8');
      componentsIndex = JSON.parse(dataContent);
      
      // 检查是否需要从单个文件更新数据（如果单个文件更新了）
      await updateFromIndividualFiles();
    } else {
      // 如果没有合并文件，从单个文件构建索引
      await loadFromIndividualFiles();
    }
    
    dataLoaded = true;
    console.log(`Loaded ${Object.keys(componentsIndex).length} components`);
  } catch (error) {
    console.error('Failed to load component data, falling back to hardcoded data:', error);
    // 如果读取失败，使用硬编码数据作为备用
    componentsIndex = await loadHardcodedData();
    dataLoaded = true;
  }
}

/**
 * 检查文件是否存在
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * 从单个组件文件构建索引
 */
async function loadFromIndividualFiles(): Promise<void> {
  const generatedDir = join(__dirname, 'generated');
  
  try {
    const files = await import('fs').then(fs => fs.promises.readdir(generatedDir));
    
    for (const file of files) {
      if (file.endsWith('.json') && file !== 'all-components.json') {
        try {
          const filePath = join(generatedDir, file);
          const content = await readFile(filePath, 'utf-8');
          const componentData: ComponentData = JSON.parse(content);
          componentsIndex[componentData.name] = componentData;
        } catch (error) {
          console.warn(`Failed to load ${file}:`, error);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to read individual component files:', error);
  }
}

/**
 * 从单个文件更新数据（如果单个文件比合并文件新）
 */
async function updateFromIndividualFiles(): Promise<void> {
  const generatedDir = join(__dirname, 'generated');
  
  try {
    const files = await import('fs').then(fs => fs.promises.readdir(generatedDir));
    
    for (const file of files) {
      if (file.endsWith('.json') && file !== 'all-components.json') {
        try {
          const filePath = join(generatedDir, file);
          const content = await readFile(filePath, 'utf-8');
          const componentData: ComponentData = JSON.parse(content);
          
          // 检查是否有新的 props 数据
          const existing = componentsIndex[componentData.name];
          if (existing && (!existing.props || existing.props.length === 0) && 
              componentData.props && componentData.props.length > 0) {
            console.error(`[MCP Data] Updating ${componentData.name} with ${componentData.props.length} props`);
            componentsIndex[componentData.name] = componentData;
          }
        } catch (error) {
          console.error(`[MCP Data] Failed to update from ${file}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('[MCP Data] Failed to update from individual files:', error);
  }
}

export async function getComponentData(name: string): Promise<ComponentData | null> {
  await loadComponentData();
  return componentsIndex[name] || null;
}

export async function getAllComponents(category: string = 'all'): Promise<ComponentData[]> {
  await loadComponentData();
  
  const components = Object.values(componentsIndex);
  
  if (category === 'all') {
    return components;
  }
  
  return components.filter(comp => comp.category === category);
}

export async function searchInComponents(query: string, category?: string): Promise<SearchResult[]> {
  await loadComponentData();
  
  const components = Object.values(componentsIndex);
  const filteredComponents = category 
    ? components.filter(comp => comp.category === category)
    : components;
    
  const results: SearchResult[] = [];
  
  // 将查询字符串拆分为多个关键词
  const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
  console.error(`[MCP Data] Searching with keywords: ${keywords.join(', ')}`);
  
  for (const component of filteredComponents) {
    let relevance = 0;
    let matchedKeywords = 0;
    
    for (const keyword of keywords) {
      let keywordRelevance = 0;
      
      // 组件名称匹配（最高权重）
      if (component.name.toLowerCase() === keyword) {
        keywordRelevance += 20; // 完全匹配
      } else if (component.name.toLowerCase().includes(keyword)) {
        keywordRelevance += 10; // 部分匹配
      }
      
      // 描述匹配
      if (component.description.toLowerCase().includes(keyword)) {
        keywordRelevance += 5;
      }
      
      // Props 匹配
      if (component.props) {
        for (const prop of component.props) {
          if (prop.name.toLowerCase().includes(keyword)) {
            keywordRelevance += 3;
          }
          if (prop.description.toLowerCase().includes(keyword)) {
            keywordRelevance += 2;
          }
        }
      }
      
      // 子组件匹配
      if (component.subComponents) {
        for (const sub of component.subComponents) {
          const subName = typeof sub === 'string' ? sub : sub.name;
          if (subName.toLowerCase().includes(keyword)) {
            keywordRelevance += 4;
          }
        }
      }
      
      // 如果这个关键词有匹配，计入总分
      if (keywordRelevance > 0) {
        relevance += keywordRelevance;
        matchedKeywords++;
      }
    }
    
    // 只有当至少匹配一个关键词时才包含结果
    // 如果是多关键词搜索，匹配越多关键词的结果权重越高
    if (matchedKeywords > 0) {
      // 奖励匹配多个关键词的结果
      relevance = relevance * (1 + (matchedKeywords - 1) * 0.5);
      
      results.push({
        name: component.name,
        description: component.description,
        category: component.category,
        importPath: component.importPath,
        relevance,
      });
    }
  }
  
  console.error(`[MCP Data] Found ${results.length} components matching "${query}"`);
  
  // 按相关性排序，相关性高的在前
  return results.sort((a, b) => b.relevance - a.relevance);
}

// 硬编码的示例数据，后续会替换为从源码生成的数据
async function loadHardcodedData(): Promise<ComponentIndex> {
  return {
    Button: {
      name: 'Button',
      description: '按钮组件，用于触发操作',
      category: 'form',
      importPath: "import { Button } from 'shineout'",
      props: [
        {
          name: 'type',
          type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
          defaultValue: "'primary'",
          required: false,
          description: '按钮类型',
        },
        {
          name: 'size',
          type: "'small' | 'default' | 'large'",
          defaultValue: "'default'",
          required: false,
          description: '按钮大小',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: 'false',
          required: false,
          description: '是否禁用',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: 'false',
          required: false,
          description: '是否显示加载状态',
        },
      ],
      events: [
        {
          name: 'onClick',
          description: '点击按钮时的回调',
          signature: '(event: MouseEvent) => void',
        },
      ],
      examples: [
        {
          title: '基础用法',
          code: `import { Button } from 'shineout'

function App() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="success">成功按钮</Button>
    </div>
  )
}`,
        },
      ],
    },
    Input: {
      name: 'Input',
      description: '输入框组件，用于获取用户输入',
      category: 'form',
      importPath: "import { Input } from 'shineout'",
      props: [
        {
          name: 'value',
          type: 'string',
          required: false,
          description: '输入框的值',
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          description: '占位符文本',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: 'false',
          required: false,
          description: '是否禁用',
        },
      ],
      events: [
        {
          name: 'onChange',
          description: '输入值改变时的回调',
          signature: '(value: string) => void',
        },
      ],
      examples: [
        {
          title: '基础用法',
          code: `import { Input } from 'shineout'

function App() {
  const [value, setValue] = useState('')
  
  return (
    <Input 
      value={value}
      onChange={setValue}
      placeholder="请输入内容"
    />
  )
}`,
        },
      ],
    },
  };
}