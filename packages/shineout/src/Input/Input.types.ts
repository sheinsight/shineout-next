import { Input } from '@shined/ui';
import React from 'react';

import type { Form } from '@shined/ui';

type BaseInputProps = React.ComponentProps<typeof Input>;
type FormFieldProps = React.ComponentProps<typeof Form.Field<string>>;

export interface InputProps
  extends Omit<BaseInputProps, 'jssStyle'>,
    Pick<FormFieldProps, 'reservable' | 'rules'> {
  name?: string;
}
