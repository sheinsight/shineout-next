const fs = require('fs');
const path = require('path');

const ORDER = ['Feature', 'Enhancement', 'Performance', 'BugFix', 'Style', 'Theme'];

// 读取所有组件的 changelog 数据
function loadChangelogs() {
  const changelogDir = path.join(__dirname, '../docs/chunk/shineout/changelog');
  const files = fs.readdirSync(changelogDir);

  const allChangelogs = [];

  files.forEach(file => {
    if (file === 'index.ts' || !file.endsWith('.ts')) return;

    const filePath = path.join(changelogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // 从 TS 文件中提取 JSON 数据
    // 格式: const changelog = { cn: [...], en: [] }
    const cnMatch = content.match(/cn:\s*(\[[\s\S]*?\]),\s*en:/);
    if (cnMatch) {
      try {
        // 将匹配到的数组字符串解析为 JSON
        const jsonStr = cnMatch[1];
        const data = JSON.parse(jsonStr);
        allChangelogs.push(...data);
      } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
      }
    }
  });

  return allChangelogs;
}

// 合并相同版本的 changelog
function mergeChangelogs(changelogs, includeSubVersion = false) {
  const merged = {};

  changelogs.forEach(item => {
    const { version, changes, time } = item;
    const releaseVersion = includeSubVersion ? version : version.replace(/-beta\.\d+$/, '');

    if (!merged[releaseVersion]) {
      merged[releaseVersion] = {
        time,
        changes: JSON.parse(JSON.stringify(changes))
      };
    } else {
      // 如果后续的日期比之前的日期大,就替换
      if (time > merged[releaseVersion].time) {
        merged[releaseVersion].time = time;
      }

      Object.keys(changes).forEach(key => {
        if (!merged[releaseVersion].changes[key]) {
          merged[releaseVersion].changes[key] = changes[key];
        } else {
          const arr = [
            ...merged[releaseVersion].changes[key],
            ...changes[key]
          ];
          merged[releaseVersion].changes[key] = Array.from(new Set(arr));
        }
      });
    }
  });

  return merged;
}

// 版本号排序
function sortVersions(versions) {
  return versions.sort((a, b) => {
    const aArr = a.split('.').map(i => parseInt(i, 10));
    const bArr = b.split('.').map(i => parseInt(i, 10));

    for (let i = 0; i < 3; i++) {
      if (aArr[i] > bArr[i]) return -1;
      if (aArr[i] < bArr[i]) return 1;
    }

    // 继续比较beta版本
    if (a.includes('beta') && b.includes('beta')) {
      const aBeta = a.split('beta.')[1];
      const bBeta = b.split('beta.')[1];
      return parseInt(bBeta, 10) - parseInt(aBeta, 10);
    }

    return 0;
  });
}

// 生成 markdown
function generateMarkdown(mergedChangelogs) {
  const versions = sortVersions(Object.keys(mergedChangelogs));

  const markdowns = versions.map(version => {
    const { time, changes } = mergedChangelogs[version];
    const title = `## ${version}`;
    const timestr = `<span class="time">${time}</span>`;

    const content = Object.keys(changes)
      .filter(key => changes[key].length > 0)
      .map(key => {
        const sectionTitle = `### ${key}`;
        const list = changes[key].map(item => `- ${item}`).join('\n');
        return `${sectionTitle}\n${list}`;
      })
      .sort((a, b) => {
        const aIndex = ORDER.findIndex(i => a.toLowerCase().includes(i.toLowerCase()));
        const bIndex = ORDER.findIndex(i => b.toLowerCase().includes(i.toLowerCase()));
        return aIndex - bIndex;
      })
      .join('\n');

    return `${title}\n${timestr}\n${content}`;
  });

  return markdowns.join('\n\n');
}

// 主函数
function buildChangelog() {
  console.log('Loading changelogs...');
  const changelogs = loadChangelogs();

  console.log(`Found ${changelogs.length} changelog entries`);

  // 生成发布版本的 changelog (不包含 beta 版本)
  console.log('Generating release changelog (正式版本, 不包含 beta)...');
  const releaseMerged = mergeChangelogs(changelogs, false);
  const releaseMarkdown = generateMarkdown(releaseMerged);

  // 读取 3.0.0 主版本说明
  const mainChangelogPath = path.join(__dirname, '../docs/markdown/shineout/changelog-v3.md');
  let mainChangelog = '';
  if (fs.existsSync(mainChangelogPath)) {
    mainChangelog = fs.readFileSync(mainChangelogPath, 'utf-8');
  }

  // 写入文件
  const outputDir = path.join(__dirname, '../docs/markdown/shineout');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 发布版 changelog (不包含 beta)
  const releaseChangelogPath = path.join(outputDir, 'changelog-release.md');
  const releaseContent = `# 更新日志\n\n> 这里会有详细的发版记录,版本号严格遵循 Semver 规范\n\n${releaseMarkdown}\n\n${mainChangelog}`;
  fs.writeFileSync(releaseChangelogPath, releaseContent, 'utf-8');
  console.log(`✓ Generated: ${releaseChangelogPath}`);

  console.log('\n✓ Changelog compilation completed!');
}

// 运行
buildChangelog();
