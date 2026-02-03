const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 同步 changelog 到 GitHub Releases
 *
 * 使用方式:
 * 1. 同步指定版本范围: node scripts/sync-github-releases.js --from 3.7.8 --to 3.9.8
 * 2. 同步指定版本: node scripts/sync-github-releases.js 3.9.9
 * 3. 重新同步指定版本: node scripts/sync-github-releases.js 3.9.9 --force
 * 4. 预览模式(不实际创建): node scripts/sync-github-releases.js --from 3.7.8 --to 3.9.8 --dry-run
 */

// 解析命令行参数
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isForce = args.includes('--force');

// 解析版本范围
let fromVersion = null;
let toVersion = null;
const fromIndex = args.indexOf('--from');
const toIndex = args.indexOf('--to');
if (fromIndex !== -1 && args[fromIndex + 1]) {
  fromVersion = args[fromIndex + 1];
}
if (toIndex !== -1 && args[toIndex + 1]) {
  toVersion = args[toIndex + 1];
}

// 解析单个版本(只有当没有使用 --from/--to 时才查找)
const specificVersion = (fromVersion || toVersion)
  ? null
  : args.find(arg => !arg.startsWith('--') && /^\d+\.\d+\.\d+$/.test(arg));

// 从静态 markdown 文件中解析版本信息
function parseChangelogMarkdown() {
  const changelogPath = path.join(__dirname, '../docs/markdown/shineout/changelog-release.md');

  if (!fs.existsSync(changelogPath)) {
    console.error('❌ changelog-release.md 文件不存在,请先运行 npm run build:changelog');
    process.exit(1);
  }

  const content = fs.readFileSync(changelogPath, 'utf-8');

  // 解析每个版本块
  const versions = [];
  const versionRegex = /## ([\d.]+(?:-beta\.\d+)?)\n<span class="time">([^<]+)<\/span>\n([\s\S]*?)(?=\n## |\n*$)/g;

  let match;
  while ((match = versionRegex.exec(content)) !== null) {
    const [, version, date, body] = match;
    versions.push({
      version,
      date,
      body: body.trim()
    });
  }

  return versions;
}

// 获取已存在的 GitHub Releases
function getExistingReleases() {
  try {
    const output = execSync('gh release list --limit 1000 --json tagName,name', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    const releases = JSON.parse(output);
    // tag 格式: version-3.x.x,提取出版本号
    return new Set(releases.map(r => r.tagName.replace(/^version-/, '')));
  } catch (e) {
    console.error('❌ 获取 GitHub Releases 列表失败:', e.message);
    console.error('提示: 请确保已安装 gh CLI 并已登录 (gh auth login)');
    process.exit(1);
  }
}

// 比较版本号大小 返回 -1(a<b), 0(a==b), 1(a>b)
function compareVersions(a, b) {
  const aArr = a.split('.').map(i => parseInt(i, 10));
  const bArr = b.split('.').map(i => parseInt(i, 10));

  for (let i = 0; i < 3; i++) {
    if (aArr[i] > bArr[i]) return 1;
    if (aArr[i] < bArr[i]) return -1;
  }

  return 0;
}

// 创建或更新 GitHub Release
function createRelease(version, date, body, force = false) {
  const tag = `version-${version}`;  // tag 格式: version-3.x.x
  const title = `v${version}`;

  // 处理 body: 移除 ### 标题,保持与旧格式一致
  const releaseBody = body
    .replace(/### /g, '')  // 移除三级标题的 ###
    .replace(/`([^`]+)`/g, '$1')  // 移除反引号

  // 将 body 写入临时文件
  const tempFile = path.join(__dirname, '../.temp-release-body.md');
  fs.writeFileSync(tempFile, releaseBody, 'utf-8');

  try {
    if (force) {
      // 先删除已存在的 release
      try {
        execSync(`gh release delete ${tag} -y`, { stdio: 'ignore' });
        console.log(`  🗑️  删除已存在的 release ${tag}`);
      } catch (e) {
        // Release 不存在,忽略错误
      }
    }

    // 创建 release
    const cmd = `gh release create ${tag} --title "${title}" --notes-file "${tempFile}" --draft=false --latest=false`;

    if (isDryRun) {
      console.log(`  [DRY-RUN] 将创建 release: ${tag}`);
      console.log(`  标题: ${title}`);
      console.log(`  内容预览:\n${releaseBody.substring(0, 200)}...\n`);
    } else {
      execSync(cmd, { stdio: 'inherit' });
      console.log(`  ✓ 已创建 release: ${tag}`);
    }

    return true;
  } catch (e) {
    console.error(`  ❌ 创建 release ${tag} 失败:`, e.message);
    return false;
  } finally {
    // 清理临时文件
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

// 主函数
function main() {
  console.log('📦 开始同步 Changelog 到 GitHub Releases...\n');

  if (isDryRun) {
    console.log('🔍 [预览模式] 不会实际创建 Release\n');
  }

  // 解析 changelog
  console.log('📖 解析 changelog-release.md...');
  const versions = parseChangelogMarkdown();
  console.log(`✓ 找到 ${versions.length} 个版本\n`);

  if (versions.length === 0) {
    console.log('⚠️  没有找到任何版本信息');
    return;
  }

  // 如果指定了单个版本,只处理该版本
  if (specificVersion) {
    const targetVersion = versions.find(v => v.version === specificVersion);
    if (!targetVersion) {
      console.error(`❌ 未找到版本 ${specificVersion}`);
      process.exit(1);
    }

    console.log(`🎯 同步指定版本: ${specificVersion}\n`);
    const success = createRelease(targetVersion.version, targetVersion.date, targetVersion.body, isForce);

    if (success && !isDryRun) {
      console.log(`\n✓ 版本 ${specificVersion} 同步完成`);
    }
    return;
  }

  // 检查是否指定了版本范围
  if (!fromVersion || !toVersion) {
    console.error('❌ 请指定版本范围: --from <version> --to <version>');
    console.error('示例: npm run release:github -- --from 3.7.8 --to 3.9.8');
    process.exit(1);
  }

  console.log(`📌 版本范围: ${fromVersion} ~ ${toVersion}\n`);

  // 获取已存在的 releases
  console.log('🔍 检查已存在的 GitHub Releases...');
  const existingReleases = getExistingReleases();
  console.log(`✓ 找到 ${existingReleases.size} 个已存在的 release\n`);

  // 过滤出需要创建的版本
  const versionsToCreate = versions.filter(v => {
    // 跳过 beta 版本
    if (v.version.includes('beta')) {
      return false;
    }

    // 如果指定了版本范围,只处理范围内的版本
    if (fromVersion && toVersion) {
      const compareFrom = compareVersions(v.version, fromVersion);
      const compareTo = compareVersions(v.version, toVersion);

      // 必须 >= fromVersion 且 <= toVersion
      if (compareFrom < 0 || compareTo > 0) {
        return false;
      }
    }

    // 如果不是 force 模式,跳过已存在的版本
    if (!isForce && existingReleases.has(v.version)) {
      return false;
    }

    return true;
  });

  if (versionsToCreate.length === 0) {
    console.log('✓ 所有版本的 Release 都已存在,无需同步');
    console.log('\n提示: 如需重新同步某个版本,请使用: node scripts/sync-github-releases.js <version> --force');
    return;
  }

  console.log(`📝 需要创建 ${versionsToCreate.length} 个 Release:\n`);
  versionsToCreate.forEach(v => {
    console.log(`  - ${v.version} (${v.date})`);
  });
  console.log();

  // 确认是否继续
  if (!isDryRun && versionsToCreate.length > 5) {
    console.log('⚠️  将创建大量 Release,建议先使用 --dry-run 参数预览');
    console.log('按 Ctrl+C 取消,或等待 5 秒自动继续...\n');

    // 等待 5 秒
    execSync('sleep 5', { stdio: 'inherit' });
  }

  // 创建 releases
  let successCount = 0;
  let failCount = 0;

  for (const versionInfo of versionsToCreate) {
    console.log(`\n处理版本: ${versionInfo.version}`);
    const success = createRelease(versionInfo.version, versionInfo.date, versionInfo.body);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // 避免请求过快
    if (!isDryRun && versionsToCreate.length > 1) {
      execSync('sleep 1', { stdio: 'ignore' });
    }
  }

  // 总结
  console.log('\n' + '='.repeat(50));
  console.log('📊 同步完成统计:');
  console.log(`  ✓ 成功: ${successCount}`);
  if (failCount > 0) {
    console.log(`  ✗ 失败: ${failCount}`);
  }
  console.log('='.repeat(50));

  if (!isDryRun) {
    console.log('\n💡 提示: 可以访问 https://github.com/sheinsight/shineout-next/releases 查看');
  }
}

// 运行
main();
