import { MarkdownProps } from 'docs/types';
import { useSnapshot } from 'valtio';
import store from '../../store';
import useStyles from '../style';

const SingleAPi = (props: MarkdownProps['api'][0]) => {
  const { title, properties, cn, en, subTitle, isDetail } = props;
  const hasVersion = properties.find((item: any) => !!item.version);
  const style = useStyles();

  const state = useSnapshot(store);
  const locate = (cn: string, en: string) => {
    return state.locales === 'cn' ? cn : en;
  };

  return (
    <>
      {title || subTitle ? (
        <>
          <h3 id={`api-${title}`}>
            <span>{title}</span>
            {subTitle ? <em>{`${`  ${subTitle}`}`}</em> : null}
          </h3>
          {cn ? (
            <p style={{ whiteSpace: 'pre-wrap', margin: '14px 0 14px 0', lineHeight: '2' }}>
              {locate(cn, en)}
            </p>
          ) : null}
        </>
      ) : null}
      <div style={{ overflow: 'auto' }}>
        <table className={style.apiTable}>
          <thead>
            <tr>
              <th>{locate('属性', 'Property')}</th>
              <th>{locate('类型', 'Type')}</th>
              {isDetail ? null : <th>{locate('默认值', 'Default')}</th>}
              <th>{locate('说明', 'Description')}</th>
              {hasVersion ? <th>{locate('版本', 'Version')}</th> : null}
            </tr>
          </thead>
          <tbody>
            {properties
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, tag, type, required } = {} as any) => {
                const defaultV = required ? locate('必填', 'required') : undefined;
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{type}</td>
                    {isDetail ? null : <td>{defaultV || tag.default || '-'}</td>}
                    <td>{locate(tag.cn, tag.en)}</td>
                    {hasVersion ? <td>{tag.version || '-'}</td> : null}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Api = (props: { api: MarkdownProps['api'] }) => {
  const api = props.api || [];
  return (
    <div style={{ padding: 24 }}>
      {api.map((item, index) => {
        return <SingleAPi key={index} {...item}></SingleAPi>;
      })}
    </div>
  );
};

export default Api;
