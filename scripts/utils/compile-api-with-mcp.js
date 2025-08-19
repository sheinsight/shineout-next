const fs = require('fs');
const path = require('path');
const { writeTemplate } = require('./write-template');
const { parseApi } = require('./parseapi');

const docDirName = '__doc__';
const templateApiPath = path.resolve(__dirname, '../doc-page-api.ejs');
const apiDir = path.join(__dirname, '../../docs', 'api');
const mcpDataDir = path.join(__dirname, '../../packages/shineout-mcp/src/data/generated');

// 读取 package.json 中的版本号
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const packageVersion = packageJson.version;

/**
 * 从组件目录提取基础信息
 */
function extractBasicInfo(componentDir) {
  try {
    const docPath = path.join(componentDir, docDirName, 'index.md');
    if (!fs.existsSync(docPath)) {
      return null;
    }

    const content = fs.readFileSync(docPath, 'utf-8');
    
    // 解析 YAML front matter
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) {
      return null;
    }

    const frontMatter = frontMatterMatch[1];
    const nameMatch = frontMatter.match(/name:\s*(.+)/);
    const groupMatch = frontMatter.match(/group:\s*(.+)/);
    
    // 提取描述 (# Describe 后的第一行中文描述)
    const describeMatch = content.match(/# Describe\n\n([^\n]+)/);
    
    return {
      name: nameMatch?.[1]?.trim() || '',
      group: groupMatch?.[1]?.trim() || '',
      description: describeMatch?.[1]?.trim() || '',
    };
  } catch (error) {
    console.error('Error extracting basic info:', error);
    return null;
  }
}

/**
 * 提取组件示例
 */
function extractExamples(componentDir) {
  try {
    const exampleDir = path.join(componentDir, '__example__');
    if (!fs.existsSync(exampleDir)) {
      return [];
    }

    const examples = [];
    const files = fs.readdirSync(exampleDir);
    
    // 按文件名排序，确保示例有序
    const sortedFiles = files
      .filter(file => file.endsWith('.tsx'))
      .sort((a, b) => {
        // 提取文件名中的序号
        const aMatch = a.match(/s-(\d+)/);
        const bMatch = b.match(/s-(\d+)/);
        if (aMatch && bMatch) {
          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }
        return a.localeCompare(b);
      });
    
    sortedFiles.forEach(file => {
      const filePath = path.join(exampleDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 解析示例注释块
      const commentMatch = content.match(/\/\*\*[\s\S]*?\*\//);
      let cnTitle = '';
      let enTitle = '';
      let cnDescription = '';
      let enDescription = '';
      
      if (commentMatch) {
        const comment = commentMatch[0];
        
        // 提取中文标题和描述
        const cnMatch = comment.match(/\*\s*cn\s*-\s*(.+?)(?:\n\s*\*\s*--\s*(.+?))?(?:\n|\*\/)/s);
        if (cnMatch) {
          cnTitle = cnMatch[1].trim();
          cnDescription = cnMatch[2] ? cnMatch[2].trim() : '';
        }
        
        // 提取英文标题和描述
        const enMatch = comment.match(/\*\s*en\s*-\s*(.+?)(?:\n\s*\*\s*--\s*(.+?))?(?:\n|\*\/)/s);
        if (enMatch) {
          enTitle = enMatch[1].trim();
          enDescription = enMatch[2] ? enMatch[2].trim() : '';
        }
      }
      
      // 确定示例场景类型
      let scenario = 'basic';
      const fileName = file.toLowerCase();
      
      if (fileName.includes('base') || fileName.includes('001')) {
        scenario = 'basic';
      } else if (fileName.includes('form') || fileName.includes('validation')) {
        scenario = 'form';
      } else if (fileName.includes('custom') || fileName.includes('render')) {
        scenario = 'custom';
      } else if (fileName.includes('advanced') || parseInt(fileName.match(/s-(\d+)/)?.[1] || '0') > 10) {
        scenario = 'advanced';
      }
      
      examples.push({
        name: file.replace('.tsx', ''),
        title: cnTitle || enTitle || file.replace('.tsx', ''),
        titleEn: enTitle,
        titleCn: cnTitle,
        description: cnDescription || enDescription || '',
        descriptionEn: enDescription,
        descriptionCn: cnDescription,
        scenario,
        code: content,
        language: 'tsx'
      });
    });

    // 返回所有示例
    return examples;
  } catch (error) {
    console.error('Error extracting examples:', error);
    return [];
  }
}

/**
 * 提取子组件
 */
function extractSubComponents(componentDir) {
  try {
    const indexPath = path.join(componentDir, 'index.ts');
    if (!fs.existsSync(indexPath)) {
      return [];
    }

    const content = fs.readFileSync(indexPath, 'utf-8');
    const subComponents = [];
    
    // 查找接口定义中的子组件
    const interfaceMatch = content.match(/export interface \w+Component[\s\S]*?\{([\s\S]*?)\}/);
    if (interfaceMatch) {
      const interfaceBody = interfaceMatch[1];
      const subComponentMatches = interfaceBody.matchAll(/(\w+):\s*typeof/g);
      
      for (const match of subComponentMatches) {
        const subComponentName = match[1];
        if (!['displayName'].includes(subComponentName)) {
          subComponents.push(subComponentName);
        }
      }
    }
    
    return subComponents;
  } catch (error) {
    console.error('Error extracting sub components:', error);
    return [];
  }
}

/**
 * 映射组件分类
 */
function mapCategory(group) {
  const categoryMap = {
    'General': 'general',
    'Layout': 'layout',
    'Data Display': 'display',
    'Data Entry': 'form',
    'Feedback': 'feedback',
    'Navigation': 'navigation',
    'Utils': 'utils'
  };
  return categoryMap[group] || 'other';
}

/**
 * 转换 API 数据为 MCP 格式
 */
function convertToMcpFormat(componentName, apis, basicInfo, examples, subComponents) {
  // 找到主组件的 API 数据
  const mainApi = apis.find(api => 
    api.title === componentName || 
    api.title.split('.')[0] === componentName
  ) || apis[0];

  if (!mainApi) {
    return null;
  }

  // 转换属性格式
  const props = mainApi.properties.map(prop => ({
    name: prop.name,
    type: prop.type.replace(/\\\"/g, '"').replace(/\s+/g, ' ').trim(),
    required: prop.required,
    defaultValue: prop.tag.default || undefined,
    description: prop.tag.cn || prop.tag.en || '',
    whenCn: prop.tag.whenCn || undefined,
    whenEn: prop.tag.whenEn || undefined,
    version: prop.tag.version || undefined
  }));

  // 转换示例格式以符合 MCP 的 ComponentExample 接口
  const mcpExamples = examples.map(ex => ({
    title: ex.titleEn || ex.title,
    description: ex.descriptionEn || ex.description,
    scenario: ex.scenario,
    code: ex.code
  }));

  // 构建 MCP 数据结构
  const mcpData = {
    name: componentName,
    description: basicInfo?.description || mainApi.cn || mainApi.en || '',
    category: mapCategory(basicInfo?.group || 'General'),
    importPath: `import { ${componentName} } from 'shineout'`,
    props,
    examples: mcpExamples,
    subComponents,
    version: packageVersion,
    // 添加使用注意事项
    notes: {
      cn: mainApi.tag?.notesCn || undefined,
      en: mainApi.tag?.notesEn || undefined
    },
    // 添加额外的 API 相关信息
    apiSummary: {
      totalProps: props.length,
      requiredProps: props.filter(p => p.required).length,
      propsWithWhen: props.filter(p => p.whenCn || p.whenEn).length,
      examplesCount: mcpExamples.length
    }
  };

  // 处理子组件的 API
  if (apis.length > 1) {
    mcpData.subComponentApis = {};
    
    // 将 subComponents 从字符串数组转换为对象数组，包含 when 信息
    const subComponentsWithInfo = [];
    
    apis.slice(1).forEach(api => {
      const subName = api.title.split('.').pop();
      if (subName && subComponents.includes(subName)) {
        // 提取子组件的 when 描述
        const whenDescriptionCn = api.tag?.whenCn || '';
        const whenDescriptionEn = api.tag?.whenEn || '';
        
        subComponentsWithInfo.push({
          name: subName,
          description: api.cn || api.en || '',
          whenCn: whenDescriptionCn,
          whenEn: whenDescriptionEn,
        });
        
        mcpData.subComponentApis[subName] = {
          whenCn: whenDescriptionCn,
          whenEn: whenDescriptionEn,
          description: api.cn || api.en || '',
          props: api.properties.map(prop => ({
            name: prop.name,
            type: prop.type.replace(/\\\"/g, '"').replace(/\s+/g, ' ').trim(),
            required: prop.required,
            defaultValue: prop.tag.default || undefined,
            description: prop.tag.cn || prop.tag.en || '',
            whenCn: prop.tag.whenCn || undefined,
            whenEn: prop.tag.whenEn || undefined,
            version: prop.tag.version || undefined
          }))
        };
      }
    });
    
    // 如果有子组件信息，更新 subComponents 字段
    if (subComponentsWithInfo.length > 0) {
      mcpData.subComponents = subComponentsWithInfo;
    }
  }

  return mcpData;
}

/**
 * 增强的编译函数，同时生成 API 文档和 MCP 数据
 */
function compile(dirPath, componentPath) {
  const pattern = new RegExp(`packages/(.*?)/`, 'i');
  const match = dirPath.match(pattern);
  if (!match[1]) return;

  const chunkModuleName = match[1];
  const chunkModuleAPIPath = path.join(apiDir, chunkModuleName);

  if (!fs.existsSync(chunkModuleAPIPath)) {
    fs.mkdirSync(chunkModuleAPIPath, { recursive: true });
  }

  // 确保 MCP 数据目录存在
  if (!fs.existsSync(mcpDataDir)) {
    fs.mkdirSync(mcpDataDir, { recursive: true });
  }

  const allMcpData = {};
  let processedCount = 0;

  /**
   * 处理单个组件
   */
  function makeApi(dir) {
    const componentDir = path.join(dirPath, dir);
    
    // 读取 dir下面的 **.type.ts 文件
    const types = fs.readdirSync(componentDir).filter((i) => i.endsWith('.type.ts'));
    const apis = types
      .reduce((acc, type) => {
        const api = parseApi(chunkModuleName, `./src/${dir}/${type}`);
        return [...acc, ...api];
      }, [])
      .sort((a, b) => (a.sort || 0) - (b.sort || 0));

    // 生成原有的 API 文档
    writeTemplate({
      templatePath: templateApiPath,
      targetPath: chunkModuleAPIPath,
      fileName: `${dir}.ts`,
      needPrettier: false,
      ejsVars: {
        api: apis,
      },
    });

    // 生成 MCP 数据
    if (apis.length > 0) {
      // 提取组件名（PascalCase）
      const componentName = dir.split('-').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join('');

      // 提取额外信息
      const basicInfo = extractBasicInfo(componentDir);
      const examples = extractExamples(componentDir);
      const subComponents = extractSubComponents(componentDir);

      // 转换为 MCP 格式
      const mcpData = convertToMcpFormat(componentName, apis, basicInfo, examples, subComponents);
      
      if (mcpData) {
        // 保存单个组件的 MCP 数据
        fs.writeFileSync(
          path.join(mcpDataDir, `${dir}.json`),
          JSON.stringify(mcpData, null, 2)
        );
        
        allMcpData[componentName] = mcpData;
        processedCount++;
        
        console.log(`✅ Generated MCP data for ${componentName} (${mcpData.apiSummary.totalProps} props, ${mcpData.apiSummary.examplesCount} examples, ${mcpData.apiSummary.propsWithWhen} with @when)`);
      }
    }
  }

  if (!componentPath) {
    // 处理所有组件
    const dirs = fs.readdirSync(dirPath).filter(dir => {
      const mdPath = path.join(dirPath, dir, docDirName, 'index.md');
      return fs.existsSync(mdPath);
    });
    
    console.log(`📦 Found ${dirs.length} components to process\n`);
    
    dirs.forEach((dir, index) => {
      console.log(`[${index + 1}/${dirs.length}] Processing ${dir}...`);
      makeApi(dir);
    });

    // 生成 MCP 索引文件
    const indexData = {
      lastUpdated: new Date().toISOString(),
      version: packageVersion,
      totalComponents: Object.keys(allMcpData).length,
      components: Object.keys(allMcpData),
      categories: {}
    };

    // 按分类统计
    Object.values(allMcpData).forEach(comp => {
      const category = comp.category;
      if (!indexData.categories[category]) {
        indexData.categories[category] = [];
      }
      indexData.categories[category].push(comp.name);
    });

    // 保存索引文件
    fs.writeFileSync(
      path.join(mcpDataDir, '..', 'index.json'),
      JSON.stringify(indexData, null, 2)
    );

    // 保存完整数据文件
    fs.writeFileSync(
      path.join(mcpDataDir, 'all-components.json'),
      JSON.stringify(allMcpData, null, 2)
    );

    console.log(`\n📦 MCP Data Generation Complete!`);
    console.log(`   - Total components: ${processedCount}`);
    console.log(`   - Output directory: ${mcpDataDir}`);
    console.log(`   - Categories:`, indexData.categories);
  } else {
    // 处理单个组件
    makeApi(componentPath);
  }
}

module.exports = {
  compileApiWithMcp: compile,
};