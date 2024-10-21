import { Textarea } from "shineout";
import type { Icomponent } from "../types";
import { stringConvert } from "../utils/convert";
import useStyle from "../style";
import useSign from "../hooks/use-sign";

const TextareaWithClear = (props: Icomponent) => {
  const { item, config, sign, parent, setSign, setConfig } = props;

  const styles = useStyle()

  const [value, setValue] = useSign({
    initValue: item.defaultValue ? JSON.stringify(item.defaultValue) : '',
    sign
  })

  return (
    <Textarea
      className={styles.textarea}
      placeholder="输入完成后按回车键"
      value={value}
      onChange={(v) => {
        setSign(false);
        setValue(v);
      }}
      onEnterPress={(v) => {
        const isEmpty = !v || /^\n*$/.test(v);
        const newValue = isEmpty ? '' : stringConvert(v);

        if (parent) {
          setConfig({ ...config, [parent]: { ...config[parent], [item.name]: newValue } });
        } else {
          setConfig({ ...config, [item.name]: newValue });
        }
      }}
    />
  );
};

export default TextareaWithClear;