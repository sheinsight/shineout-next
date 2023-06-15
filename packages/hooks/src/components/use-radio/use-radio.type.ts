import React from 'react';

export interface BaseRadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent) => void;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}
