import React, { useEffect, useMemo } from 'react';
import { Radio } from 'shineout';
import classNames from 'classnames';
import useStyle from './style';
import ConfigurationBar from './components/configuration-bar';
import { codeBoxIcon, refreshIcon, codeIcon, copyIcon } from './icon';
import { AttachedType, IItem } from './types';
import { MarkdownProps } from 'docs/types';
import { apiConvert, childConvert } from './utils/convert';
import { isArray } from './utils/is';

// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import { isBoolean, isObject } from './utils/is';
import { placeholder as placeholderStr } from './config';

const  placeholderExcludeList = ['columns']

export interface CollocatorProps {
  api: MarkdownProps['api']
  name: string
}

const Collocator = (props: CollocatorProps) => {
  const { api, name } = props;
  const styles = useStyle();

  const structure = useMemo(() => apiConvert(api, name), [api, name])
  const componentList = useMemo(() => Object.keys(structure).filter(item => !structure[item].hide), [structure]);

  const [radioValue, setRadioValue] = React.useState<string>(componentList?.[0] || '');
  const [clearSign, setClearSign] = React.useState<boolean>(false);

  const componentInfo = useMemo(() => radioValue ? structure?.[radioValue] : {}, [structure, radioValue]);

  const collectInitValue = (list: IItem[]) => list.reduce(
    (pre: Record<string, any>, cur: IItem) =>
      cur.defaultValue || cur.defaultValue === 0 ? { ...pre, [cur.name]: cur.defaultValue } : pre,
    {},
  )

  const initValue = useMemo(
    () =>
      isArray(componentInfo.configurationItemList) ?
        collectInitValue(componentInfo.configurationItemList) : 
        Object.keys(componentInfo.configurationItemList || {}).reduce((acc, cur) => {
          return (
            {
              ...acc,
              [cur]: collectInitValue(componentInfo.configurationItemList?.[cur])
            }
          )
        }, {}),
    [componentInfo.configurationItemList],
  );

  const [config, setConfig] = React.useState<Record<string, any>>(initValue);
  const [attachedType, setAttachedType] = React.useState<AttachedType>(AttachedType.NONE);

  const renderHeader = (children: String | React.ReactElement, className?: string) => (
    <div className={classNames(styles.header, className)}>{children}</div>
  );

  useEffect(() => {
    setConfig(initValue);
  }, [initValue]);

  const functions: { name: React.ReactElement; type?: AttachedType; onClick: () => void }[] = useMemo(
    () => [
      {
        name: copyIcon,
        onClick: () => {},
      },
      {
        name: codeBoxIcon,
        onClick: () => {},
      },
      {
        name: codeIcon,
        type: AttachedType.CODE,
        onClick: () => {
          attachedType === AttachedType.CODE
            ? setAttachedType(AttachedType.NONE)
            : setAttachedType(AttachedType.CODE);
        },
      },
    ],
    [attachedType],
  );

  const renderFunctions = () => (
    <div className={styles.functions}>
      {functions.map((item, index) => (
        <div
          key={index}
          className={classNames(styles.icon, [item.type === attachedType && styles.active])}
          onClick={item.onClick}
        >{item.name}</div>
      ))}
    </div>
  );


  const codeFile = useMemo(() => {
    if (!componentInfo.code) return ''

    const createPlaceholder = (config: Record<string, any>, list: IItem[] = []) => Object.keys(config).reduce((pre, cur) => {
      if (
        config[cur] === undefined ||
        list.find(
          (item: IItem) => item.name === cur && item.defaultValue === config[cur] && !item.notHideDefaultValue
        ) || cur === 'children'
      )
        return pre;
      if (typeof config[cur] === 'string') return pre + ` ${cur}='${config[cur]}'`;
      if (isObject(config[cur]) || Array.isArray(config[cur])) return pre + ` ${cur}={${JSON.stringify(config[cur])}}`;

      return pre + ` ${cur}${isBoolean(config[cur]) && config[cur] ? '' : `={${config[cur]}}`}`;
    }, '')

    const createPlaceholderExcludeList = (config: Record<string, any>) => Object.keys(config).reduce((pre, cur) => {
      if (config[cur] === undefined) return pre

      if (isObject(config[cur]) || Array.isArray(config[cur])) return pre + `${cur}: ${JSON.stringify(config[cur])},`;
      if (typeof config[cur] === 'string') return pre + `${cur}: '${config[cur]}',`;
      return pre + `${cur}: ${config[cur]},`
    }, '')

    let codeOrigin = componentInfo.code;

    if (componentInfo.merge) {
      return Object.keys(config).reduce((pre, cur) => {
        const tempConfig = config[cur]
        
        const placeholder = placeholderExcludeList.includes(cur) ? createPlaceholderExcludeList(tempConfig) : createPlaceholder(tempConfig, componentInfo?.configurationItemList?.[cur])
        const replaceStr = `#placeholder-${cur}`

        return `${pre.replace(replaceStr, placeholder)}`
      }, codeOrigin)
    }

    const placeholder = createPlaceholder(config, componentInfo.configurationItemList)

    if (Object.keys(config).includes('children')) codeOrigin = childConvert(config.children, codeOrigin);

    return `${codeOrigin.replace(placeholderStr, placeholder)}`;
  }, [radioValue, componentInfo, JSON.stringify(config), config]);

  useEffect(() => {
    Prism.highlightAll();
  }, [codeFile, attachedType]);

  const attachedMap: Record<AttachedType, React.ReactElement | null> = useMemo(
    () => ({
      [AttachedType.NONE]: null,
      [AttachedType.CODE]: (
        <div className={styles.code}>
           <pre className={classNames(styles.codeWrapper, 'language-jsx')}>
            <code className={classNames('language-jsx')}>{codeFile}</code>
          </pre>
        </div>
      ),
    }),
    [codeFile],
  );

  if (!componentList.length) return null
  console.log('config', config)
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.content}>
          {renderHeader(
            <Radio.Group
              keygen
              button={'outline'}
              data={componentList}
              value={radioValue}
              size='small'
              onChange={(v) => setRadioValue(v)}
            />,
          )}
          <div className={styles.show}>{componentInfo.element ? componentInfo.element(config): null}</div>
          {renderFunctions()}
        </div>
        <div className={styles.bar}>
          {renderHeader(
            <div className={styles.barHeader}>
              {'配置'}
              <div className={styles.barIcon} onClick={() => {
                  setConfig(initValue);
                  setClearSign(true);
                }}>
                {refreshIcon}
              </div>
            </div>,
          )}
          <ConfigurationBar
            itemList={componentInfo.configurationItemList}
            config={config}
            clearSign={clearSign}
            setClearSign={setClearSign}
            setConfig={setConfig}
          />
        </div>
      </div>
      <div className={styles.attached}>{attachedMap[attachedType]}</div>
    </div>
  );
};

export default Collocator;
