import { useState, useEffect } from "react";

export interface UseSignProps {
  initValue?: string
  sign: boolean;
}

const useSign = (props: UseSignProps) => {
  const { initValue, sign } = props;

  const [value, setValue] = useState<string | undefined>(initValue);

  useEffect(() => {
    if (!sign) return;

    setValue(initValue);
  }, [sign])

  useEffect(() => {
    setValue(initValue);
  }, [initValue])

  return [value, setValue] as const;
}

export default useSign;