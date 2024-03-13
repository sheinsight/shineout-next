import classNames from 'classnames';
import { MarkdownProps } from 'docs/types';
import { useSnapshot } from 'valtio';
import store from '../../store';
// import useStyles from '../style';
import { Table } from 'shineout';
import Anchor from 'docs/theme/layout/desktop/anchor';

const SingleAPi = (props: MarkdownProps['api'][0]) => {
  const { title, properties, cn, en, subTitle, isLast } = props;
  // const hasVersion = properties.find((item: any) => !!item.version);
  // const style = useStyles();

  const state = useSnapshot(store);
  const locate = (cn: string, en: string) => {
    return state.locales === 'cn' ? cn : en;
  };

  const columns = [
    {
      title: locate('属性', 'Property'),
      width: 200,
      render: (d: any) => d.name,
    },
    {
      title: locate('类型', 'Type'),
      width: 400,
      render: (d: any) => d.type,
    },
    {
      title: locate('默认值', 'Default'),
      width: 100,
      render: (d: any) => d.tag.default || '-',
    },
    {
      title: locate('说明', 'Description'),
      render: (d: any) => locate(d.tag.cn, d.tag.en),
    },
  ];

  const data = properties.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {title || subTitle ? (
        <>
          <h3 className={classNames('anchor-title')} id={`api-${title}`}>
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
      <div style={{ overflow: 'auto', marginBottom: isLast ? 0 : 48 }}>
        <Table bordered columns={columns} data={data} keygen='name'></Table>
      </div>
    </>
  );
};

const Api = (props: { api: MarkdownProps['api'] }) => {
  const api = props.api || [];
  const titles = api.map((item) => item.title);
  return (
    <div style={{ padding: 24, display: 'flex', marginTop: 60 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {api.map((item, index) => {
          return <SingleAPi key={index} {...item} isLast={index === api.length - 1}></SingleAPi>;
        })}
      </div>
      <div className='anchor' style={{ width: 192 }}>
        <Anchor anchorName='api' data={titles}></Anchor>
      </div>
    </div>
  );
};

export default Api;
