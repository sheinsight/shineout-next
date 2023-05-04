import { Input } from '@shined/ui';

import React from 'react';
type BaseInputProps = React.ComponentProps<typeof Input>;

export interface InputProps extends Omit<BaseInputProps, 'jssStyle'> {
  name?: string;
  reservable?: boolean;
}
