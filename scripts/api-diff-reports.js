const fs = require('fs');
const path = require('path');

function scanDiffReports() {
  const componentsDir = path.join(__dirname, '../packages/shineout/src');
  const diffReports = [];
  
  try {
    // 扫描所有组件目录
    const components = fs.readdirSync(componentsDir);
    
    components.forEach(component => {
      const componentPath = path.join(componentsDir, component);
      const diffPath = path.join(componentPath, '__diff__');
      
      // 检查是否存在 __diff__ 目录
      if (fs.existsSync(diffPath) && fs.statSync(diffPath).isDirectory()) {
        const versions = fs.readdirSync(diffPath);
        
        versions.forEach(version => {
          const versionPath = path.join(diffPath, version);
          const indexPath = path.join(versionPath, 'index.md');
          
          // 检查是否存在 index.md 文件
          if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
            diffReports.push({
              component,
              version,
              path: `packages/shineout/src/${component}/__diff__/${version}/index.md`
            });
          }
        });
      }
    });
    
    // 按版本排序
    diffReports.sort((a, b) => {
      // 提取主版本号和次版本号
      const getVersionParts = (version) => {
        const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-beta\.(\d+))?$/);
        if (match) {
          return {
            major: parseInt(match[1]),
            minor: parseInt(match[2]),
            patch: parseInt(match[3]),
            beta: match[4] ? parseInt(match[4]) : null
          };
        }
        return null;
      };
      
      const aParts = getVersionParts(a.version);
      const bParts = getVersionParts(b.version);
      
      if (!aParts || !bParts) return 0;
      
      // 比较版本号（降序）
      if (aParts.major !== bParts.major) return bParts.major - aParts.major;
      if (aParts.minor !== bParts.minor) return bParts.minor - aParts.minor;
      if (aParts.patch !== bParts.patch) return bParts.patch - aParts.patch;
      
      // 正式版本优先于 beta 版本
      if (aParts.beta === null && bParts.beta !== null) return -1;
      if (aParts.beta !== null && bParts.beta === null) return 1;
      
      // beta 版本之间比较
      if (aParts.beta !== null && bParts.beta !== null) {
        return bParts.beta - aParts.beta;
      }
      
      return 0;
    });
    
    // 生成适合菜单使用的数据结构
    const menuData = {};
    
    diffReports.forEach(report => {
      if (!menuData[report.version]) {
        menuData[report.version] = [];
      }
      menuData[report.version].push(report.component);
    });
    
    // 转换为数组格式
    const menuArray = Object.entries(menuData).map(([version, components]) => ({
      version,
      components
    }));
    
    return {
      reports: diffReports,
      menu: menuArray,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error scanning diff reports:', error);
    return {
      reports: [],
      menu: [],
      error: error.message
    };
  }
}

// 读取特定的 diff 报告内容
function getDiffContent(component, version) {
  const filePath = path.join(__dirname, `../packages/shineout/src/${component}/__diff__/${version}/index.md`);
  
  try {
    if (fs.existsSync(filePath)) {
      return {
        content: fs.readFileSync(filePath, 'utf-8'),
        error: null
      };
    } else {
      return {
        content: null,
        error: `Diff report not found for ${component} ${version}`
      };
    }
  } catch (error) {
    return {
      content: null,
      error: error.message
    };
  }
}

module.exports = {
  scanDiffReports,
  getDiffContent
};