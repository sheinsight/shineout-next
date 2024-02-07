import React from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import useStyles from '../style';
import { Changelog as ChangelogProps } from 'docs/types';
import { Tag } from 'shineout';
import Locale from '../../locales';

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
  const docsLocale = Locale({ locale: state.locales });
  const changelogLocale = docsLocale['shineout.changelog'];
  const changelogList = changelog[state.locales].reverse();

  const renderItem = (str: any) => {
    console.log(str)
    const regex = /(.*?)(`.*?`|$)/g;
    const result = [];
    for (const [, part, span] of str.matchAll(regex)) {
      if (part) {
        const textNode = <React.Fragment key={result.length}>{part}</React.Fragment>;
        result.push(textNode);
      }
      if (span) {
        const spanRegex = /`(.*?)`/g;
        const spanMatch = spanRegex.exec(span);
        if (spanMatch) {
          const tipNode = <Tag key={result.length} color='warning'>{spanMatch[1]}</Tag>;
          result.push(tipNode);
        }
      }
    }
    return result;
  };

  const renderChanges = (type: string, changelogs: any = [], index: number) => {
    return (
      <div key={index}>
        <div className={style.changelogTypeTitle}>
          {changelogLocale[type as keyof typeof changelogLocale]}
        </div>
        {changelogs.map((item: any, i: number) => {
          return (
            <div key={i} className={style.changelogItem}>
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderChangelog = (item: ChangelogProps, index: number) => {
    return (
      <div key={index} className={style.changelogWrapper}>
        <div className={style.changelogVersion}>{item.version}</div>
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
