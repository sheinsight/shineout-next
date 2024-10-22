import React, { useEffect, useMemo, useState } from 'react';
import { Message } from 'shineout';
import { apiConvert, childConvert } from '../utils/convert';
import { isBoolean, isObject, isArray } from '../utils/is';

import type { UseCollocatorProps, IItem } from '../types';
import { AttachedType } from '../types';
import { codeIcon, copyIcon } from '../icon';
import { placeholder as placeholderStr, placeholderExcludeList } from '../config';

const useCollocator = (props: UseCollocatorProps) => {
  const { api, name } = props;

  const structure = useMemo(() => apiConvert(api, name), [api, name])
  const componentList = useMemo(() => Object.keys(structure).filter(item => !structure[item].hide), [structure]);

  const [radioValue, setRadioValue] = useState<string>(componentList?.[0] || '');
  const [clearSign, setClearSign] = useState<boolean>(false);

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

  const [config, setConfig] = useState<Record<string, any>>(initValue);
  const [attachedType, setAttachedType] = useState<AttachedType>(AttachedType.NONE);

  useEffect(() => {
    setConfig(initValue);
  }, [initValue]);

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

  const handleCopy = () => {
    navigator?.clipboard?.writeText(codeFile);
    Message.success('复制成功', 1, {
      hideClose: true,
    });
  }

  const functions: { name: React.ReactElement; type?: AttachedType; onClick: () => void }[] = useMemo(
    () => [
      {
        name: copyIcon,
        onClick: handleCopy,
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

  return {
    componentList,
    radioValue,
    clearSign,
    config,
    attachedType,
    functions,
    codeFile,
    componentInfo,
    initValue,
    setRadioValue,
    setClearSign,
    setConfig,
    setAttachedType,
  }
}

export default useCollocator;