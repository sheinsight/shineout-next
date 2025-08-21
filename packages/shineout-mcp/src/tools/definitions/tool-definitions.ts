import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const TOOL_DEFINITIONS: Tool[] = [
  {
    name: 'get_component',
    description: `A comprehensive tool for retrieving complete Shineout component documentation and examples.
This tool provides everything needed to understand and implement Shineout components effectively.

When to use this tool:
- User requests to use or implement a specific Shineout component
- Need to understand component properties, methods, and events
- Looking for practical code examples of component usage
- Encountering specific component names like Button, Input, Form, Table
- Need TypeScript type definitions for components
- Want to see best practices and common patterns

Key features:
- Returns complete API documentation (Props/Methods/Events)
- Provides runnable code examples with real-world scenarios
- Includes TypeScript type definitions and interfaces
- Shows component usage patterns and best practices
- Highlights important notes and warnings

What you'll get:
- Full component API reference with descriptions
- Multiple code examples from basic to advanced
- Type definitions for TypeScript projects
- Component lifecycle and behavior details
- Common pitfalls and how to avoid them

Parameters explained:
- name: The exact component name (case-sensitive), such as Button, Input, Form, Table, Select, Modal, etc.

You should:
1. Use this tool when user mentions a specific Shineout component by name
2. First retrieve examples using get_examples to understand common usage patterns
3. Present both API documentation and practical examples together
4. Highlight the most relevant props/methods based on user's context
5. Show how different props work together in real scenarios`,
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '组件名称，如 Button, Input, Form 等',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_component_api',
    description: `A quick reference tool for accessing Shineout component API documentation in structured format.
This tool is optimized for quick lookups when you need specific API information without full examples.

When to use this tool:
- Need a quick reference of component properties
- Looking up supported methods and their signatures
- Checking property types and default values
- Need TypeScript interface definitions
- Want to see all available options for a component
- Verifying if a specific prop or method exists

Key features:
- Returns API documentation in table format for easy scanning
- Shows property types, default values, and required flags
- Includes method signatures with parameter details
- Provides TypeScript type definitions
- Can filter by category (props, methods, events, subComponents)
- Automatically includes relevant code snippets

Output format:
- Structured tables with clear columns
- Type information with full TypeScript support
- Default values clearly marked
- Required properties highlighted
- Related examples automatically included

Parameters explained:
- component: The component name to look up (e.g., Button, Select, Table)
- category: Optional filter to get only specific API category (props/methods/events/subComponents)

You should:
1. Always pair this with get_examples to show practical usage of the APIs
2. Use this for quick reference after showing examples
3. Focus on the specific category (props/methods) the user is asking about
4. Present the API table alongside relevant code snippets
5. Emphasize required props and commonly used combinations
6. Explain how props interact with each other through examples`,
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称',
        },
        category: {
          type: 'string',
          description: '只获取特定类别的 API',
          enum: ['props', 'methods', 'events', 'subComponents'],
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'compare_components_api',
    description: `A comparison tool for analyzing API differences between multiple Shineout components.
This tool helps make informed decisions when choosing between similar components.

When to use this tool:
- Deciding between similar components (Input vs Textarea, Select vs Cascader)
- Understanding the differences in functionality
- Comparing component capabilities and limitations
- Choosing the most suitable component for your use case
- Evaluating migration paths between components
- Understanding trade-offs between component options

Comparison features:
- Side-by-side API comparison
- Highlights unique features of each component
- Shows common properties and methods
- Identifies key differences in behavior
- Provides usage recommendations
- Shows performance and complexity differences

Common comparisons:
- Input vs Textarea: Single-line vs multi-line text input
- Select vs Cascader: Flat vs hierarchical selection
- Modal vs Drawer: Center overlay vs side panel
- DatePicker vs TimePicker: Date vs time selection
- Table vs List: Tabular vs linear data display

Output includes:
- Feature comparison matrix
- Unique capabilities of each component
- Common use cases for each
- Migration considerations
- Performance implications

Parameters explained:
- components: Array of 2-5 component names to compare (e.g., ["Input", "Textarea"] or ["Select", "Cascader", "TreeSelect"])

You should:
1. First get examples for each component to understand their practical differences
2. Focus on real-world usage differences, not just API differences
3. Provide clear recommendations on when to use each component
4. Show code examples that demonstrate the key differences
5. Help user make an informed decision based on their specific needs
6. Include migration tips if user is switching between components`,
    inputSchema: {
      type: 'object',
      properties: {
        components: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '要对比的组件名称列表',
          minItems: 2,
          maxItems: 5,
        },
      },
      required: ['components'],
    },
  },
  {
    name: 'search_components',
    description: `A powerful component discovery tool supporting multi-keyword and fuzzy matching.
This tool helps find the right Shineout components based on functional descriptions or partial names.

When to use this tool:
- User describes needed functionality without knowing component names
- Searching for components by type (forms, modals, selectors)
- Exploring available component options for a use case
- Using natural language or Chinese descriptions
- Need to discover all components for a specific purpose
- Looking for components with partial name matches

Search capabilities:
- Multi-keyword search with intelligent matching
- Supports both English and Chinese queries
- Fuzzy matching for approximate names
- Category-based filtering
- Returns full API documentation for matches
- Provides smart suggestions when no exact matches found

Search examples:
- Functionality: "form input", "modal dialog", "data table"
- Type descriptions: "text input", "dropdown menu", "date picker"
- Chinese: "表单", "输入框", "选择器", "弹窗"
- Multi-word: "table form input select", "validation message"
- Partial names: "sel" (finds Select), "inp" (finds Input)

Categories:
- form: Form-related components (Input, Select, DatePicker, etc.)
- display: Display components (Table, List, Card, etc.)
- layout: Layout components (Grid, Space, Divider, etc.)
- feedback: Feedback components (Modal, Message, Alert, etc.)
- navigation: Navigation components (Menu, Tabs, Breadcrumb, etc.)

Parameters explained:
- query: Search keywords - component names, functional descriptions, or features
- category: Optional filter to narrow search to specific component category

You should:
1. Use this when user describes functionality without naming specific components
2. For each found component, immediately fetch examples to show practical usage
3. Present components with their most relevant examples
4. If no exact matches, suggest similar components with examples
5. Group results by relevance and use case
6. Always follow up with get_examples for the most relevant matches`,
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: '搜索关键词（组件名、功能描述等）',
        },
        category: {
          type: 'string',
          description: '组件分类：form, display, layout, feedback, navigation',
          enum: ['form', 'display', 'layout', 'feedback', 'navigation'],
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_components',
    description: `A comprehensive tool for browsing all available Shineout components.
This tool provides an organized overview of the component library.

When to use this tool:
- Want to see what components Shineout offers
- Browsing components by category
- First time using Shineout
- Need a component overview or catalog
- Planning which components to use in a project
- Exploring alternatives within a category

Output features:
- Organized list of all components
- Brief description for each component
- Grouped by logical categories
- Shows component relationships
- Indicates commonly used components
- Links to detailed documentation

Categories explained:
- form: Components for user input and forms (Input, Select, DatePicker, Form, etc.)
- display: Components for showing data (Table, List, Card, Image, etc.)
- layout: Components for page structure (Grid, Space, Divider, Container, etc.)
- feedback: Components for user feedback (Modal, Message, Alert, Progress, etc.)
- navigation: Components for navigation (Menu, Tabs, Breadcrumb, Pagination, etc.)
- all: Show all components regardless of category

Benefits:
- Quick discovery of available components
- Understanding component organization
- Finding alternatives within categories
- Planning component usage

Parameters explained:
- category: Filter components by category, or use 'all' to see everything

You should:
1. Use this when user is exploring or new to Shineout
2. After listing, proactively show examples for commonly used components
3. Group components logically to help user navigate
4. Highlight the most popular components in each category
5. Suggest specific components based on user's described needs
6. Follow up with examples for any components the user shows interest in`,
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: '按分类筛选',
          enum: ['form', 'display', 'layout', 'feedback', 'navigation', 'all'],
        },
      },
    },
  },
  {
    name: 'get_examples',
    description: `A practical tool for retrieving real-world code examples of Shineout components.
This tool provides runnable code samples demonstrating various component usage patterns.

When to use this tool:
- Need to see actual implementation code
- Want to understand practical component usage
- Looking for code patterns to copy and adapt
- Searching for specific scenario examples
- Learning how components work together
- Need boilerplate code to start with

Example categories:
- basic: Essential usage patterns for getting started
- advanced: Complex scenarios and advanced features
- form: Form integration and data handling
- validation: Input validation and error handling
- customization: Styling and behavior customization
- integration: Working with other components/libraries

Output includes:
- Complete, runnable code examples
- Inline comments explaining key concepts
- Import statements and dependencies
- Common variations and options
- Best practices and tips
- Live demo links when available

Benefits:
- Learn by example with real code
- Copy-paste ready implementations
- See components in context
- Understand common patterns
- Avoid common pitfalls

Parameters explained:
- component: The component name to get examples for (e.g., Button, Form, Table)
- scenario: Optional filter for specific use cases (basic/advanced/form/validation)

You should:
1. ALWAYS use this tool before showing component APIs to understand usage patterns
2. Start with basic examples, then show advanced ones if needed
3. Select examples that match the user's specific use case
4. Explain key concepts through code comments
5. Show complete, runnable code that users can copy and adapt
6. Demonstrate how different props work together in real scenarios
7. Use examples to illustrate best practices and common patterns`,
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称',
        },
        scenario: {
          type: 'string',
          description: '使用场景：basic, advanced, form, validation',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'get_best_practices',
    description: `A specialized tool for retrieving component best practices, common patterns, and implementation guidelines.
This tool provides curated knowledge about optimal component usage and common pitfalls to avoid.

When to use this tool:
- User asks for best practices or recommendations
- Need guidance on proper component implementation
- Looking for do's and don'ts
- Want to understand common patterns and anti-patterns
- Need tips for performance optimization
- Seeking architectural guidance for component usage

Key features:
- Returns recommended practices with code examples
- Shows anti-patterns and what to avoid
- Provides common scenarios and solutions
- Includes performance tips and optimization techniques
- Offers migration guidance from other libraries
- Highlights important implementation notes

Content includes:
- Recommended patterns with explanations
- Not recommended patterns with reasons
- Common use cases and their solutions
- API usage highlights and tips
- Real-world scenario implementations
- Performance considerations

Parameters explained:
- component: The component name (e.g., Form, Table, Select) or "all" for general practices
- category: Optional filter (recommended/not-recommended/scenarios/tips)

You should:
1. Use this when users ask "how should I..." or "what's the best way to..."
2. Combine with get_examples to show practical implementations
3. Emphasize the "why" behind each recommendation
4. Show both good and bad examples for comparison
5. Focus on patterns that solve real problems
6. Include migration tips if user is coming from other libraries`,
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称，如 Form, Table, Select 或 "all" 获取所有最佳实践',
        },
        category: {
          type: 'string',
          description: '筛选类别',
          enum: ['recommended', 'not-recommended', 'scenarios', 'tips', 'all'],
        },
      },
      required: ['component'],
    },
  },
];