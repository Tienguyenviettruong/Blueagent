# blue9 v2.0

**Multi-Agent Orchestration Platform with Humanlike Debate & Collaborative Intelligence**

## Overview

blue9 is a Tauri desktop application that orchestrates multiple AI agents to work together on complex tasks. Agents can form teams, engage in structured debates, share knowledge through semantic graphs, and follow visual workflows.

## Features

- **Agent System**: Create and manage specialized AI agents with different roles and personality traits
- **Team Collaboration**: Form teams of agents with shared goals and governance rules
- **Debate Protocol**: Structured debate system with opening arguments, evidence, rebuttals, and consensus
- **Knowledge Brains**: Semantic knowledge graph system with Obsidian sync capabilities
- **Memory Management**: Three-tier memory system (working, short-term, long-term)
- **Provider Agnostic**: Works with OpenAI, Anthropic, Gemini, Ollama, and custom providers
- **MCP Tools**: Extensible tool system for agents to interact with external services
- **iFlow Workflows**: Visual DAG workflow builder for orchestrating complex processes

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Tailwind CSS
- **Backend**: Rust (Tauri) + SQLite
- **Data Persistence**: SQLite + optional Obsidian sync
- **State Management**: Pinia
- **Icons**: Lucide Vue

## Getting Started

### Prerequisites

- Node.js v18+
- Rust 1.70+
- Tauri CLI v1.5+

### Installation

```bash
# Install dependencies
npm install

# Development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## Project Structure

```
/workspace
├── src/                 # Frontend Vue app
│   ├── components/      # Vue components
│   ├── views/           # Page components
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript types
│   ├── router/          # Vue Router
│   ├── App.vue          # Root component
│   ├── main.ts          # App entry
│   └── style.css        # Global styles
├── src-tauri/           # Rust backend
│   ├── main.rs          # App entry
│   ├── Cargo.toml       # Rust dependencies
│   ├── build.rs         # Build script
│   └── tauri.conf.json  # Tauri config
├── package.json         # npm dependencies
├── Cargo.toml           # Rust workspace
├── vite.config.ts       # Vite config
├── tailwind.config.js   # Tailwind config
├── tsconfig.json        # TypeScript config
└── README.md
```

## Documentation

- [SPEC.md](./SPEC.md) - Detailed technical specification
- [Architecture](./SPEC.md#2-system-architecture) - System architecture overview
- [API Reference](./SPEC.md#5-knowledge-management-system-brains) - API documentation

## License

MIT License
