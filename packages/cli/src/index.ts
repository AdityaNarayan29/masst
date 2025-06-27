#!/usr/bin/env node
import { Command } from 'commander';
import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

const program = new Command();

function detectPackageManager(): 'pnpm' | 'yarn' | 'npm' {
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json')) return 'npm';
  return 'pnpm'; // fallback default
}

program
  .name('mst')
  .description('Masst CLI tool for scaffolding and utilities')
  .version('0.0.1');

// 🎯 Command: mst i ui
program
  .command('i <pkg>')
  .alias('install')
  .option('--skip-scope', 'Install package without @masst/ prefix')
  .option('--pm <pm>', 'Manually specify package manager (pnpm, yarn, npm)')
  .description('Install a package using your package manager')
  .action((pkg, options) => {
    const packageName = options.skipScope ? pkg : `@masst/${pkg}`;

    // Use manual override if provided, else detect automatically
    const pm = options.pm?.toLowerCase() || detectPackageManager();

    // Validate pm input
    if (!['pnpm', 'yarn', 'npm'].includes(pm)) {
      console.error(chalk.red(`❌ Invalid package manager "${pm}". Use pnpm, yarn, or npm.`));
      process.exit(1);
    }

    // Construct the install command
    const installCmd = pm === 'npm' ? `npm install ${packageName}` : `${pm} add ${packageName}`;

    console.log(chalk.cyan(`📦 Installing ${packageName} using ${pm}...`));
    try {
      execSync(installCmd, { stdio: 'inherit' });
      console.log(chalk.green(`✅ Successfully installed ${packageName}`));
    } catch (err) {
      console.error(chalk.red(`❌ Failed to install ${packageName} with ${pm}`));
      process.exit(1);
    }
  });

// 🎯 Command: mst init
program
  .command('init')
  .description('Initialize a new Masst project')
  .action(() => {
    console.log(chalk.magenta('🚀 Initializing Masst project...'));
    // Add scaffold logic here if needed
  });

program
  .command('pnpm [args...]')
  .description('Run arbitrary pnpm commands')
  .allowUnknownOption(true)
  .action((args) => {
    const cmd = ['pnpm', ...args].join(' ');
    console.log(chalk.cyan(`⚙️ Running: ${cmd}`));
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
      console.error(chalk.red('❌ pnpm command failed'));
      process.exit(1);
    }
  });

// Help text
program.addHelpText('beforeAll', `
${chalk.bold.blue('Masst CLI')} - scaffolding and utilities
`);

program.addHelpText('afterAll', `
${chalk.green('Examples:')}
  ${chalk.cyan('$ mst init')}
  ${chalk.cyan('$ mst i ui')}
  ${chalk.cyan('$ mst i bootstrap --skip-scope')}
  ${chalk.cyan('$ mst i lodash --pm npm')}
  ${chalk.cyan('$ mst pnpm install lodash')}

${chalk.yellow('Use "mst help <command>" for detailed info about a command.')}
`);

// Parse args
program.parse(process.argv);
