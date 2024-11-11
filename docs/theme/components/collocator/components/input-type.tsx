import { Input } from "shineout";
import { type Icomponent, IInputType } from "../types";
import { inputValueConvert, inputValueConvertByArray } from "../utils/convert";
import useSign from "../hooks/use-sign";

export interface InputTypeProps extends Icomponent {
  type: IInputType
}

const convertFunctionsMap: Record<IInputType, any> = {
  [IInputType.INPUTWITHNUMBER]: inputValueConvert,
  [IInputType.INPUTWITHARRAY]: inputValueConvertByArray
}

const InputType = (props: InputTypeProps) => {
  const { item, config, sign, type, parent, setSign, setConfig } = props;

  const [value, setValue] = useSign({
    initValue: item.defaultValue ? (Array.isArray(item.defaultValue) ? JSON.stringify(item.defaultValue) : item.defaultValue) : '',
    sign,
  })

  const changeFn = (v?: string) => {
    setValue(v);
    setSign(false)

    if (parent) {
      setConfig({ ...config, [parent]: { ...config[parent], [item.name]: convertFunctionsMap[type]?.(v!) } });
      return
    }

    setConfig({ ...config, [item.name]: convertFunctionsMap[type]?.(v!) });
  }

  return (
    <Input value={value} onChange={changeFn} />
  );
}

export default InputType;