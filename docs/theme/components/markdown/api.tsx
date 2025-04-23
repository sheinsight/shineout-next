import React, { useEffect } from 'react';
import classNames from 'classnames';
import { MarkdownProps } from 'docs/types';
import { useSnapshot } from 'valtio';
import store from '../../store';
import useStyles from '../style';
import { Table } from 'shineout';
import Anchor from 'docs/theme/layout/desktop/anchor';
import { useLocation, useNavigate } from 'react-router-dom';

type SingleAPiProps = MarkdownProps['api'][0] & {
  rowClassName?: (d: any) => string;
  onRowClick: (str: string) => void;
};

const SingleAPi = (props: SingleAPiProps) => {
  const classes = useStyles();
  const { title, properties, cn, en, subTitle, isLast } = props;
  // const hasVersion = properties.find((item: any) => !!item.version);

  const state = useSnapshot(store);
  const locate = (cn: string, en: string) => {
    return state.locales === 'cn' ? cn : en;
  };

  const regex = /^"(?:\\.|[^"\\])*"$/;

  const renderType = (type: any) => {
    if (!type) return '-';
    const types = type.split('|');
    const result = type.split('|').map((item: any, index: number) => {
      let res: React.ReactNode[] = [];
      if (regex.test(item.trim())) {
        res.push(
          <code key={index} className={classes.apiCode}>
            {item.replace(/"/g, '').trim()}
          </code>,
        );
      } else {
        res.push(<React.Fragment key={index}>{item.trim()}</React.Fragment>);
      }

      if (index !== types.length - 1) {
        res.push(' | ');
      }

      return res;
    });

    return (
      <code
        style={{
          color: '#c41d7f',
        }}
      >
        {result}
      </code>
    );
  };

  const columns = [
    {
      title: locate('属性', 'Property'),
      width: 200,
      fixed: 'left',
      render: (d: any) => (
        <a
          id={`${d.name}`}
          style={{ color: 'var(--soui-table-thead-font-color,var(--soui-neutral-text-5,#141737))' }}
        >
          <strong>{d.name}</strong>
        </a>
      ),
    },
    {
      title: locate('说明', 'Description'),
      width: 400,
      render: (d: any) => locate(d.tag.cn, d.tag.en),
    },
    {
      title: locate('类型', 'Type'),
      width: 300,
      render: (d: any) => {
        return renderType(d.type);
      },
    },
    {
      title: locate('默认值', 'Default'),
      width: 100,
      fixed: 'right',
      render: (d: any) => d.tag.default || '-',
    },
    {
      title: locate('版本', 'Version'),
      width: 80,
      render: (d: any) => d.tag.version,
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
        <Table
          keygen='name'
          bordered
          width={1000}
          columns={columns}
          data={data}
          rowClassName={props.rowClassName}
          onRowClick={d=> props.onRowClick(d.name)}
        />
      </div>
    </>
  );
};

const Api = (props: { api: MarkdownProps['api'] }) => {
  const api = props.api || [];
  const titles = api.map((item) => item.title);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const activeApi = searchParams.get('api');

  useEffect(() => {
    if(!activeApi) return;
    const activeApiAnchor = document.getElementById(activeApi);
    if(!activeApiAnchor) return;

    activeApiAnchor.scrollIntoView({
      behavior: "instant",
      block: 'center',
    });
  }, [activeApi])

  return (
    <div className={classes.api} style={{ padding: 24, display: 'flex' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {api.map((item, index) => {
          return (
            <SingleAPi
              key={index}
              {...item}
              isLast={index === api.length - 1}
              rowClassName={(d) => (d.name === activeApi ? classes.activeApi : '')}
              onRowClick={(api) => {
                navigate({
                  search: `?tab=api&api=${api}`,
                })
              }}
            />
          );
        })}
      </div>
      <div className='anchor' style={{ width: 192 }}>
        <Anchor anchorName='api' data={titles}></Anchor>
      </div>
    </div>
  );
};

export default Api;
