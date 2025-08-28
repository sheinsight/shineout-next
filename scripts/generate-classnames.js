const fs = require('fs');
const path = require('path');

// 驼峰转短横线
function camelToDash(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// 生成className
function generateClassName(namespace, key) {
  if (key === 'rootClass') {
    return `soui-${namespace}`;
  }
  return `soui-${namespace}-${camelToDash(key)}`;
}

// 读取样式文件并解析className keys
function parseStyleFile(stylePath) {
  try {
    const content = fs.readFileSync(stylePath, 'utf8');
    
    // 匹配样式对象的定义 - 支持多种命名方式
    let styleMatch = content.match(/const\s+\w+Style:\s*JsStyles<[^>]+>\s*=\s*\{([\s\S]*?)\};/);
    if (!styleMatch) {
      // 尝试匹配其他格式，如 const input: JsStyles<...> = {...}
      styleMatch = content.match(/const\s+\w+:\s*JsStyles<[^>]+>\s*=\s*\{([\s\S]*?)\};/);
    }
    
    if (!styleMatch) {
      console.error(`No JsStyles definition found in ${stylePath}`);
      return [];
    }
    
    const styleContent = styleMatch[1];
    
    // 提取所有key，包括解构赋值的key
    const keys = [];
    
    // 匹配直接定义的key
    const keyRegex = /(\w+):\s*\{/g;
    let match;
    
    while ((match = keyRegex.exec(styleContent)) !== null) {
      const key = match[1];
      // 排除keyframes等特殊key
      if (!key.startsWith('@keyframes')) {
        keys.push(key);
      }
    }
    
    // 匹配解构赋值的key，如 ...resetWrapper, ...resetGroup
    const spreadMatches = styleContent.match(/\.\.\.(\w+)/g);
    if (spreadMatches) {
      spreadMatches.forEach(match => {
        const varName = match.substring(3); // 去掉 '...'
        // 查找变量定义，提取其中的key
        const varDefRegex = new RegExp(`const\\s+\\{[^}]*\\}\\s*=\\s*${varName}`);
        const varDefMatch = content.match(varDefRegex);
        if (varDefMatch) {
          const destructureMatch = varDefMatch[0].match(/\{([^}]+)\}/);
          if (destructureMatch) {
            const destructuredKeys = destructureMatch[1]
              .split(',')
              .map(k => k.trim())
              .filter(k => k && !k.startsWith('...'))
              .map(k => k.split(':')[0].trim()); // 处理重命名的情况
            keys.push(...destructuredKeys);
          }
        }
      });
    }
    
    return [...new Set(keys)]; // 去重
  } catch (error) {
    console.error(`Error parsing style file ${stylePath}:`, error.message);
    return [];
  }
}

// 生成单个组件的classname.json
function generateComponentClassNames(componentName) {
  const stylePath = path.join(__dirname, `../packages/shineout-style/src/${componentName.toLowerCase()}/${componentName.toLowerCase()}.ts`);
  
  if (!fs.existsSync(stylePath)) {
    console.error(`Style file not found: ${stylePath}`);
    return null;
  }
  
  const keys = parseStyleFile(stylePath);
  if (keys.length === 0) {
    console.error(`No style keys found for component: ${componentName}`);
    return null;
  }
  
  const classNames = keys.map(key => generateClassName(componentName.toLowerCase(), key));
  
  return classNames;
}

// 生成所有组件的classname.json文件
function generateAllClassNames() {
  const styleDir = path.join(__dirname, '../packages/shineout-style/src');
  
  if (!fs.existsSync(styleDir)) {
    console.error('Style directory not found:', styleDir);
    return;
  }
  
  const components = fs.readdirSync(styleDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['jss-style', 'common'].includes(name)); // 排除非组件目录
  
  console.log('Found components:', components);
  
  components.forEach(component => {
    console.log(`\nGenerating classNames for ${component}...`);
    
    const classNames = generateComponentClassNames(component);
    
    if (classNames) {
      const outputDir = path.join(__dirname, `../packages/shineout/src/${component}/__mcp__`);
      const outputFile = path.join(outputDir, 'classname.json');
      
      // 确保目录存在
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(outputFile, JSON.stringify(classNames, null, 2));
      console.log(`✅ Generated: ${outputFile}`);
      console.log(`   ClassNames: ${classNames.length} items`);
    } else {
      console.log(`❌ Failed to generate classNames for ${component}`);
    }
  });
}

// 如果直接运行此脚本
if (require.main === module) {
  const componentName = process.argv[2];
  
  if (componentName) {
    // 生成单个组件
    console.log(`Generating classNames for ${componentName}...`);
    const classNames = generateComponentClassNames(componentName);
    
    if (classNames) {
      console.log('Generated classNames:', JSON.stringify(classNames, null, 2));
    }
  } else {
    // 生成所有组件
    console.log('Generating classNames for all components...');
    generateAllClassNames();
  }
}

module.exports = {
  generateComponentClassNames,
  generateAllClassNames,
  camelToDash,
  generateClassName
};