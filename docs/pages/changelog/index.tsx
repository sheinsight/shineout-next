import { MarkdownWrapper } from '../markdown/index';
import { useStyles } from '../markdown/style';
import classNames from 'classnames';
//shineout replace variable
import changelogs from '../../chunk/shineout/changelog';

const mainChangelog = require(`!!raw-loader!../../markdown/shineout/changelog-v3.md`).default;

const changelogArr = Object.values(changelogs);
// todo 英文
const cn: any = {};
changelogArr.forEach((item) => {
  if (item.cn && item.cn.length > 0) {
    item.cn.forEach((i: any) => {
      const { version, changes, time } = i;
      if (!cn[version]) {
        cn[version] = { time, changes };
      } else {
        // 如果后续的日期比之前的日期大，就替换
        if (time > cn[version].time) {
          cn[version].time = time;
        }
        Object.keys(changes).forEach((key) => {
          if (!cn[version].changes[key]) {
            cn[version].changes[key] = changes[key];
          } else {
            cn[version].changes[key] = cn[version].changes[key].concat(changes[key]);
          }
        });
      }
    });
  }
});

const Changelog = () => {
  const styles = useStyles();

  const markdowns = Object.keys(cn)
    .sort(
      // 比较版本号 1.0.10 -> 1.0.9
      (a, b) => {
        const aArr = a.split('.').map((i) => parseInt(i, 10));
        const bArr = b.split('.').map((i) => parseInt(i, 10));
        for (let i = 0; i < 3; i++) {
          if (aArr[i] > bArr[i]) return -1;
          if (aArr[i] < bArr[i]) return 1;
        }
        return 0;
      }
    )
    .map((version) => {
      const { time, changes } = cn[version];
      const title = `## ${version}`;
      const timestr = `<span class="time">${time}</span>`;
      const content = Object.keys(changes)
        .filter((key) => changes[key].length > 0)
        .map((key) => {
          const title = `### ${key}`;
          const list = changes[key].map((item: string) => `- ${item}`).join('\n');
          return `${title}\n${list}`;
        })
        .join('\n');
      return `${title}\n${timestr}\n${content}`;
    });

  return (
    <div className={classNames(styles.wrapper)}>
      <MarkdownWrapper>
        {'`````\n开发指南\n# 更新日志 \n这里会有详细的发版记录，版本号严格遵循 Semver 规范`````'}
      </MarkdownWrapper>
      <MarkdownWrapper>{markdowns.join('\n')}</MarkdownWrapper>
      <MarkdownWrapper>{mainChangelog}</MarkdownWrapper>
    </div>
  );
};

export default Changelog;
