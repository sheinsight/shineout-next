import { useState, useEffect } from "react";
import { Switch } from "shineout";
import type { Icomponent } from "../types";

const SwitchWithOther = (props: Icomponent) => {
  const { item, config, sign, parent, setSign, setConfig } = props;

  const [value, setValue] = useState<boolean>(false);

  const changeFn = (v: boolean) => {
    if (v) {
      setSign(false);
      if (parent) {
        setConfig({ ...config, [parent]: { ...config[parent], [item.name]: item.initValue } });
      } else {
        setConfig({ ...config, [item.name]: item.initValue });
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
    if (!sign) return;
    
    changeFn(false)
  }, [sign]);

  return (
    <Switch
      value={value}
      onChange={changeFn}
    />
  );
}

export default SwitchWithOther;

