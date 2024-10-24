import { useState, useEffect } from "react";
import { Switch } from "shineout";
import type { Icomponent } from "../types";
import { isObject } from "../utils/is";

const SwitchWithOther = (props: Icomponent) => {
  const { item, config, sign, parent, setSign, setConfig } = props;

  const [value, setValue] = useState<boolean>(item.defaultValue ? true : false);

  const changeFn = (v: boolean) => {
    if (v) {
      setSign(false);

      if (parent) {
        const tempConfig = item.mergeRelated && isObject(item.mergeRelated) ? Object.keys(item.mergeRelated).reduce((pre, cur) => (
          {
            ...pre,
            [cur]: {
              ...config[cur],
              ...item.mergeRelated?.[cur]
            }
          }
        ), {}) : {}

        setConfig({ ...config, ...tempConfig, [parent]: { ...config[parent], [item.name]: item.initValue, ...item.related } });
      } else {
        setConfig({ ...config, [item.name]: item.initValue, ...item.related });
      }
    } else {
      if (parent) {
        delete config[parent][item.name];
      } else {
        delete config[item.name];
      }
      setConfig({...config})
    } 
    setValue(v);
  }

  useEffect(() => {
    if (parent && !!config[parent][item.name] !== value) {
      if (typeof config[parent][item.name] === 'boolean') return
      setValue(!!config[parent][item.name]);
      setSign(false);
      return
    }

    if (!parent && !!config[item.name] !== value) {
      if (typeof config[item.name] === 'boolean') return
      setValue(!!config[item.name]);
      setSign(false);
    }
  }, [config, value, item.name, parent])

  useEffect(() => {
    if (!sign) return;
    
    changeFn(item.defaultValue ? true : false)
  }, [sign]);

  return (
    <Switch
      value={value}
      onChange={changeFn}
    />
  );
}

export default SwitchWithOther;

