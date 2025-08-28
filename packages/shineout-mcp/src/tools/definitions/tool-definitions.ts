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
      },
      required: ['component'],
    },
  },
  {
    name: 'get_tips',
    description: `A specialized tool for retrieving component usage tips and best practices.
This tool provides curated tips about optimal component usage and common pitfalls to avoid.

When to use this tool:
- User asks for component usage tips or guidelines
- Need quick reference for do's and don'ts
- Want to understand proper component usage in Forms
- Looking for validation and submission flow explanations
- Need guidance on component integration patterns
- Seeking tips to avoid common mistakes

Key features:
- Returns concise usage tips for components
- Shows what to avoid (marked with ❌ or 🚫)
- Explains Form integration patterns
- Provides submission and validation flow details
- Highlights important implementation notes
- Covers data flow and state management tips

Content includes:
- Core usage tips and best practices
- Common mistakes to avoid
- Form integration guidelines
- Validation rules and patterns
- Submission flow explanations
- Data flow mechanisms (for Form component)

Parameters explained:
- component: The component name (e.g., Form, Input, Select) or "all" to see all available tips

You should:
1. Use this when users need quick guidance on component usage
2. Show tips when users are implementing Forms or form controls
3. Emphasize the integration patterns with Form component
4. Highlight what NOT to do (❌ items) to prevent errors
5. Explain the automatic data binding through 'name' prop
6. Clarify when to use controlled vs uncontrolled patterns`,
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称，如 Form, Input, Select 或 "all" 获取所有组件提示',
        },
      },
    },
  },
  {
    name: 'get_component_classnames',
    description: `A specialized tool for retrieving component className information and DOM rendering structures.
This tool provides comprehensive styling information including available CSS classes and actual DOM structures from test snapshots.

When to use this tool:
- Need to understand component styling system and available CSS classes
- Want to see how components render in different scenarios
- Looking for specific className usage patterns
- Need DOM structure information for styling or testing
- Understanding component CSS architecture
- Debugging style-related issues

Key features:
- Complete list of all available className for a component
- Real DOM structures extracted from test snapshots
- Usage statistics showing which classes are used in which scenarios
- Categorized className list (base, size, type, state, layout)
- Actual rendered HTML structure with applied classes
- Usage frequency analysis across different test scenarios

Output includes:
- Categorized className list with descriptions
- DOM rendering structures from test scenarios
- Usage statistics and frequency analysis
- Unused className (for conditional or dynamic scenarios)
- Component-specific styling patterns

Benefits:
- Understand complete component styling system
- See real-world DOM structure and class usage
- Identify available styling options
- Debug CSS and styling issues
- Plan custom styling and theme overrides

Parameters explained:
- component: The component name to get className info for (e.g., Button, Input, Form)

You should:
1. Use this when users ask about component styling or CSS classes
2. Show both the available classes and how they're actually used
3. Explain the categorization and meaning of different class types
4. Highlight commonly used vs rarely used classes
5. Show the relationship between props and applied classes
6. Provide guidance on custom styling and theme customization`,
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称，如 Button, Input, Form 等',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'list_all_classnames',
    description: `A comprehensive overview tool for browsing className information across all Shineout components.
This tool provides a high-level view of the entire component styling system.

When to use this tool:
- Want to see the overall Shineout styling system architecture
- Browsing available styling options across all components
- Planning consistent styling across multiple components
- Understanding naming conventions and patterns
- Getting an overview of component CSS architecture

Key features:
- Complete overview of all component className systems
- Statistical analysis of styling patterns
- Component comparison by styling complexity
- Naming convention analysis
- Overall system architecture insights

Output includes:
- Total className count across all components
- Component-by-component styling statistics
- Most commonly used styling patterns
- System-wide naming conventions
- Component styling complexity comparison

Benefits:
- Understand the complete Shineout styling ecosystem
- Plan consistent styling strategies
- Identify styling patterns and conventions
- Choose components based on styling flexibility

You should:
1. Use this for system-wide styling planning and analysis
2. Show statistical insights about the styling system
3. Highlight components with the most styling options
4. Explain naming conventions and patterns
5. Guide users toward components that fit their styling needs`,
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];