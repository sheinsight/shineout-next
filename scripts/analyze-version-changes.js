#!/usr/bin/env node

/**
 * Beta 版本聚合分析工具
 * 用于分析两个版本间的所有变更，包括所有 beta 版本的内容
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class VersionChangeAnalyzer {
  constructor() {
    this.changelogs = new Map();
    this.gitTags = [];
  }

  /**
   * 获取所有 git tags (只保留正式版本和 beta 版本，忽略 rc 和 alpha)
   */
  getAllTags() {
    const tags = execSync('git tag | grep "^version-"', { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean)
      .map(tag => tag.replace('version-', ''))
      // 过滤掉 rc 和 alpha 版本，只保留正式版本和 beta 版本
      .filter(tag => {
        // 匹配格式: 3.x.x 或 3.x.x-beta.x
        return /^\d+\.\d+\.\d+(-beta\.\d+)?$/.test(tag);
      });
    
    this.gitTags = tags.sort((a, b) => {
      const [aMajor, aMinor, aPatch] = this.parseVersion(a);
      const [bMajor, bMinor, bPatch] = this.parseVersion(b);
      
      if (aMajor !== bMajor) return aMajor - bMajor;
      if (aMinor !== bMinor) return aMinor - bMinor;
      return this.comparePatchVersion(aPatch, bPatch);
    });
    
    return this.gitTags;
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
      console.error(`无法比较版本: ${a} vs ${b}`);
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
   * 获取版本范围内的所有版本（包括 beta）
   */
  getVersionsInRange(fromVersion, toVersion) {
    const fromIndex = this.gitTags.indexOf(fromVersion);
    const toIndex = this.gitTags.indexOf(toVersion);
    
    if (fromIndex === -1 || toIndex === -1) {
      throw new Error(`版本 ${fromVersion} 或 ${toVersion} 不存在`);
    }
    
    // 不包含 fromVersion，包含 toVersion
    return this.gitTags.slice(fromIndex + 1, toIndex + 1);
  }

  /**
   * 获取特定正式版本包含的所有 beta 版本
   */
  getBetaVersionsForRelease(version) {
    const versionBase = version.replace(/-beta\.\d+$/, '');
    return this.gitTags.filter(tag => 
      tag.startsWith(`${versionBase}-beta.`) || tag === versionBase
    );
  }

  /**
   * 获取两个 tag 之间的 commits
   */
  getCommitsBetweenTags(fromTag, toTag) {
    try {
      // fromTag 和 toTag 已经包含了 version- 前缀
      const cmd = fromTag 
        ? `git log ${fromTag}..${toTag} --format="%H|%s|%an|%ae|%ai"`
        : `git log ${toTag} --format="%H|%s|%an|%ae|%ai"`;
      
      const output = execSync(cmd, { encoding: 'utf-8' });
      
      return output.split('\n').filter(Boolean).map(line => {
        const [hash, subject, author, email, date] = line.split('|');
        return { hash, subject, author, email, date };
      });
    } catch (error) {
      console.error(`获取 ${fromTag} 到 ${toTag} 的 commits 失败:`, error.message);
      return [];
    }
  }

  /**
   * 获取 commit 修改的文件
   */
  getFilesChangedInCommit(commitHash) {
    try {
      const output = execSync(
        `git diff-tree --no-commit-id --name-only -r ${commitHash}`,
        { encoding: 'utf-8' }
      );
      return output.split('\n').filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  /**
   * 分析组件变更
   */
  analyzeComponentChanges(files) {
    const componentChanges = new Map();
    
    files.forEach(file => {
      // 匹配组件路径
      const match = file.match(/packages\/shineout\/src\/([^/]+)\//);
      if (match) {
        const component = match[1];
        if (!componentChanges.has(component)) {
          componentChanges.set(component, {
            files: [],
            hasTypeChange: false,
            hasApiChange: false,
            hasStyleChange: false
          });
        }
        
        const change = componentChanges.get(component);
        change.files.push(file);
        
        if (file.endsWith('.type.ts') || file.endsWith('.type.tsx')) {
          change.hasTypeChange = true;
        }
        if (file.endsWith('.tsx') && !file.includes('__example__') && !file.includes('__test__')) {
          change.hasApiChange = true;
        }
        if (file.includes('style') || file.endsWith('.less') || file.endsWith('.css')) {
          change.hasStyleChange = true;
        }
      }
    });
    
    return componentChanges;
  }

  /**
   * 读取组件的 changelog
   */
  readComponentChangelog(component, version) {
    const changelogPath = path.join(
      __dirname, 
      '../packages/shineout/src',
      component,
      '__doc__/changelog.cn.md'
    );
    
    if (!fs.existsSync(changelogPath)) {
      return null;
    }
    
    const content = fs.readFileSync(changelogPath, 'utf-8');
    const versionPattern = new RegExp(`## ${version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([\\s\\S]*?)(?=## \\d+\\.\\d+|$)`);
    const match = content.match(versionPattern);
    
    if (match) {
      return this.parseChangelogContent(match[1]);
    }
    
    return null;
  }

  /**
   * 解析 changelog 内容
   */
  parseChangelogContent(content) {
    const changes = {
      bugfix: [],
      enhancement: [],
      feature: [],
      style: [],
      theme: [],
      type: []
    };
    
    const lines = content.split('\n');
    let currentType = null;
    
    lines.forEach(line => {
      if (line.includes('🐞 BugFix')) currentType = 'bugfix';
      else if (line.includes('💎 Enhancement')) currentType = 'enhancement';
      else if (line.includes('🆕 Feature')) currentType = 'feature';
      else if (line.includes('💅 Style')) currentType = 'style';
      else if (line.includes('🎨 Theme')) currentType = 'theme';
      else if (line.includes('🆎 Type')) currentType = 'type';
      else if (line.trim().startsWith('-') && currentType) {
        changes[currentType].push(line.trim().substring(1).trim());
      }
    });
    
    return changes;
  }

  /**
   * 聚合分析版本变更
   */
  async analyzeVersionChanges(fromVersion, toVersion) {
    console.log(`\n🔍 分析从 ${fromVersion} 到 ${toVersion} 的变更...\n`);
    
    // 获取所有 tags
    this.getAllTags();
    
    // 获取版本范围
    const versions = this.getVersionsInRange(fromVersion, toVersion);
    console.log(`📦 包含 ${versions.length} 个版本变更\n`);
    
    const analysis = {
      fromVersion,
      toVersion,
      totalVersions: versions.length,
      versions: {},
      componentSummary: new Map(),
      riskAssessment: {
        high: [],
        medium: [],
        low: []
      }
    };
    
    // 分析每个版本
    let previousTag = fromVersion;
    
    for (const version of versions) {
      const currentTag = version;
      const commits = this.getCommitsBetweenTags(
        previousTag ? `version-${previousTag}` : null,
        `version-${currentTag}`
      );
      
      // 收集所有文件变更
      const allFiles = new Set();
      commits.forEach(commit => {
        const files = this.getFilesChangedInCommit(commit.hash);
        files.forEach(file => allFiles.add(file));
      });
      
      // 分析组件变更
      const componentChanges = this.analyzeComponentChanges(Array.from(allFiles));
      
      analysis.versions[version] = {
        commits: commits.length,
        commitDetails: commits,
        filesChanged: allFiles.size,
        componentsAffected: componentChanges
      };
      
      // 更新组件汇总
      componentChanges.forEach((change, component) => {
        if (!analysis.componentSummary.has(component)) {
          analysis.componentSummary.set(component, {
            versions: [],
            totalChanges: 0,
            hasTypeChange: false,
            hasApiChange: false
          });
        }
        
        const summary = analysis.componentSummary.get(component);
        summary.versions.push(version);
        summary.totalChanges += change.files.length;
        summary.hasTypeChange = summary.hasTypeChange || change.hasTypeChange;
        summary.hasApiChange = summary.hasApiChange || change.hasApiChange;
      });
      
      previousTag = version;
    }
    
    // 风险评估
    analysis.componentSummary.forEach((summary, component) => {
      if (summary.hasTypeChange || summary.hasApiChange) {
        analysis.riskAssessment.high.push(component);
      } else if (summary.totalChanges > 5) {
        analysis.riskAssessment.medium.push(component);
      } else {
        analysis.riskAssessment.low.push(component);
      }
    });
    
    return analysis;
  }

  /**
   * 生成分析报告
   */
  generateReport(analysis) {
    console.log('=' .repeat(60));
    console.log(`📊 版本变更分析报告`);
    console.log(`   从 ${analysis.fromVersion} 升级到 ${analysis.toVersion}`);
    console.log('=' .repeat(60));
    
    // 统计 beta 版本数量
    const betaVersions = Object.keys(analysis.versions).filter(v => v.includes('-beta'));
    const releaseVersions = Object.keys(analysis.versions).filter(v => !v.includes('-beta'));
    
    console.log(`\n📈 总体统计:`);
    console.log(`   • 涉及版本总数: ${analysis.totalVersions}`);
    console.log(`     - 正式版本: ${releaseVersions.length} 个`);
    console.log(`     - Beta 版本: ${betaVersions.length} 个`);
    console.log(`   • 受影响组件: ${analysis.componentSummary.size} 个`);
    
    // 统计总的 commit 数量
    const totalCommits = Object.values(analysis.versions).reduce((sum, v) => sum + v.commits, 0);
    console.log(`   • 总 Commit 数: ${totalCommits}`);
    
    console.log(`\n⚠️  风险评估:`);
    console.log(`   • 高风险组件 (${analysis.riskAssessment.high.length}): ${analysis.riskAssessment.high.join(', ') || '无'}`);
    console.log(`   • 中风险组件 (${analysis.riskAssessment.medium.length}): ${analysis.riskAssessment.medium.join(', ') || '无'}`);
    console.log(`   • 低风险组件 (${analysis.riskAssessment.low.length}): ${analysis.riskAssessment.low.join(', ') || '无'}`);
    
    // 显示高风险组件的详细信息
    if (analysis.riskAssessment.high.length > 0) {
      console.log(`\n🔴 高风险组件详情:`);
      analysis.riskAssessment.high.forEach(component => {
        const summary = analysis.componentSummary.get(component);
        console.log(`\n   ${component}:`);
        console.log(`     • 涉及版本: ${summary.versions.join(', ')}`);
        console.log(`     • 文件变更: ${summary.totalChanges} 处`);
        console.log(`     • 类型变更: ${summary.hasTypeChange ? '✅ 是' : '否'}`);
        console.log(`     • API 变更: ${summary.hasApiChange ? '✅ 是' : '否'}`);
      });
    }
    
    // 显示版本变更时间线
    console.log(`\n📅 版本发布时间线:`);
    const versionDates = [];
    Object.entries(analysis.versions).forEach(([version, data]) => {
      if (data.commitDetails && data.commitDetails.length > 0) {
        const latestCommit = data.commitDetails[data.commitDetails.length - 1];
        versionDates.push({
          version,
          date: latestCommit.date ? latestCommit.date.split('T')[0] : 'N/A',
          commits: data.commits
        });
      }
    });
    
    // 只显示前10个和后10个版本
    const displayVersions = versionDates.length > 20 
      ? [...versionDates.slice(0, 5), { version: '...', date: '...', commits: '...' }, ...versionDates.slice(-5)]
      : versionDates;
      
    displayVersions.forEach(({ version, date, commits }) => {
      if (version === '...') {
        console.log(`   ${version}`);
      } else {
        console.log(`   ${version.padEnd(20)} ${date}  (${commits} commits)`);
      }
    });
    
    // 保存 JSON 报告
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const reportName = `version-analysis-${analysis.fromVersion}-to-${analysis.toVersion}-${timestamp}.json`;
    const reportPath = path.join(__dirname, '..', reportName);
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    console.log(`\n💾 详细报告已保存到: ${reportName}\n`);
  }
}

// CLI 入口
async function main() {
  const analyzer = new VersionChangeAnalyzer();
  
  // 从命令行参数获取版本
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('使用方法: node analyze-version-changes.js <from-version> <to-version>');
    console.log('示例: node analyze-version-changes.js 3.6.3 3.7.7');
    process.exit(1);
  }
  
  const [fromVersion, toVersion] = args;
  
  try {
    const analysis = await analyzer.analyzeVersionChanges(fromVersion, toVersion);
    analyzer.generateReport(analysis);
  } catch (error) {
    console.error('❌ 分析失败:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = VersionChangeAnalyzer;