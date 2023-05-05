import React from 'react';
import { Form } from '@shined/ui';

export type BaseFormType = React.ComponentProps<typeof Form>;

export type FormProps = Omit<BaseFormType, 'jssStyle'>;
