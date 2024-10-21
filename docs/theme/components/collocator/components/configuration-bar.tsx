import React from 'react';
import useStyle from '../style';
import { Collapse, Form, Input, Select, Switch } from 'shineout';
import { ComponentType, IInputType, type IItem } from '../types';
import TextareaWithClear from './textarea-with-clear';
import SwitchWithOther from './switch-with-other';
import InputType from './input-type';
import InputNumber from './input-number';
import classNames from 'classnames';

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
    [ComponentType.SWITCH]: (d: IItem, parent?: string) => <Switch name={d.name} />,
    // TODO: select should include customize functions
    [ComponentType.SELECT]: (d: IItem, parent?: string) => (
      <Select
        absolute 
        clearable 
        keygen
        data={d.value} 
        name={d.name}
        format={(v) => isFunctionString(v as string) || (v === 'true' ? true : (v === 'false' ? false : v))}
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

  const renderItem = (d: IItem, type?: string) => (
    <Form.Item label={d.alias || d.name} className={styles.formItem} key={d.name}>
      {elementMap?.[d.type]?.(d, type)}
    </Form.Item>
  );

  const renderAreaByType = (list: Record<ComponentType, IItem[]>, type?: string) => Object.keys(list).map((key) =>
    list[key as ComponentType].length ? (
      <div key={key} className={styles.formArea}>
        {list[key as ComponentType].map((item: IItem) => renderItem(item, type))}
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
      <Form labelWidth={80} value={config} onChange={(v) => setConfig(v)} labelAlign='left' className={classNames(styles.form, styles.formCollapse)}>
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
    <Form labelWidth={80} value={config} onChange={(v) => setConfig(v)} labelAlign='left' className={styles.form}>
      {renderAreaByType(itemListFilter)}
    </Form>
  );
};

export default ConfigurationBar;
