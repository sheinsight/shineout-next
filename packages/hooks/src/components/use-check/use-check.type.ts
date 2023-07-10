import React from 'react';

export interface BaseCheckProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}
