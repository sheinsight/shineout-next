"use client"
import * as React from 'react';
import { SchemaBuilder } from './use-form-schema/form-schema-builder';

export type FormSchemaContextValueType = SchemaBuilder

export const FormSchemaContext = React.createContext<FormSchemaContextValueType | null>(null);
export const useFormSchema = () => React.useContext(FormSchemaContext);

FormSchemaContext.displayName = 'FormSchemaContext';
