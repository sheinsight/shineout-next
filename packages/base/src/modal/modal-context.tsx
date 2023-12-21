import { usePersistFn } from '@sheinx/hooks';
import React, { createContext, useMemo, useRef, useState } from 'react';

export interface ModalFormContextValue {
  setFormStats: (disabled?: 'disabled' | 'pending') => void;
  setFormInfo: (info: { submit: () => void }) => void;
  formStats: 'disabled' | 'pending' | undefined;
  func: {
    submit: () => void;
  };
}

export const ModalFormContext = createContext<ModalFormContextValue | null>(null);

export const ModalFormProvider = (props: { children: React.ReactNode }) => {
  const [formStats, setFormStats] = useState<ModalFormContextValue['formStats']>(undefined);
  const { current: context } = useRef({ submit: () => {} });

  const setFormInfo = usePersistFn((info: { submit: () => void }) => {
    context.submit = info.submit;
  });
  const value: ModalFormContextValue = useMemo(
    () => ({ setFormStats, setFormInfo, formStats, func: context }),
    [formStats],
  );

  return <ModalFormContext.Provider value={value}>{props.children}</ModalFormContext.Provider>;
};
