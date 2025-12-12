# @masst/cli

CLI tool for Masst UI projects.

## Installation

```bash
npm install -g @masst/cli
# or
pnpm add -g @masst/cli
```

## Usage

### Initialize a Project

```bash
mst init
```

Sets up Masst UI in your project with the necessary configuration.

### Install Packages

```bash
mst i <package-name>
```

Installs packages using your project's detected package manager (pnpm, yarn, or npm).

## Commands

| Command | Description |
|---------|-------------|
| `mst init` | Initialize Masst UI in your project |
| `mst i <pkg>` | Install a package using detected package manager |
| `mst --help` | Show help information |
| `mst --version` | Show version |

## Development

```bash
# Build the CLI
pnpm build

# Run locally
pnpm start
```

## Tech Stack

- **CLI Framework**: Commander.js
- **Terminal Styling**: Chalk
- **TypeScript**: Full type support
