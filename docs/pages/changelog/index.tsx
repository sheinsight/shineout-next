import { useState, useMemo } from 'react';
import { MarkdownWrapper } from '../markdown/index';
import { useStyles } from '../markdown/style';
import classNames from 'classnames';
//shineout replace variable
import changelogs from '../../chunk/shineout/changelog';

const mainChangelog = require(`!!raw-loader!../../markdown/shineout/changelog-v3.md`).default;

const changelogArr = Object.values(changelogs);

const ORDER = ['Featrue', 'Enhancement', 'Performance', 'BugFix', 'Style', 'Theme']

const Changelog = () => {
  const [showSubVersion, setShowSubVersion] = useState(false);
  const styles = useStyles();

  // todo 英文
  const componentMarkdowns = useMemo(() => {
    const cn: any = {};
    changelogArr.forEach((item) => {
    if (item.cn && item.cn.length > 0) {
      item.cn.forEach((i: any) => {
        const { version, changes, time } = i;
        const releaseVersion = showSubVersion ? version : version.replace(/-beta\.\d+$/, '');
        if (!cn[releaseVersion]) {
          cn[releaseVersion] = { time, changes: JSON.parse(JSON.stringify(changes)) };
        } else {
          // 如果后续的日期比之前的日期大，就替换
          if (time > cn[releaseVersion].time) {
            cn[releaseVersion].time = time;
          }
          Object.keys(changes).forEach((key) => {
            if (!cn[releaseVersion].changes[key]) {
              cn[releaseVersion].changes[key] = changes[key];
            } else {
              const arr = [
                ...cn[releaseVersion].changes[key],
                ...changes[key]
              ];
              cn[releaseVersion].changes[key] = Array.from(new Set(arr));
            }
          });
        }
      });
    }
  });
  return cn
}, [showSubVersion]);

  const markdowns = Object.keys(componentMarkdowns)
    .sort(
      // 比较版本号 1.0.10 -> 1.0.9
      (a, b) => {
        const aArr = a.split('.').map((i) => parseInt(i, 10));
        const bArr = b.split('.').map((i) => parseInt(i, 10));
        for (let i = 0; i < 3; i++) {
          if (aArr[i] > bArr[i]) return -1;
          if (aArr[i] < bArr[i]) return 1;
        }

        // 继续比较beta 1.0.10-beta.2 -> 1.0.10-beta.1
        if (a.includes('beta') && b.includes('beta')) {
          const aBeta = a.split('beta.')[1];
          const bBeta = b.split('beta.')[1];
          return  parseInt(bBeta, 10) - parseInt(aBeta, 10);
        }
        return 0;
      }
    )
    .map((version) => {
      const { time, changes } = componentMarkdowns[version];
      const title = `## ${version}`;
      const timestr = `<span class="time">${time}</span>`;
      const content = Object.keys(changes)
        .filter((key) => changes[key].length > 0)
        .map((key) => {
          const title = `### ${key}`;
          const list = changes[key].map((item: string) => `- ${item}`).join('\n');
          return `${title}\n${list}`;
        })
        .sort((a, b) => {
          const aIndex = ORDER.findIndex((i) => a.toLowerCase().includes(i.toLowerCase()));
          const bIndex = ORDER.findIndex((i) => b.toLowerCase().includes(i.toLowerCase()));
          return aIndex - bIndex;
        })
        .join('\n');
      return `${title}\n${timestr}\n${content}`;
    });

  return (
    <div className={classNames(styles.wrapper)}>
      <div onDoubleClick={() => setShowSubVersion(!showSubVersion)} style={{ userSelect: 'none', cursor: 'pointer' }}>
        <MarkdownWrapper>
          {'`````\n开发指南\n# 更新日志 \n这里会有详细的发版记录，版本号严格遵循 Semver 规范`````'}
        </MarkdownWrapper>
      </div>
      <MarkdownWrapper>{markdowns.join('\n')}</MarkdownWrapper>
      <MarkdownWrapper>{mainChangelog}</MarkdownWrapper>
    </div>
  );
};

export default Changelog;
