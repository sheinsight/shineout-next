import React, { useEffect, useMemo } from 'react';
import { Radio, Tooltip } from 'shineout';
import clsx from 'clsx';
import { useSnapshot } from 'valtio';
import store from '../../store';
import Locale from '../../locales';
import useStyle from './style';
import ConfigurationBar from './components/configuration-bar';
import { refreshIcon } from './icon';
import { AttachedType, type CollocatorProps } from './types';
import Console from './components/console';
import Resizable from './components/resizable';

// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import useCollocator from './hooks/use-collocator';
import Codesandbox from '../example/codesandbox';

const Collocator = (props: CollocatorProps) => {
  const { api, name, examples, className } = props;
  const state = useSnapshot(store);
  const docsLocale = Locale({ locale: state.locales });
  const tabsLocale = docsLocale['shineout.playground'];

  const styles = useStyle();

  const {
    componentList,
    radioValue,
    clearSign,
    config,
    attachedType,
    functions,
    codeFile,
    componentInfo,
    initValue,
    messages,
    setRadioValue,
    setClearSign,
    setConfig,
  } = useCollocator({ api, name });

  const renderHeader = (children: String | React.ReactElement, className?: string) => (
    <div className={clsx(styles.header, className)}>{children}</div>
  );

  const renderFunctions = () => (
    <div className={styles.functions}>
      <Codesandbox code={examples.code} className={clsx(styles.icon, styles.codesandBox)} tip='更多组合用法, 可前往Playground...' />
      {functions.map((item, index) => (
        <Tooltip tip={item.tip} trigger='hover' position='top'>
          <div
            key={index}
            className={clsx(styles.icon, [item.type === attachedType && styles.active])}
            onClick={item.onClick}
          >{item.name}</div>
        </Tooltip>
      ))}
    </div>
  );

  useEffect(() => {
    Prism.highlightAll();
  }, [codeFile, attachedType]);

  const attachedMap: Record<AttachedType, React.ReactElement | null> = useMemo(
    () => ({
      [AttachedType.NONE]: null,
      [AttachedType.CODE]: (
        <div className={styles.code}>
           <pre className={clsx(styles.codeWrapper, 'language-jsx')}>
            <code className={clsx('language-jsx')}>{codeFile}</code>
          </pre>
        </div>
      ),
      [AttachedType.CONSOLE]: (
        <Console messages={messages} />
      )
    }),
    [codeFile, messages],
  );

  if (!componentList.length) return null

  const renderElement = useMemo(() => componentInfo.element ? componentInfo.element(config): null, [componentInfo.element, config])

  return (
    <div className={clsx(styles.wrapper, className)}>
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
          <Resizable>
            <div className={styles.show}>{renderElement}</div>
            <>
              {renderFunctions()}
              <div className={styles.attached}>{attachedMap[attachedType]}</div>
            </>
          </Resizable>
        </div>
        <div className={styles.bar}>
          {renderHeader(
            <div className={styles.barHeader}>
              {tabsLocale['configuration']}
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
    </div>
  );
};

export default Collocator;
