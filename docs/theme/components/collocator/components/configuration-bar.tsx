import React from 'react';
import useStyle from '../style';
import { Collapse, Form, Input, Select, Switch, Tooltip } from 'shineout';
import { ComponentType, IInputType, type IItem } from '../types';
import TextareaWithClear from './textarea-with-clear';
import SwitchWithOther from './switch-with-other';
import InputType from './input-type';
import InputNumber from './input-number';
import clsx from 'clsx';
import { infoIcon } from '../icon';
import { isObject } from '../utils/is';

export interface ConfigurationBarProps {
  itemList: IItem[] | Record<string, IItem[]>;
  config: Record<string, any>;
  clearSign: boolean;
  setClearSign: (sign: boolean) => void;
  setConfig: (config: Record<string, any>) => void;
}

const isFunctionString = (funcStr: string) => {
  try {
      const parsedFunction = new Function(`return (${funcStr})`)();
      if (typeof parsedFunction === 'function') {
          return parsedFunction;
      }
      return false;
  } catch (e) {
      return false;
  }
}

const ConfigurationBar = (props: ConfigurationBarProps) => {
  const { itemList = [], config, clearSign, setClearSign, setConfig } = props;

  const styles = useStyle();

  const elementMap: Record<ComponentType, (d: IItem, parent?: string) => React.ReactElement> = {
    [ComponentType.SWITCH]: (d: IItem, parent?: string) => <Switch name={d.name} onChange={(v) => {
      if (!d.related) return

      if (v) {
        if (parent) {
          const tempConfig = d.mergeRelated && isObject(d.mergeRelated) ? Object.keys(d.mergeRelated).reduce((pre, cur) => (
            {
              ...pre,
              [cur]: {
                ...config[cur],
                ...d.mergeRelated?.[cur]
              }
            }
          ), {}) : {}

          setConfig({ ...config, ...tempConfig, [parent]: { ...config[parent], ...d.related, [d.name]: v } });
        } else {
          setConfig({ ...config, ...d.related, [d.name]: v });
        }
        return
      }
    }} />,
    [ComponentType.SELECT]: (d: IItem, parent?: string) => (
      <Select
        multiple={d.multiple}
        absolute 
        clearable 
        keygen
        data={d.value} 
        name={d.name}
        format={(v) => isFunctionString(v as string) || (v === 'null' ? null : (v === 'true' ? true : (v === 'false' ? false : v)))}
      />
    ),
    [ComponentType.TEXTAREA]: (d: IItem, parent?: string) => (
      <TextareaWithClear
        item={d}
        config={config}
        sign={clearSign}
        parent={parent}
        setSign={setClearSign}
        setConfig={setConfig}
      />
    ),
    [ComponentType.INPUT]: (d: IItem, parent?: string) => <Input name={d.name} />,
    [ComponentType.OTHER]: (d: IItem, parent?: string) => (
      <SwitchWithOther
        item={d}
        config={config}
        sign={clearSign}
        parent={parent}
        setSign={setClearSign}
        setConfig={setConfig}
      />
    ),
    [ComponentType.INPUTWITHNUMBER]: (d: IItem, parent?: string) => (
      <InputType
        item={d}
        config={config}
        sign={clearSign}
        parent={parent}
        type={IInputType.INPUTWITHNUMBER}
        setSign={setClearSign}
        setConfig={setConfig}
      />
    ),
    [ComponentType.INPUTWITHARRAY]: (d: IItem, parent?: string) => (
      <InputType
        item={d}
        config={config}
        sign={clearSign}
        parent={parent}
        type={IInputType.INPUTWITHARRAY}
        setSign={setClearSign}
        setConfig={setConfig}
      />
    ),
    [ComponentType.NUMBER]: (d: IItem, parent?: string) => (
      <InputNumber
        item={d}
        config={config}
        sign={clearSign}
        parent={parent}
        setSign={setClearSign}
        setConfig={setConfig}
      />
    )
  };

  const itemListByType = (list: IItem[]) => {

    const filterFn = (type: ComponentType) =>
      list.filter((item) => item.type === type)

    return ({
      [ComponentType.SWITCH]: filterFn(ComponentType.SWITCH),
      [ComponentType.OTHER]: filterFn(ComponentType.OTHER),
      [ComponentType.SELECT]: filterFn(ComponentType.SELECT),
      [ComponentType.INPUT]: filterFn(ComponentType.INPUT),
      [ComponentType.NUMBER]: filterFn(ComponentType.NUMBER),
      [ComponentType.INPUTWITHNUMBER]: filterFn(ComponentType.INPUTWITHNUMBER),
      [ComponentType.INPUTWITHARRAY]: filterFn(ComponentType.INPUTWITHARRAY),
      [ComponentType.TEXTAREA]: filterFn(ComponentType.TEXTAREA),
    })
  }

  const renderItem = (d: IItem, type?: string) => {
    return (
      <Form.Item label={!d.initValue ? (d.alias || d.name) : (
        <div className={styles.extraFormItem}>
          <span className={styles.extraFormItemName}>{d.alias || d.name}</span>
          <Tooltip className={styles.extraFormItemTip} tip={(Array.isArray(d.initValue) || isObject(d.initValue)) ? JSON.stringify(d.initValue) : `${d.initValue}`}>
            {infoIcon}
          </Tooltip>
        </div>
      )} className={styles.formItem} key={d.name}>
        {elementMap?.[d.type]?.(d, type)}
      </Form.Item>
    );
  }

  const renderAreaByType = (list: Record<ComponentType, IItem[]>, type?: string) => Object.keys(list).map((key) =>
    list[key as ComponentType].length ? (
      <div key={key} className={styles.formArea}>
        {list[key as ComponentType].map((item: IItem) => !item.hide ? renderItem(item, type) : null)}
      </div>
    ) : null,
  )

  if (!Array.isArray(itemList)) {
    const itemListFilter: Record<string, any> = Object.keys(itemList).reduce((acc, cur) => {
      return ({
        ...acc,
        [cur]: itemListByType(itemList[cur])
      })
    }, {})

    return (
      <Form labelVerticalAlign={'middle'} value={config} onChange={(v) => setConfig(v)} labelAlign='left' className={clsx(styles.form, styles.formCollapse)}>
        <Collapse border={false} className={styles.collapse}>
          {Object.keys(itemListFilter).map((type, index) => (
            <Collapse.Item title={type} keygen={`${index}`} key={index}>
              <Form.FieldSet name={type}>
                {renderAreaByType(itemListFilter[type], type)}
              </Form.FieldSet>
            </Collapse.Item>
          ))}
        </Collapse>
      </Form>
    )
  }

  const itemListFilter = itemListByType(itemList as IItem[]);

  return (
    <Form labelVerticalAlign={'middle'} value={config} onChange={(v) => setConfig(v)} labelAlign='left' className={styles.form}>
      {renderAreaByType(itemListFilter)}
    </Form>
  );
};

export default ConfigurationBar;
