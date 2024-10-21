import { Input } from "shineout";
import type { Icomponent } from "../types";
import useSign from "../hooks/use-sign";

const InputNumber = (props: Icomponent) => {
  const { item, config, sign, parent, setSign, setConfig } = props;

  const [value, setValue] = useSign({
    initValue: item.defaultValue || item.defaultValue === 0 ? `${item.defaultValue}` : '',
    sign
  })

  const changeFn = (v?: string) => {
    setValue(v)
    setSign(false)
    
    if (parent) {
      setConfig({ ...config, [parent]: { ...config[parent], [item.name]: Number(v) } });
      return
    }
    setConfig({ ...config, [item.name]: Number(v) });
  }

  return (
    <Input value={value} onChange={changeFn} type='number' />
  )
}

export default InputNumber