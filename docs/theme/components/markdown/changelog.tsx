import React from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import useStyles from '../style';
import { MarkdownWrapper } from '../../../markdown';
import { Changelog as ChangelogProps } from 'docs/types';

interface Props {
  changelog: {
    cn: ChangelogProps[];
    en: ChangelogProps[];
  };
}

const Changelog = (props: Props) => {
  const { changelog } = props;
  const style = useStyles();
  const state = useSnapshot(store);
  const changelogList = changelog[state.locales].reverse();

  const renderChanges = (type: string, changelogs: any = [], index: number) => {
    if (!changelogs.length) return null;
    return (
      <React.Fragment key={index}>
        <div className={style.changelogTypeTitle}>{type}</div>
        <MarkdownWrapper>{`- ${changelogs.join('\n- ')}`}</MarkdownWrapper>
      </React.Fragment>
    );
  };

  const renderChangelog = (item: ChangelogProps, index: number) => {
    return (
      <div key={index} className={style.changelogWrapper}>
        <div className={style.changelogVersion}>{item.version}</div>
        <div className={style.changelogTime}>{item.time}</div>
        <div className={style.changelogType}>
          {Object.keys(item.changes || {}).map((type, i) => {
            return renderChanges(type, item.changes[type as any], i);
          })}
        </div>
      </div>
    );
  };

  return <div className={style.changelog}>{changelogList.map(renderChangelog)}</div>;
};

export default Changelog;
