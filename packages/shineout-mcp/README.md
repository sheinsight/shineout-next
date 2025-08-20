# @sheinx/shineout-mcp

<p align="center">
  <img alt="shineout-mcp" src="https://user-images.githubusercontent.com/101764/44770646-44f53000-ab9b-11e8-834e-2b1394cea318.png" width="300">
</p>

<p align="center">
  Shineout documentation provider for Claude AI via MCP protocol
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sheinx/shineout-mcp"><img src="https://img.shields.io/npm/v/@sheinx/shineout-mcp.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@sheinx/shineout-mcp"><img src="https://img.shields.io/npm/dm/@sheinx/shineout-mcp.svg?style=flat-square"></a>
  <img src="https://img.shields.io/badge/MCP-v0.5.0-blue.svg?style=flat-square">
  <img src="https://img.shields.io/badge/Claude-Desktop-purple.svg?style=flat-square">
</p>

## ✨ Features

- 📚 Complete Shineout component API documentation
- 🔍 Intelligent component search and filtering
- 💡 Rich usage examples and best practices  
- 🎯 AI-optimized documentation format
- 🔄 Seamless integration with Claude Desktop
- 🚀 Real-time component data generation

## 🛠️ Requirements

```
node >= 16.0.0
Claude Desktop
```

## 📦 Installation

```bash
npm install -g @sheinx/shineout-mcp
```

```bash
yarn global add @sheinx/shineout-mcp
```

```bash
pnpm add -g @sheinx/shineout-mcp
```

## 🔨 Quick Start

### 1. Configure Claude Desktop

Add the MCP server configuration to Claude Desktop's config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shineout": {
      "command": "npx",
      "args": ["@sheinx/shineout-mcp"],
      "env": {}
    }
  }
}
```

### 2. Restart Claude Desktop

After configuration, restart Claude Desktop to enable the Shineout documentation features.

### 3. Start Using

Ask Claude about Shineout components:

- "Show me the Button component documentation"
- "Search for form-related components"
- "List all form components"
- "What props does the Input component have?"
- "Give me a Form usage example"

## 🔧 Available Tools

### `get_component`
Get detailed documentation and API information for a specific component.

### `search_components`
Search for components or features.

### `list_components`
List all available components, with optional category filtering.

### `get_examples`
Get usage examples for components.

### `get_component_api`
Get detailed API information for a component.

## 📖 Usage Examples

```typescript
// In Claude Desktop conversation:

// Get component documentation
"Get the documentation for Button component"

// Search components
"Search for components related to forms"

// List components by category
"List all display components"

// Get component examples
"Show me examples of using the Table component"

// Get component API
"What are the props for Select component?"
```

## 🏗️ Development

### Local Development

```bash
# Clone repository
git clone https://github.com/sheinsight/shineout-next.git
cd packages/shineout-mcp

# Install dependencies
pnpm install

# Generate component data
npm run generate

# Build project
npm run build

# Test locally
npm run test
```

### Project Structure

```
packages/shineout-mcp/
├── bin/                    # Executable files
│   └── shineout-mcp.js    # MCP server entry
├── src/
│   ├── server/            # MCP server implementation
│   ├── tools/             # Tool services
│   ├── data/              # Component data and loaders
│   ├── generators/        # Data generation scripts
│   └── types/             # TypeScript definitions
├── scripts/               # Build and generation scripts
└── dist/                  # Compiled output
```

### Data Generation

The project includes scripts to automatically extract component information from Shineout source code:

```bash
npm run generate
```

This will:
- Parse TypeScript type definitions
- Extract component Props and events
- Generate usage examples
- Create search indexes
- Build comprehensive documentation

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT](./LICENSE)

## 🔗 Links

- [Shineout Documentation](https://shineout.com)
- [GitHub Repository](https://github.com/sheinsight/shineout-next)
- [NPM Package](https://www.npmjs.com/package/@sheinx/shineout-mcp)
- [MCP Protocol](https://modelcontextprotocol.io)

## 💬 Support

For issues or suggestions, please file an issue on [GitHub Issues](https://github.com/sheinsight/shineout-next/issues).