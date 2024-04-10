import { MarkdownWrapper } from '../../markdown/index';
const mainChangelog = require(`!!raw-loader!../../markdown/version_v3.md`).default;

const Changelog = () => {
  return (
    <div style={{padding: 20}}>
      <MarkdownWrapper noPadding>
        {'`````\n开发指南\n# 更新日志 \n这里会有详细的发版记录，版本号严格遵循 Semver 规范`````'}
      </MarkdownWrapper>
      <MarkdownWrapper noPadding>
        {mainChangelog}
      </MarkdownWrapper>
    </div>
  );
};

export default Changelog;
