#!/usr/bin/env node

/**
 * Shineout 版本 Diff 分析工具
 * 用于分析两个版本间组件变更的详细信息
 * 使用方法: pnpm diff [current] [target]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ShineoutDiffAnalyzer {
  constructor() {
    this.gitTags = [];
    this.packagePath = path.join(__dirname, '../packages/shineout/src');
  }

  /**
   * 获取所有 git tags 并排序
   */
  getAllTags() {
    try {
      const tags = execSync('git tag | grep "^version-"', { encoding: 'utf-8' })
        .split('\n')
        .filter(Boolean)
        .map(tag => tag.replace('version-', ''))
        .filter(tag => /^\d+\.\d+\.\d+(-beta\.\d+)?$/.test(tag));
      
      this.gitTags = tags.sort((a, b) => {
        const [aMajor, aMinor, aPatch] = this.parseVersion(a);
        const [bMajor, bMinor, bPatch] = this.parseVersion(b);
        
        if (aMajor !== bMajor) return aMajor - bMajor;
        if (aMinor !== bMinor) return aMinor - bMinor;
        return this.comparePatchVersion(aPatch, bPatch);
      });
      
      return this.gitTags;
    } catch (error) {
      console.error('获取 git tags 失败:', error.message);
      return [];
    }
  }

  /**
   * 解析版本号
   */
  parseVersion(version) {
    const match = version.match(/^(\d+)\.(\d+)\.(.+)$/);
    if (!match) {
      console.error(`无法解析版本号: ${version}`);
      return [0, 0, '0'];
    }
    return [parseInt(match[1]), parseInt(match[2]), match[3]];
  }

  /**
   * 比较 patch 版本（包括 beta）
   */
  comparePatchVersion(a, b) {
    const aMatch = a.match(/^(\d+)(?:-beta\.(\d+))?$/);
    const bMatch = b.match(/^(\d+)(?:-beta\.(\d+))?$/);
    
    if (!aMatch || !bMatch) {
      return 0;
    }
    
    const aPatch = parseInt(aMatch[1]);
    const bPatch = parseInt(bMatch[1]);
    
    if (aPatch !== bPatch) return aPatch - bPatch;
    
    // 正式版本大于 beta 版本
    if (!aMatch[2] && bMatch[2]) return 1;
    if (aMatch[2] && !bMatch[2]) return -1;
    
    // 都是 beta，比较 beta 号
    if (aMatch[2] && bMatch[2]) {
      return parseInt(aMatch[2]) - parseInt(bMatch[2]);
    }
    
    return 0;
  }

  /**
   * 获取版本跨度内的所有正式版本
   */
  getVersionsInRange(fromVersion, toVersion) {
    // 获取所有 tags
    this.getAllTags();
    
    const fromIndex = this.gitTags.indexOf(fromVersion);
    const toIndex = this.gitTags.indexOf(toVersion);
    
    if (fromIndex === -1) {
      throw new Error(`起始版本 ${fromVersion} 不存在`);
    }
    if (toIndex === -1) {
      throw new Error(`目标版本 ${toVersion} 不存在`);
    }
    
    if (fromIndex >= toIndex) {
      throw new Error(`起始版本 ${fromVersion} 必须小于目标版本 ${toVersion}`);
    }
    
    // 获取版本范围内的所有版本（不包含起始版本，包含目标版本）
    const versionsInRange = this.gitTags.slice(fromIndex + 1, toIndex + 1);
    
    // 只返回正式版本（非 beta 版本）
    const releaseVersions = versionsInRange.filter(version => !version.includes('-beta'));
    
    return releaseVersions;
  }

  /**
   * 获取特定组件指定版本的 diff 报告路径
   */
  getDiffReportPath(component, version) {
    return path.join(this.packagePath, component, '__diff__', version, 'index.md');
  }

  /**
   * 获取所有组件列表
   */
  getAllComponents() {
    try {
      const components = fs.readdirSync(this.packagePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => !name.startsWith('.') && !name.startsWith('_'));
      
      return components;
    } catch (error) {
      console.error('获取组件列表失败:', error.message);
      return [];
    }
  }

  /**
   * 解析 diff 报告内容
   */
  parseDiffReport(content) {
    const lines = content.split('\n');
    const betaVersions = {};
    let currentBetaVersion = null;
    let inDetailedChanges = false;
    
    // 先解析详细变更部分的 beta 版本信息
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line === '## 详细变更') {
        inDetailedChanges = true;
        continue;
      }
      
      if (!inDetailedChanges) continue;
      
      // 如果遇到下一个 ## 标题，停止解析基本信息
      if (line.startsWith('## ') && line !== '## 详细变更') {
        break;
      }
      
      // 匹配 beta 版本标题（### 开头）
      const betaMatch = line.match(/^### (.+)/);
      if (betaMatch) {
        const versionName = betaMatch[1];
        // 过滤掉非 beta 版本的标题（如修改文件、关键改动等）
        if (versionName.includes('beta') || versionName.match(/^\d+\.\d+\.\d+-beta\.\d+$/)) {
          currentBetaVersion = versionName;
          betaVersions[currentBetaVersion] = {
            changeType: '',
            changeLabel: '',
            changeDescription: '',
            pr: '',
            reason: '',
            codePattern: '',
            checkRule: ''
          };
        } else {
          currentBetaVersion = null;
        }
        continue;
      }
      
      if (!currentBetaVersion) continue;
      
      const changeInfo = betaVersions[currentBetaVersion];
      
      // 解析变更信息
      if (line.startsWith('- **变更类型**:')) {
        const typeMatch = line.match(/- \*\*变更类型\*\*:\s*(.+)/);
        if (typeMatch) {
          changeInfo.changeType = typeMatch[1];
        }
      } else if (line.startsWith('- **变更标签**:')) {
        const labelMatch = line.match(/- \*\*变更标签\*\*:\s*(.+)/);
        if (labelMatch) {
          changeInfo.changeLabel = labelMatch[1];
        }
      } else if (line.startsWith('- **变更描述**:')) {
        const descMatch = line.match(/- \*\*变更描述\*\*:\s*(.+)/);
        if (descMatch) {
          changeInfo.changeDescription = descMatch[1];
        }
      } else if (line.startsWith('- **修复问题**:') || line.startsWith('- **新增功能**:') || 
          line.startsWith('- **优化**:') || line.startsWith('- **样式调整**:') ||
          line.startsWith('- **新功能**:') || line.startsWith('- **增强**:')) {
        const typeMatch = line.match(/- \*\*(.+?)\*\*:\s*(.+)/);
        if (typeMatch) {
          changeInfo.changeType = typeMatch[1];
          changeInfo.changeDescription = typeMatch[2];
        }
      }
      
      if (line.startsWith('- **PR**:')) {
        const prMatch = line.match(/- \*\*PR\*\*:\s*(.+)/);
        if (prMatch) {
          changeInfo.pr = prMatch[1];
        }
      }
      
      if (line.startsWith('- **问题原因**:')) {
        const reasonMatch = line.match(/- \*\*问题原因\*\*:\s*(.+)/);
        if (reasonMatch) {
          changeInfo.reason = reasonMatch[1];
        }
      }
    }
    
    // 再次遍历，查找修复问题类型的检查点和排查规则
    this.extractCheckRulesAndCodePatterns(content, betaVersions);
    
    return betaVersions;
  }

  /**
   * 提取检查点和代码模式信息
   */
  extractCheckRulesAndCodePatterns(content, betaVersions) {
    const lines = content.split('\n');
    
    // 查找修复问题的 beta 版本
    const fixBetaVersions = Object.keys(betaVersions).filter(version => 
      betaVersions[version].changeType === '修复问题'
    );
    
    if (fixBetaVersions.length === 0) return;
    
    let checkRules = [];
    let hasCodePattern = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // 查找检查点或排查规则 - 多种格式支持
      if (line.startsWith('**检查点**:') || line.startsWith('**排查规则**:')) {
        const ruleMatch = line.match(/\*\*(?:检查点|排查规则)\*\*:\s*(.+)/);
        if (ruleMatch) {
          checkRules.push(ruleMatch[1]);
        }
      }
      
      // 查找场景中的检查点
      const scenarioCheckMatch = line.match(/^### 场景 \d+:.*\n?\*\*检查点\*\*:\s*(.+)/);
      if (scenarioCheckMatch) {
        checkRules.push(scenarioCheckMatch[1]);
      }
      
      // 单独一行的检查点
      if (line.match(/^\*\*检查点\*\*:\s*(.+)/)) {
        const checkMatch = line.match(/^\*\*检查点\*\*:\s*(.+)/);
        if (checkMatch) {
          checkRules.push(checkMatch[1]);
        }
      }
      
      // 支持 #### 排查规则 格式
      if (line.startsWith('#### 排查规则')) {
        // 查找下一行的内容
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          if (nextLine.startsWith('- ')) {
            checkRules.push(nextLine.substring(2).trim());
          }
        }
      }
      
      // 支持排查规则列表项
      if (line.startsWith('- ') && lines[i - 1] && lines[i - 1].trim() === '#### 排查规则') {
        checkRules.push(line.substring(2).trim());
      }
      
      // 检测是否有代码模式
      if (line.includes('需要检查的代码模式') || line.includes('错误做法') || 
          line.includes('正确做法') || line.includes('```jsx') || line.includes('```javascript')) {
        hasCodePattern = true;
      }
    }
    
    // 将提取的信息分配给修复问题的 beta 版本
    fixBetaVersions.forEach(version => {
      if (checkRules.length > 0) {
        // 去重并连接检查点
        const uniqueRules = [...new Set(checkRules)];
        betaVersions[version].checkRule = uniqueRules.join('; ');
      }
      if (hasCodePattern) {
        betaVersions[version].codePattern = '查看 diff 报告获取详细代码模式';
      }
    });
  }

  /**
   * 收集指定版本的所有组件变更信息
   */
  collectComponentChanges(versions, silent = false) {
    const components = this.getAllComponents();
    const result = {};
    
    if (!silent) {
      console.log(`📊 开始收集 ${components.length} 个组件在 ${versions.length} 个版本中的变更信息...\n`);
    }
    
    for (const component of components) {
      result[component] = {};
      
      for (const version of versions) {
        const diffPath = this.getDiffReportPath(component, version);
        
        if (fs.existsSync(diffPath)) {
          try {
            const content = fs.readFileSync(diffPath, 'utf-8');
            const betaVersions = this.parseDiffReport(content);
            
            if (Object.keys(betaVersions).length > 0) {
              result[component][version] = betaVersions;
              if (!silent) {
                console.log(`✅ ${component} v${version}: 发现 ${Object.keys(betaVersions).length} 个 beta 版本变更`);
              }
            }
          } catch (error) {
            if (!silent) {
              console.error(`❌ 解析 ${component} v${version} diff 报告失败:`, error.message);
            }
          }
        }
      }
      
      // 如果该组件在所有版本中都没有变更，则删除空对象
      if (Object.keys(result[component]).length === 0) {
        delete result[component];
      }
    }
    
    return result;
  }

  /**
   * 输出分析结果
   */
  outputResults(fromVersion, toVersion, versionList, componentChanges, format = 'console') {
    if (format === 'json') {
      this.outputJSON(fromVersion, toVersion, versionList, componentChanges);
      return;
    }
    
    console.log('\n' + '='.repeat(80));
    console.log(`📋 Shineout 组件升级变更报告`);
    console.log(`   从 ${fromVersion} 升级到 ${toVersion}`);
    console.log('='.repeat(80));
    
    console.log(`\n📦 版本跨度分析:`);
    console.log(`   • 涉及正式版本: ${versionList.length} 个`);
    console.log(`   • 版本列表: ${versionList.join(', ')}`);
    
    const affectedComponents = Object.keys(componentChanges);
    console.log(`\n🔧 受影响组件: ${affectedComponents.length} 个`);
    
    if (affectedComponents.length === 0) {
      console.log('   无组件变更');
      return;
    }
    
    console.log(`   • 组件列表: ${affectedComponents.join(', ')}`);
    
    // 统计各类型变更
    let totalBetaVersions = 0;
    let fixCount = 0;
    let featureCount = 0;
    let enhancementCount = 0;
    let styleCount = 0;
    
    for (const versions of Object.values(componentChanges)) {
      for (const betaVersions of Object.values(versions)) {
        totalBetaVersions += Object.keys(betaVersions).length;
        
        for (const changeInfo of Object.values(betaVersions)) {
          if (changeInfo.changeType === '修复问题') fixCount++;
          else if (changeInfo.changeType === '新增功能') featureCount++;
          else if (changeInfo.changeType === '优化') enhancementCount++;
          else if (changeInfo.changeType === '样式调整') styleCount++;
        }
      }
    }
    
    console.log(`\n📈 变更统计:`);
    console.log(`   • 总 Beta 版本变更: ${totalBetaVersions} 个`);
    console.log(`   • 修复问题: ${fixCount} 个`);
    console.log(`   • 新增功能: ${featureCount} 个`);
    console.log(`   • 优化改进: ${enhancementCount} 个`);
    console.log(`   • 样式调整: ${styleCount} 个`);
    
    console.log(`\n📝 详细变更信息:`);
    console.log('─'.repeat(80));
    
    for (const [component, versions] of Object.entries(componentChanges)) {
      console.log(`\n🔸 ${component}:`);
      
      for (const [version, betaVersions] of Object.entries(versions)) {
        console.log(`\n  版本 ${version}:`);
        
        for (const [betaVersion, changeInfo] of Object.entries(betaVersions)) {
          console.log(`    ├─ ${betaVersion}:`);
          console.log(`    │  ├─ 变更类型: ${changeInfo.changeType || '未指定'}`);
          console.log(`    │  ├─ 变更标签: ${changeInfo.changeLabel || '未指定'}`);
          console.log(`    │  ├─ PR: ${changeInfo.pr || '未指定'}`);
          console.log(`    │  ├─ 问题原因: ${changeInfo.reason || '未指定'}`);
          
          if (changeInfo.changeType === '修复问题') {
            console.log(`    │  ├─ 代码模式: ${changeInfo.codePattern || '未指定'}`);
            console.log(`    │  └─ 排查规则: ${changeInfo.checkRule || '未指定'}`);
          } else {
            console.log(`    │  └─ `);
          }
        }
      }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('报告生成完成 ✅');
    console.log('='.repeat(80) + '\n');
  }

  /**
   * 输出 JSON 格式结果
   */
  outputJSON(fromVersion, toVersion, versionList, componentChanges) {
    // 统计各类型变更
    let totalBetaVersions = 0;
    let fixCount = 0;
    let featureCount = 0;
    let enhancementCount = 0;
    let styleCount = 0;
    
    for (const versions of Object.values(componentChanges)) {
      for (const betaVersions of Object.values(versions)) {
        totalBetaVersions += Object.keys(betaVersions).length;
        
        for (const changeInfo of Object.values(betaVersions)) {
          if (changeInfo.changeType === '修复问题') fixCount++;
          else if (changeInfo.changeType === '新增功能') featureCount++;
          else if (changeInfo.changeType === '优化') enhancementCount++;
          else if (changeInfo.changeType === '样式调整') styleCount++;
        }
      }
    }

    const result = {
      meta: {
        fromVersion,
        toVersion,
        generatedAt: new Date().toISOString(),
        totalVersions: versionList.length,
        affectedComponents: Object.keys(componentChanges).length
      },
      summary: {
        versionList,
        affectedComponents: Object.keys(componentChanges),
        statistics: {
          totalBetaVersions,
          fixCount,
          featureCount,
          enhancementCount,
          styleCount
        }
      },
      componentChanges
    };

    console.log(JSON.stringify(result, null, 2));
  }

  /**
   * 主分析方法
   */
  async analyze(fromVersion, toVersion, format = 'console') {
    try {
      // 验证版本格式
      if (!this.isValidVersion(fromVersion) || !this.isValidVersion(toVersion)) {
        console.error('❌ 版本格式错误，请使用正确的版本号格式（如：3.5.6）');
        process.exit(1);
      }
      
      if (format !== 'json') {
        console.log(`🚀 开始分析从 ${fromVersion} 到 ${toVersion} 的组件变更...\n`);
      }
      
      // 1. 获取版本跨度
      const versionList = this.getVersionsInRange(fromVersion, toVersion);
      
      if (versionList.length === 0) {
        if (format === 'json') {
          console.log(JSON.stringify({ error: '在指定版本范围内未找到任何正式版本' }));
        } else {
          console.log('❌ 在指定版本范围内未找到任何正式版本');
          console.log('💡 提示：请检查版本号是否正确，或者尝试更大的版本范围');
        }
        return;
      }
      
      if (format !== 'json') {
        console.log(`📦 发现 ${versionList.length} 个正式版本: ${versionList.join(', ')}\n`);
      }
      
      // 2. 收集组件变更信息
      const componentChanges = this.collectComponentChanges(versionList, format === 'json');
      
      // 3. 输出结果
      this.outputResults(fromVersion, toVersion, versionList, componentChanges, format);
      
    } catch (error) {
      console.error('❌ 分析失败:', error.message);
      process.exit(1);
    }
  }

  /**
   * 验证版本号格式
   */
  isValidVersion(version) {
    return /^\d+\.\d+\.\d+$/.test(version);
  }
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('使用方法: pnpm diff <current> <target> [--json]');
    console.log('示例: pnpm diff 3.5.6 3.6.1');
    console.log('      pnpm diff 3.5.6 3.6.1 --json');
    console.log('');
    console.log('说明:');
    console.log('  current  当前版本号');
    console.log('  target   目标版本号');
    console.log('  --json   输出 JSON 格式（便于 AI 解析）');
    process.exit(1);
  }
  
  const fromVersion = args[0];
  const toVersion = args[1];
  const format = args.includes('--json') ? 'json' : 'console';
  
  const analyzer = new ShineoutDiffAnalyzer();
  await analyzer.analyze(fromVersion, toVersion, format);
}

if (require.main === module) {
  main();
}

module.exports = ShineoutDiffAnalyzer;