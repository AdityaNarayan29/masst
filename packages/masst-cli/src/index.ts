#!/usr/bin/env node
import { Command } from 'commander';
import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as p from '@clack/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🎨 Brand Colors - Vibrant for terminal visibility
const brand = {
  primary: chalk.hex('#818cf8'), // Bright Indigo
  secondary: chalk.hex('#a78bfa'), // Bright Purple
  accent: chalk.hex('#22d3ee'), // Bright Cyan
  success: chalk.hex('#34d399'), // Bright Emerald
  warning: chalk.hex('#fbbf24'), // Bright Amber
  error: chalk.hex('#f87171'), // Bright Red
  muted: chalk.hex('#9ca3af'), // Light Gray
  white: chalk.hex('#f3f4f6'), // Off White
};

// 🎨 ASCII Art Logo - Consistent letter widths
const LOGO = `
${brand.primary('  ███╗   ███╗')}${brand.secondary(' █████╗ ')}${brand.accent('███████╗')}${brand.secondary('███████╗')}${brand.primary('████████╗')}
${brand.primary('  ████╗ ████║')}${brand.secondary('██╔══██╗')}${brand.accent('██╔════╝')}${brand.secondary('██╔════╝')}${brand.primary('╚══██╔══╝')}
${brand.primary('  ██╔████╔██║')}${brand.secondary('███████║')}${brand.accent('███████╗')}${brand.secondary('███████╗')}${brand.primary('   ██║   ')}
${brand.primary('  ██║╚██╔╝██║')}${brand.secondary('██╔══██║')}${brand.accent('╚════██║')}${brand.secondary('╚════██║')}${brand.primary('   ██║   ')}
${brand.primary('  ██║ ╚═╝ ██║')}${brand.secondary('██║  ██║')}${brand.accent('███████║')}${brand.secondary('███████║')}${brand.primary('   ██║   ')}
${brand.primary('  ╚═╝     ╚═╝')}${brand.secondary('╚═╝  ╚═╝')}${brand.accent('╚══════╝')}${brand.secondary('╚══════╝')}${brand.primary('   ╚═╝   ')}
`;

const TAGLINE = brand.muted('  Ship your SaaS in days, not months');

// Version badge
const VERSION = '0.0.2';
const versionBadge = `${brand.muted('v')}${brand.accent(VERSION)}`;

const program = new Command();

function detectPackageManager(): 'pnpm' | 'yarn' | 'npm' {
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json')) return 'npm';
  return 'pnpm'; // fallback default
}

function getTemplatesDir(): string {
  // In development, templates are in ../templates relative to src
  // In production (dist), templates are in ../templates relative to dist
  const devPath = path.join(__dirname, '..', 'templates');
  const prodPath = path.join(__dirname, '..', 'templates');

  if (fs.existsSync(devPath)) return devPath;
  if (fs.existsSync(prodPath)) return prodPath;

  throw new Error('Templates directory not found');
}

function copyDir(src: string, dest: string, replacements: Record<string, string> = {}): void {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    // Handle special file names (e.g., _gitignore -> .gitignore)
    if (destName.startsWith('_')) {
      destName = '.' + destName.slice(1);
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, replacements);
    } else {
      let content = fs.readFileSync(srcPath, 'utf-8');

      // Apply replacements for template variables
      for (const [key, value] of Object.entries(replacements)) {
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }

      fs.writeFileSync(destPath, content);
    }
  }
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

program
  .name('mst')
  .description('Masst CLI - SaaS Starter Kit Generator')
  .version(VERSION, '-v, --version', 'Display version number')
  .configureOutput({
    writeOut: (str) => process.stdout.write(str),
    writeErr: (str) => process.stderr.write(str),
  });

// 🎯 Command: mst init
program
  .command('init')
  .description('Initialize a new Masst SaaS project with Turborepo, Next.js, NestJS, and Prisma')
  .argument('[name]', 'Project name')
  .option('--skip-install', 'Skip installing dependencies')
  .option('--skip-git', 'Skip git initialization')
  .option('--db <name>', 'Database name')
  .option('--no-redis', 'Exclude Redis')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(
    async (
      name?: string,
      options?: {
        skipInstall?: boolean;
        skipGit?: boolean;
        db?: string;
        redis?: boolean;
        yes?: boolean;
      }
    ) => {
      let projectName: string;
      let databaseName: string;
      let includeRedis: boolean;
      let githubRepo: string = '';

      const isInteractive = process.stdout.isTTY && !options?.yes;

      // Non-interactive mode
      if (!isInteractive) {
        if (!name) {
          console.error(chalk.red('❌ Project name is required in non-interactive mode'));
          console.log(chalk.dim('Usage: mst init <project-name> -y'));
          process.exit(1);
        }

        if (!/^[a-z0-9-]+$/.test(name)) {
          console.error(chalk.red('❌ Project name must be lowercase with dashes only'));
          process.exit(1);
        }

        if (fs.existsSync(name)) {
          console.error(chalk.red(`❌ Directory "${name}" already exists`));
          process.exit(1);
        }

        projectName = name;
        databaseName = options?.db || name.replace(/-/g, '_') + '_db';
        includeRedis = options?.redis !== false;

        console.log(LOGO);
        console.log(brand.muted(`  Project:  ${brand.accent(projectName)}`));
        console.log(brand.muted(`  Database: ${brand.accent(databaseName)}`));
        console.log(
          brand.muted(`  Redis:    ${includeRedis ? brand.success('yes') : brand.muted('no')}\n`)
        );
      } else {
        // Interactive mode
        console.clear();

        console.log(LOGO);
        p.intro(brand.primary.bold(' Create your SaaS '));

        const answers = await p.group(
          {
            projectName: () =>
              p.text({
                message: 'Project name',
                placeholder: 'my-saas-app',
                initialValue: name || '',
                validate: (value) => {
                  if (!value) return 'Project name is required';
                  if (!/^[a-z0-9-]+$/.test(value)) {
                    return 'Project name must be lowercase with dashes only';
                  }
                  if (fs.existsSync(value)) {
                    return `Directory "${value}" already exists`;
                  }
                },
              }),
            databaseName: ({ results }) =>
              p.text({
                message: 'Database name',
                placeholder: 'my_saas_db',
                initialValue: results.projectName?.replace(/-/g, '_') + '_db',
              }),
            includeRedis: () =>
              p.confirm({
                message: 'Include Redis for sessions/cache?',
                initialValue: true,
              }),
            githubRepo: () =>
              p.text({
                message: 'GitHub repo URL (optional, for CI/CD)',
                placeholder: 'https://github.com/username/repo',
              }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.');
              process.exit(0);
            },
          }
        );

        projectName = answers.projectName as string;
        databaseName = answers.databaseName as string;
        includeRedis = answers.includeRedis as boolean;
        githubRepo = (answers.githubRepo as string) || '';
      }

      const projectDir = path.resolve(process.cwd(), projectName);
      const templatesDir = getTemplatesDir();
      const saasTemplateDir = path.join(templatesDir, 'saas');

      // Step 1: Copy template files
      if (isInteractive) {
        const s = p.spinner();
        s.start('Creating project structure...');

        try {
          const replacements: Record<string, string> = {
            PROJECT_NAME: projectName,
            PROJECT_NAME_PASCAL: toPascalCase(projectName),
            DATABASE_NAME: databaseName,
            DATABASE_URL: `postgresql://postgres:postgres@localhost:5432/${databaseName}?schema=public`,
            INCLUDE_REDIS: includeRedis ? 'true' : 'false',
            GITHUB_REPO: githubRepo,
            NEXTAUTH_SECRET: Buffer.from(crypto.randomUUID()).toString('base64'),
            JWT_SECRET: Buffer.from(crypto.randomUUID()).toString('base64'),
          };

          copyDir(saasTemplateDir, projectDir, replacements);
          s.stop('Project structure created');
        } catch (error) {
          s.stop('Failed to create project structure');
          p.log.error(String(error));
          process.exit(1);
        }

        // Step 2: Initialize git
        if (!options?.skipGit) {
          s.start('Initializing git repository...');
          try {
            execSync('git init', { cwd: projectDir, stdio: 'pipe' });
            s.stop('Git repository initialized');
          } catch {
            s.stop('Git initialization skipped');
          }
        }

        // Step 3: Install dependencies
        if (!options?.skipInstall) {
          s.start('Installing dependencies (this may take a few minutes)...');
          try {
            execSync('pnpm install', { cwd: projectDir, stdio: 'pipe' });
            s.stop('Dependencies installed');
          } catch {
            s.stop('Failed to install dependencies');
            p.log.warning('Run "pnpm install" manually in the project directory');
          }
        }

        // Final instructions
        p.note(
          `cd ${projectName}
mst dev`,
          'Next steps'
        );

        p.log.info(chalk.dim('Demo credentials: demo@example.com / demo123'));

        p.outro(brand.success('Happy building! ') + '🚀');
      } else {
        // Non-interactive output
        console.log(chalk.cyan('Creating project structure...'));

        try {
          const replacements: Record<string, string> = {
            PROJECT_NAME: projectName,
            PROJECT_NAME_PASCAL: toPascalCase(projectName),
            DATABASE_NAME: databaseName,
            DATABASE_URL: `postgresql://postgres:postgres@localhost:5432/${databaseName}?schema=public`,
            INCLUDE_REDIS: includeRedis ? 'true' : 'false',
            GITHUB_REPO: githubRepo,
            NEXTAUTH_SECRET: Buffer.from(crypto.randomUUID()).toString('base64'),
            JWT_SECRET: Buffer.from(crypto.randomUUID()).toString('base64'),
          };

          copyDir(saasTemplateDir, projectDir, replacements);
          console.log(chalk.green('✅ Project structure created'));
        } catch (error) {
          console.error(chalk.red('❌ Failed to create project structure'));
          console.error(String(error));
          process.exit(1);
        }

        // Step 2: Initialize git
        if (!options?.skipGit) {
          console.log(chalk.cyan('Initializing git repository...'));
          try {
            execSync('git init', { cwd: projectDir, stdio: 'pipe' });
            console.log(chalk.green('✅ Git repository initialized'));
          } catch {
            console.log(chalk.yellow('⚠️ Git initialization skipped'));
          }
        }

        // Step 3: Install dependencies
        if (!options?.skipInstall) {
          console.log(chalk.cyan('Installing dependencies (this may take a few minutes)...'));
          try {
            execSync('pnpm install', { cwd: projectDir, stdio: 'pipe' });
            console.log(chalk.green('✅ Dependencies installed'));
          } catch {
            console.log(chalk.yellow('⚠️ Failed to install dependencies'));
            console.log(chalk.dim('   Run "pnpm install" manually in the project directory'));
          }
        }

        // Final instructions
        console.log(chalk.green('\n✨ Project created successfully!\n'));
        console.log(chalk.bold('Next steps:'));
        console.log(chalk.dim(`  cd ${projectName}`));
        console.log(chalk.dim('  mst dev\n'));
        console.log(chalk.dim('Demo credentials: demo@example.com / demo123\n'));
      }
    }
  );

// 🎯 Command: mst i <pkg>
program
  .command('i <pkg>')
  .alias('install')
  .option('--skip-scope', 'Install package without @masst/ prefix')
  .option('--pm <pm>', 'Manually specify package manager (pnpm, yarn, npm)')
  .description('Install a package using your package manager')
  .action((pkg, options) => {
    const packageName = options.skipScope ? pkg : `@masst/${pkg}`;

    const pm = options.pm?.toLowerCase() || detectPackageManager();

    if (!['pnpm', 'yarn', 'npm'].includes(pm)) {
      console.error(chalk.red(`❌ Invalid package manager "${pm}". Use pnpm, yarn, or npm.`));
      process.exit(1);
    }

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

// 🎯 Command: mst pnpm [args...]
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

// 🎯 Command: mst dev
program
  .command('dev')
  .description('Start the development environment (Docker + DB + Dev servers)')
  .option('--no-docker', 'Skip starting Docker containers (use external database)')
  .option('--seed', 'Force database seeding (even if data exists)')
  .option('--fresh', 'Reset database and seed fresh data')
  .action(async (options: { docker?: boolean; seed?: boolean; fresh?: boolean }) => {
    // Check if we're in a Masst project
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    const hasDocker = fs.existsSync('docker-compose.yml');

    console.log(LOGO);
    console.log(brand.primary.bold('  Starting development environment...\n'));

    // Step 1: Start Docker containers (if available and not skipped)
    if (hasDocker && options.docker !== false) {
      console.log(chalk.dim('Starting Docker containers...'));
      try {
        execSync('docker-compose up -d', { stdio: 'inherit' });
        console.log(chalk.green('✅ Docker containers started\n'));

        // Wait for PostgreSQL to be ready
        console.log(chalk.dim('Waiting for PostgreSQL to be ready...'));
        let retries = 15;
        while (retries > 0) {
          try {
            execSync('docker-compose exec -T postgres pg_isready -U postgres', { stdio: 'pipe' });
            break;
          } catch {
            retries--;
            if (retries === 0) {
              console.log(chalk.yellow('⚠️ PostgreSQL may not be ready yet, continuing anyway...'));
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        if (retries > 0) {
          console.log(chalk.green('✅ PostgreSQL is ready\n'));
        }
      } catch {
        console.error(chalk.red('❌ Failed to start Docker containers'));
        console.log(chalk.dim('   Make sure Docker is running and try again'));
        console.log(
          chalk.dim('   Or use --no-docker to skip Docker and use an external database\n')
        );
        process.exit(1);
      }
    } else if (!hasDocker) {
      console.log(chalk.dim('No docker-compose.yml found, using external database...\n'));
    } else {
      console.log(chalk.dim('Skipping Docker, using external database...\n'));
    }

    // Step 2: Generate Prisma client
    console.log(chalk.dim('Generating Prisma client...'));
    try {
      execSync('pnpm db:generate', { stdio: 'pipe' });
      console.log(chalk.green('✅ Prisma client generated\n'));
    } catch {
      console.error(chalk.red('❌ Failed to generate Prisma client'));
      process.exit(1);
    }

    // Step 3: Fresh reset if requested
    if (options.fresh) {
      console.log(chalk.dim('Resetting database (--fresh)...'));
      try {
        execSync('pnpm db:push --force-reset', { stdio: 'pipe' });
        console.log(chalk.green('✅ Database reset\n'));
      } catch {
        // Try without --force-reset for older Prisma versions
        try {
          execSync('pnpm db:push', { stdio: 'pipe' });
        } catch {
          console.error(chalk.red('❌ Failed to reset database'));
          process.exit(1);
        }
      }
    } else {
      // Push schema (non-destructive)
      console.log(chalk.dim('Syncing database schema...'));
      try {
        execSync('pnpm db:push', { stdio: 'pipe' });
        console.log(chalk.green('✅ Database schema synced\n'));
      } catch {
        console.error(chalk.red('❌ Failed to sync database schema'));
        console.log(chalk.dim('   Check your DATABASE_URL in .env'));
        process.exit(1);
      }
    }

    // Step 4: Smart seeding
    // --fresh or --seed: force seeding
    // Otherwise: seed script auto-detects if DB is empty
    if (options.seed || options.fresh) {
      console.log(chalk.dim('Seeding database (forced)...'));
      try {
        execSync('pnpm db:seed --force', { stdio: 'inherit' });
      } catch {
        console.log(chalk.yellow('⚠️ Seeding encountered an issue\n'));
      }
    } else {
      // Let seed script decide - it seeds only if DB is empty
      console.log(chalk.dim('Checking database...'));
      try {
        const result = execSync('pnpm db:seed', {
          stdio: 'pipe',
          encoding: 'utf-8',
        });

        if (result.includes('already has data')) {
          console.log(chalk.green('✅ Database ready (existing data preserved)\n'));
        } else if (result.includes('Demo credentials')) {
          console.log(chalk.green('✅ Database seeded with demo data\n'));
        } else {
          console.log(chalk.green('✅ Database ready\n'));
        }
      } catch {
        // Seed script might have printed output, that's ok
        console.log(chalk.green('✅ Database ready\n'));
      }
    }

    // Step 5: Start dev servers
    console.log(brand.success('  ✓ Ready!\n'));
    console.log(brand.muted('  ┌──────────────────────────────────────┐'));
    console.log(brand.muted('  │                                      │'));
    console.log(
      brand.muted('  │  ') + brand.accent('Web  ') + brand.muted(' →  http://localhost:3000   │')
    );
    console.log(
      brand.muted('  │  ') + brand.accent('API  ') + brand.muted(' →  http://localhost:4000   │')
    );
    console.log(
      brand.muted('  │  ') +
        brand.accent('Docs ') +
        brand.muted(' →  http://localhost:4000/api/docs │')
    );
    console.log(brand.muted('  │                                      │'));
    console.log(brand.muted('  └──────────────────────────────────────┘\n'));
    console.log(
      brand.muted('  Demo: ') +
        brand.accent('demo@example.com') +
        brand.muted(' / ') +
        brand.accent('demo123\n')
    );

    try {
      execSync('pnpm dev', { stdio: 'inherit' });
    } catch {
      // User likely pressed Ctrl+C
      console.log(chalk.dim('\n👋 Development servers stopped'));
    }
  });

// 🎯 Command: mst build
program
  .command('build')
  .description('Build all applications for production')
  .action(() => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n🔨 Building for production...\n'));

    try {
      execSync('pnpm db:generate', { stdio: 'inherit' });
      execSync('pnpm build', { stdio: 'inherit' });
      console.log(chalk.green('\n✅ Build complete!\n'));
    } catch {
      console.error(chalk.red('\n❌ Build failed'));
      process.exit(1);
    }
  });

// 🎯 Command: mst deploy
program
  .command('deploy')
  .description('Deploy to production (Docker images)')
  .option('--platform <platform>', 'Deployment platform (railway, render, fly)', 'docker')
  .option('--tag <tag>', 'Docker image tag', 'latest')
  .action(async (options: { platform: string; tag: string }) => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    const isInteractive = process.stdout.isTTY;

    if (options.platform === 'docker') {
      console.log(chalk.cyan('\n🐳 Building Docker images...\n'));

      // Get project name from package.json
      let projectName = 'masst-app';
      try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        projectName = pkg.name || projectName;
      } catch {}

      const webImage = `${projectName}-web:${options.tag}`;
      const apiImage = `${projectName}-api:${options.tag}`;

      try {
        console.log(chalk.dim(`Building ${webImage}...`));
        execSync(`docker build -t ${webImage} ./apps/web`, { stdio: 'inherit' });
        console.log(chalk.green(`✅ Built ${webImage}\n`));

        console.log(chalk.dim(`Building ${apiImage}...`));
        execSync(`docker build -t ${apiImage} ./apps/api`, { stdio: 'inherit' });
        console.log(chalk.green(`✅ Built ${apiImage}\n`));

        console.log(chalk.green('✨ Docker images built successfully!\n'));
        console.log(chalk.bold('Next steps:'));
        console.log(chalk.dim(`  docker push ${webImage}`));
        console.log(chalk.dim(`  docker push ${apiImage}\n`));
      } catch {
        console.error(chalk.red('❌ Docker build failed'));
        process.exit(1);
      }
    } else if (options.platform === 'railway') {
      console.log(chalk.cyan('\n🚂 Deploying to Railway...\n'));

      try {
        // Check if Railway CLI is installed
        execSync('railway --version', { stdio: 'pipe' });
      } catch {
        console.error(chalk.red('❌ Railway CLI not found'));
        console.log(chalk.dim('   Install it with: npm install -g @railway/cli'));
        console.log(chalk.dim('   Then run: railway login'));
        process.exit(1);
      }

      try {
        execSync('railway up', { stdio: 'inherit' });
        console.log(chalk.green('\n✅ Deployed to Railway!\n'));
      } catch {
        console.error(chalk.red('❌ Railway deployment failed'));
        process.exit(1);
      }
    } else if (options.platform === 'render') {
      console.log(chalk.cyan('\n🎨 Deploying to Render...\n'));
      console.log(chalk.dim('Render deploys automatically from your GitHub repo.'));
      console.log(chalk.dim('Make sure you have connected your repo at https://render.com\n'));

      if (isInteractive) {
        const confirm = await p.confirm({
          message: 'Open Render dashboard in browser?',
          initialValue: true,
        });

        if (confirm) {
          const open = await import('child_process');
          open.exec('open https://dashboard.render.com');
        }
      }
    } else if (options.platform === 'fly') {
      console.log(chalk.cyan('\n✈️ Deploying to Fly.io...\n'));

      try {
        execSync('fly version', { stdio: 'pipe' });
      } catch {
        console.error(chalk.red('❌ Fly CLI not found'));
        console.log(chalk.dim('   Install it from: https://fly.io/docs/hands-on/install-flyctl/'));
        process.exit(1);
      }

      try {
        execSync('fly deploy', { stdio: 'inherit' });
        console.log(chalk.green('\n✅ Deployed to Fly.io!\n'));
      } catch {
        console.error(chalk.red('❌ Fly deployment failed'));
        process.exit(1);
      }
    } else {
      console.error(chalk.red(`❌ Unknown platform: ${options.platform}`));
      console.log(chalk.dim('   Supported: docker, railway, render, fly'));
      process.exit(1);
    }
  });

// 🎯 Command: mst stop
program
  .command('stop')
  .description('Stop Docker containers')
  .action(() => {
    if (!fs.existsSync('docker-compose.yml')) {
      console.error(chalk.red('❌ No docker-compose.yml found'));
      process.exit(1);
    }

    console.log(chalk.cyan('Stopping Docker containers...'));
    try {
      execSync('docker-compose down', { stdio: 'inherit' });
      console.log(chalk.green('✅ Docker containers stopped'));
    } catch {
      console.error(chalk.red('❌ Failed to stop containers'));
      process.exit(1);
    }
  });

// 🎯 Command: mst db
const dbCommand = program.command('db').description('Database management commands');

dbCommand
  .command('studio')
  .description('Open Prisma Studio to browse your database')
  .action(() => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n🔍 Opening Prisma Studio...\n'));
    console.log(chalk.dim('  Studio will open at http://localhost:5555\n'));

    try {
      execSync('pnpm db:studio', { stdio: 'inherit' });
    } catch {
      // User likely pressed Ctrl+C
      console.log(chalk.dim('\n👋 Prisma Studio closed'));
    }
  });

dbCommand
  .command('migrate')
  .description('Run database migrations')
  .option('--name <name>', 'Migration name')
  .option('--dev', 'Create a development migration (default)')
  .option('--deploy', 'Apply pending migrations (production)')
  .action((options: { name?: string; dev?: boolean; deploy?: boolean }) => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    if (options.deploy) {
      console.log(chalk.cyan('\n🚀 Deploying migrations...\n'));
      try {
        execSync('pnpm --filter @*/database prisma migrate deploy', { stdio: 'inherit' });
        console.log(chalk.green('\n✅ Migrations deployed!\n'));
      } catch {
        console.error(chalk.red('❌ Migration deployment failed'));
        process.exit(1);
      }
    } else {
      const migrationName = options.name || 'migration';
      console.log(chalk.cyan(`\n📝 Creating migration: ${migrationName}...\n`));
      try {
        execSync(`pnpm --filter @*/database prisma migrate dev --name ${migrationName}`, {
          stdio: 'inherit',
        });
        console.log(chalk.green('\n✅ Migration created and applied!\n'));
      } catch {
        console.error(chalk.red('❌ Migration failed'));
        process.exit(1);
      }
    }
  });

dbCommand
  .command('reset')
  .description('Reset the database (drops all data)')
  .option('--force', 'Skip confirmation prompt')
  .action(async (options: { force?: boolean }) => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    const isInteractive = process.stdout.isTTY && !options.force;

    if (isInteractive) {
      const confirm = await p.confirm({
        message: 'This will delete ALL data in your database. Are you sure?',
        initialValue: false,
      });

      if (!confirm) {
        console.log(chalk.dim('Operation cancelled.'));
        process.exit(0);
      }
    }

    console.log(chalk.cyan('\n🗑️ Resetting database...\n'));
    try {
      execSync('pnpm --filter @*/database prisma migrate reset --force', { stdio: 'inherit' });
      console.log(chalk.green('\n✅ Database reset complete!\n'));
    } catch {
      console.error(chalk.red('❌ Database reset failed'));
      process.exit(1);
    }
  });

dbCommand
  .command('push')
  .description('Push schema changes to database (without migrations)')
  .action(() => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n📤 Pushing schema to database...\n'));
    try {
      execSync('pnpm db:push', { stdio: 'inherit' });
      console.log(chalk.green('\n✅ Schema pushed!\n'));
    } catch {
      console.error(chalk.red('❌ Schema push failed'));
      process.exit(1);
    }
  });

dbCommand
  .command('seed')
  .description('Seed the database with demo data')
  .option('--force', 'Force seeding even if data exists')
  .action((options: { force?: boolean }) => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    console.log(chalk.cyan('\n🌱 Seeding database...\n'));
    try {
      const cmd = options.force ? 'pnpm db:seed --force' : 'pnpm db:seed';
      execSync(cmd, { stdio: 'inherit' });
      console.log(chalk.green('\n✅ Database seeded!\n'));
      console.log(chalk.dim('Demo credentials: demo@example.com / demo123\n'));
    } catch {
      console.error(chalk.red('❌ Seeding failed'));
      process.exit(1);
    }
  });

// 🎯 Command: mst logs
program
  .command('logs')
  .description('View Docker container logs')
  .option('-f, --follow', 'Follow log output')
  .option('--service <service>', 'Specific service (postgres, redis, web, api)')
  .option('-n, --tail <lines>', 'Number of lines to show', '100')
  .action((options: { follow?: boolean; service?: string; tail?: string }) => {
    if (!fs.existsSync('docker-compose.yml')) {
      console.error(chalk.red('❌ No docker-compose.yml found'));
      process.exit(1);
    }

    let cmd = 'docker-compose logs';

    if (options.tail) {
      cmd += ` --tail=${options.tail}`;
    }

    if (options.follow) {
      cmd += ' -f';
    }

    if (options.service) {
      cmd += ` ${options.service}`;
    }

    console.log(chalk.cyan('📋 Container logs:\n'));
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch {
      // User likely pressed Ctrl+C
      console.log(chalk.dim('\n'));
    }
  });

// 🎯 Command: mst upgrade
program
  .command('upgrade')
  .description('Upgrade @masst packages to latest versions')
  .option('--check', 'Only check for updates, do not install')
  .action(async (options: { check?: boolean }) => {
    console.log(chalk.cyan('\n🔄 Checking for @masst package updates...\n'));

    const pm = detectPackageManager();

    // Find all @masst packages in package.json files
    const packageJsonPaths = ['package.json'];

    // Check apps and packages directories
    const dirs = ['apps', 'packages'];
    for (const dir of dirs) {
      if (fs.existsSync(dir)) {
        const subdirs = fs.readdirSync(dir, { withFileTypes: true });
        for (const subdir of subdirs) {
          if (subdir.isDirectory()) {
            const pkgPath = path.join(dir, subdir.name, 'package.json');
            if (fs.existsSync(pkgPath)) {
              packageJsonPaths.push(pkgPath);
            }
          }
        }
      }
    }

    const masstPackages = new Set<string>();

    for (const pkgPath of packageJsonPaths) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
        };

        for (const dep of Object.keys(allDeps)) {
          if (dep.startsWith('@masst/')) {
            masstPackages.add(dep);
          }
        }
      } catch {
        // Skip invalid package.json
      }
    }

    if (masstPackages.size === 0) {
      console.log(chalk.yellow('No @masst packages found.\n'));
      return;
    }

    console.log(chalk.dim('Found packages:'));
    for (const pkg of masstPackages) {
      console.log(chalk.dim(`  - ${pkg}`));
    }
    console.log('');

    if (options.check) {
      console.log(chalk.dim('Run without --check to upgrade.\n'));
      return;
    }

    console.log(chalk.cyan('Upgrading packages...\n'));

    const packages = Array.from(masstPackages).join(' ');

    try {
      if (pm === 'pnpm') {
        execSync(`pnpm update ${packages} --latest`, { stdio: 'inherit' });
      } else if (pm === 'yarn') {
        execSync(`yarn upgrade ${packages} --latest`, { stdio: 'inherit' });
      } else {
        execSync(`npm update ${packages}`, { stdio: 'inherit' });
      }
      console.log(chalk.green('\n✅ Packages upgraded!\n'));
    } catch {
      console.error(chalk.red('❌ Upgrade failed'));
      process.exit(1);
    }
  });

// 🎯 Command: mst add
const addCommand = program.command('add').description('Add features to your project');

addCommand
  .command('stripe')
  .description('Add Stripe billing integration')
  .action(async () => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    const isInteractive = process.stdout.isTTY;

    console.log(chalk.cyan('\n💳 Adding Stripe billing...\n'));

    // Install Stripe packages
    console.log(chalk.dim('Installing Stripe packages...'));
    try {
      execSync('pnpm add stripe @stripe/stripe-js --filter ./apps/web', { stdio: 'inherit' });
      execSync('pnpm add stripe --filter ./apps/api', { stdio: 'inherit' });
    } catch {
      console.error(chalk.red('❌ Failed to install Stripe packages'));
      process.exit(1);
    }

    // Create Stripe configuration files
    const stripeEnvVars = `
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_BASIC=price_...
STRIPE_PRICE_ID_PRO=price_...
`;

    console.log(chalk.green('\n✅ Stripe packages installed!\n'));
    console.log(chalk.bold('Next steps:\n'));
    console.log(chalk.dim('1. Add these to your .env file:'));
    console.log(chalk.yellow(stripeEnvVars));
    console.log(chalk.dim('2. Create products and prices in Stripe Dashboard'));
    console.log(chalk.dim('3. Set up webhook endpoint at /api/webhooks/stripe'));
    console.log(chalk.dim('\n📚 Docs: https://stripe.com/docs/billing/subscriptions\n'));

    if (isInteractive) {
      const openDocs = await p.confirm({
        message: 'Open Stripe Dashboard?',
        initialValue: false,
      });

      if (openDocs) {
        execSync('open https://dashboard.stripe.com', { stdio: 'pipe' });
      }
    }
  });

addCommand
  .command('emails')
  .description('Add email templates (Resend)')
  .action(async () => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    const isInteractive = process.stdout.isTTY;

    console.log(chalk.cyan('\n📧 Adding email support with Resend...\n'));

    // Install Resend and React Email
    console.log(chalk.dim('Installing email packages...'));
    try {
      execSync('pnpm add resend @react-email/components react-email --filter ./apps/api', {
        stdio: 'inherit',
      });
    } catch {
      console.error(chalk.red('❌ Failed to install email packages'));
      process.exit(1);
    }

    const emailEnvVars = `
# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com
`;

    console.log(chalk.green('\n✅ Email packages installed!\n'));
    console.log(chalk.bold('Next steps:\n'));
    console.log(chalk.dim('1. Add these to your .env file:'));
    console.log(chalk.yellow(emailEnvVars));
    console.log(chalk.dim('2. Verify your domain in Resend'));
    console.log(chalk.dim('3. Create email templates in apps/api/src/emails/'));
    console.log(chalk.dim('\n📚 Docs: https://resend.com/docs\n'));

    if (isInteractive) {
      const openDocs = await p.confirm({
        message: 'Open Resend Dashboard?',
        initialValue: false,
      });

      if (openDocs) {
        execSync('open https://resend.com/api-keys', { stdio: 'pipe' });
      }
    }
  });

addCommand
  .command('analytics')
  .description('Add analytics (PostHog)')
  .action(async () => {
    if (!fs.existsSync('turbo.json')) {
      console.error(chalk.red('❌ Not a Masst project. Run this command from your project root.'));
      process.exit(1);
    }

    const isInteractive = process.stdout.isTTY;

    console.log(chalk.cyan('\n📊 Adding analytics with PostHog...\n'));

    // Install PostHog
    console.log(chalk.dim('Installing PostHog...'));
    try {
      execSync('pnpm add posthog-js --filter ./apps/web', { stdio: 'inherit' });
    } catch {
      console.error(chalk.red('❌ Failed to install PostHog'));
      process.exit(1);
    }

    const analyticsEnvVars = `
# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
`;

    // Create PostHog provider template
    const posthogProvider = `'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: false, // We capture manually
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
`;

    // Write the provider file
    const providersDir = 'apps/web/components';
    if (fs.existsSync(providersDir)) {
      fs.writeFileSync(path.join(providersDir, 'posthog-provider.tsx'), posthogProvider);
      console.log(chalk.green('✅ Created apps/web/components/posthog-provider.tsx'));
    }

    console.log(chalk.green('\n✅ PostHog installed!\n'));
    console.log(chalk.bold('Next steps:\n'));
    console.log(chalk.dim('1. Add these to your .env file:'));
    console.log(chalk.yellow(analyticsEnvVars));
    console.log(chalk.dim('2. Wrap your app with <PostHogProvider> in layout.tsx'));
    console.log(chalk.dim('3. Track events: posthog.capture("event_name")'));
    console.log(chalk.dim('\n📚 Docs: https://posthog.com/docs/libraries/next-js\n'));

    if (isInteractive) {
      const openDocs = await p.confirm({
        message: 'Open PostHog signup?',
        initialValue: false,
      });

      if (openDocs) {
        execSync('open https://app.posthog.com/signup', { stdio: 'pipe' });
      }
    }
  });

// Custom help formatting
function formatHelp() {
  const dim = brand.muted;
  const cmd = brand.accent;
  const title = brand.primary.bold;

  return `${LOGO}
${TAGLINE}  ${versionBadge}

${title('USAGE')}

  ${dim('$')} ${cmd('mst')} ${dim('<command>')} ${dim('[options]')}

${title('COMMANDS')}

  ${chalk.white.bold('Create & Run')}
  ${cmd('init')} ${dim('[name]')}        Create a new SaaS project
  ${cmd('dev')}                 Start development environment
  ${cmd('build')}               Build for production
  ${cmd('deploy')}              Deploy to production

  ${chalk.white.bold('Database')}
  ${cmd('db studio')}           Open Prisma Studio
  ${cmd('db migrate')}          Run database migrations
  ${cmd('db push')}             Push schema changes
  ${cmd('db reset')}            Reset database
  ${cmd('db seed')}             Seed with demo data

  ${chalk.white.bold('Add Features')}
  ${cmd('add stripe')}          Add Stripe billing
  ${cmd('add emails')}          Add Resend emails
  ${cmd('add analytics')}       Add PostHog analytics

  ${chalk.white.bold('Utilities')}
  ${cmd('logs')} ${dim('[-f]')}          View Docker logs
  ${cmd('stop')}                Stop Docker containers
  ${cmd('upgrade')}             Upgrade @masst packages
  ${cmd('i')} ${dim('<pkg>')}            Install a package

${title('EXAMPLES')}

  ${dim('# Create a new project')}
  ${dim('$')} ${cmd('mst init my-saas-app')}

  ${dim('# Start development')}
  ${dim('$')} ${cmd('mst dev')}

  ${dim('# Deploy to Railway')}
  ${dim('$')} ${cmd('mst deploy --platform railway')}

  ${dim('# Add Stripe billing')}
  ${dim('$')} ${cmd('mst add stripe')}

${title('LINKS')}

  ${brand.accent('Docs')}      ${dim('https://masst.dev/docs')}
  ${brand.accent('GitHub')}    ${dim('https://github.com/masst/masst')}
  ${brand.accent('Discord')}   ${dim('https://discord.gg/masst')}
`;
}

// Override default help
program.helpInformation = formatHelp;

// Show custom help when no command provided
if (process.argv.length === 2) {
  console.log(formatHelp());
  process.exit(0);
}

program.parse(process.argv);
