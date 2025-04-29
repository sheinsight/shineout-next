"use client"
import { usePersistFn } from '@sheinx/hooks';
import React, { createContext, useMemo, useRef, useState, useContext } from 'react';

export interface FormFooterContextValue {
  setFormStats: (disabled?: 'disabled' | 'pending') => void;
  setFormInfo: (info: { submit: () => void }) => boolean;
  deleteFormInfo: () => void;
  formStats: 'disabled' | 'pending' | undefined;
  func: {
    submit: (withValidate?: boolean, callback?: () => void) => void;
  };
}

export const FormFooterContext = createContext<FormFooterContextValue | null>(null);

export const FormFooterProvider = (props: { children: React.ReactNode }) => {
  const [formStats, setFormS] = useState<FormFooterContextValue['formStats']>(undefined);
  const { current: context } = useRef({ submit: () => {}, hasSubmit: false });

  const setFormInfo = usePersistFn((info: { submit: () => void }) => {
    if(!context.hasSubmit){
      context.submit = info.submit;
      context.hasSubmit = true;
      return true
    }
    return false
  });

  const deleteFormInfo = usePersistFn(() => {
    context.hasSubmit = false;
    context.submit = () => {};
  });

  const setFormStats = usePersistFn((disabled?: 'disabled' | 'pending') => {
    if (disabled !== formStats) {
      setFormS(disabled);
    }
  });
  const value: FormFooterContextValue = useMemo(
    () => ({ setFormStats, setFormInfo, deleteFormInfo, formStats, func: context }),
    [formStats],
  );

  return <FormFooterContext.Provider value={value}>{props.children}</FormFooterContext.Provider>;
};

export const useFormFooter = () => {
  const context = useContext(FormFooterContext);
  return context;
};
