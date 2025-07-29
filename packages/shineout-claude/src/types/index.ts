export interface ComponentProp {
  name: string;
  type: string;
  defaultValue?: string;
  required: boolean;
  description: string;
  options?: string[];
}

export interface ComponentEvent {
  name: string;
  description: string;
  signature?: string;
  parameters?: {
    name: string;
    type: string;
    description: string;
  }[];
}

export interface ComponentExample {
  title: string;
  description?: string;
  scenario: 'basic' | 'advanced' | 'form' | 'validation' | 'custom';
  code: string;
}

export interface ComponentData {
  name: string;
  description: string;
  category: 'form' | 'display' | 'layout' | 'feedback' | 'navigation' | 'other';
  importPath: string;
  props?: ComponentProp[];
  events?: ComponentEvent[];
  examples?: ComponentExample[];
  subComponents?: string[];
  relatedComponents?: string[];
  version?: string;
  deprecated?: boolean;
}

export interface SearchResult {
  name: string;
  description: string;
  category: string;
  importPath: string;
  relevance: number;
}

export interface ComponentIndex {
  [componentName: string]: ComponentData;
}