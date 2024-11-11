import { Input } from "shineout";
import type { Icomponent } from "../types";
import useSign from "../hooks/use-sign";
import { isObject } from "../utils/is";

const InputNumber = (props: Icomponent) => {
  const { item, config, sign, parent, setSign, setConfig } = props;

  const [value, setValue] = useSign({
    initValue: item.defaultValue || item.defaultValue === 0 ? `${item.defaultValue}` : '',
    sign,
  })

  const changeFn = (v?: string) => {
    setValue(v)
    setSign(false)
    const tempRelate = Number(v) && item.related ? item.related : {}
    
    if (parent) {
      const tempConfig = Number(v) && item.mergeRelated && isObject(item.mergeRelated) ? Object.keys(item.mergeRelated).reduce((pre, cur) => (
        {
          ...pre,
          [cur]: {
            ...config[cur],
            ...item.mergeRelated?.[cur]
          }
        }
      ), {}) : {}

      setConfig({ ...config, ...tempConfig, [parent]: { ...config[parent], [item.name]: v ? Number(v): undefined, ...tempRelate } });
      return
    }
    setConfig({ ...config, [item.name]: v ? Number(v): undefined, ...tempRelate });
  }

  return (
    <Input value={value} onChange={changeFn} type='number' />
  )
}

export default InputNumber