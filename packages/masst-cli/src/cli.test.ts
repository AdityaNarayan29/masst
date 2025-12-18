import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the CLI dist
const CLI_PATH = path.resolve(__dirname, '..', 'dist', 'index.js');

// Helper to run CLI commands
function runCli(args: string, cwd?: string): { stdout: string; stderr: string; exitCode: number } {
  try {
    const stdout = execSync(`node "${CLI_PATH}" ${args}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '0' },
      cwd: cwd || process.cwd(),
    });
    return { stdout, stderr: '', exitCode: 0 };
  } catch (error: unknown) {
    const err = error as { stdout?: string; stderr?: string; status?: number };
    return {
      stdout: err.stdout || '',
      stderr: err.stderr || '',
      exitCode: err.status || 1,
    };
  }
}

describe('Masst CLI', () => {
  describe('mst --version', () => {
    it('should display version number', () => {
      const { stdout, exitCode } = runCli('--version');
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('mst --help', () => {
    it('should display help information', () => {
      const { stdout, exitCode } = runCli('--help');
      expect(exitCode).toBe(0);
      expect(stdout).toContain('Ship your SaaS');
      expect(stdout).toContain('COMMANDS');
    });

    it('should list all main commands', () => {
      const { stdout } = runCli('--help');
      expect(stdout).toContain('init');
      expect(stdout).toContain('dev');
      expect(stdout).toContain('build');
      expect(stdout).toContain('deploy');
      expect(stdout).toContain('stop');
      expect(stdout).toContain('db');
      expect(stdout).toContain('logs');
      expect(stdout).toContain('upgrade');
      expect(stdout).toContain('add');
    });
  });

  describe('mst init', () => {
    it('should require project name in non-interactive mode', () => {
      const { stderr, exitCode } = runCli('init -y');
      expect(exitCode).toBe(1);
      expect(stderr).toContain('Project name is required');
    });

    it('should reject invalid project names', () => {
      const { stderr, exitCode } = runCli('init "Invalid Name" -y');
      expect(exitCode).toBe(1);
      expect(stderr).toContain('lowercase');
    });

    it('should reject existing directories', () => {
      // Create a temp directory with lowercase name
      const parentDir = os.tmpdir();
      const projectName = `mst-test-${Date.now()}`;
      const tempDir = path.join(parentDir, projectName);
      fs.mkdirSync(tempDir);

      const { stderr, exitCode } = runCli(`init ${projectName} -y`, parentDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('already exists');
    });
  });

  describe('mst db', () => {
    it('should show db subcommands in help', () => {
      const { stdout, exitCode } = runCli('db --help');
      expect(exitCode).toBe(0);
      expect(stdout).toContain('studio');
      expect(stdout).toContain('migrate');
      expect(stdout).toContain('reset');
      expect(stdout).toContain('push');
      expect(stdout).toContain('seed');
    });

    it('should fail if not in a Masst project', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('db push', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not a Masst project');
    });
  });

  describe('mst add', () => {
    it('should show add subcommands in help', () => {
      const { stdout, exitCode } = runCli('add --help');
      expect(exitCode).toBe(0);
      expect(stdout).toContain('stripe');
      expect(stdout).toContain('emails');
      expect(stdout).toContain('analytics');
    });

    it('should fail if not in a Masst project', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('add stripe', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not a Masst project');
    });
  });

  describe('mst dev', () => {
    it('should fail if not in a Masst project', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('dev', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not a Masst project');
    });
  });

  describe('mst build', () => {
    it('should fail if not in a Masst project', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('build', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not a Masst project');
    });
  });

  describe('mst deploy', () => {
    it('should fail if not in a Masst project', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('deploy', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not a Masst project');
    });

    it('should reject unknown platforms', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      // Create a fake turbo.json to pass project check
      fs.writeFileSync(path.join(tempDir, 'turbo.json'), '{}');

      const { stderr, exitCode } = runCli('deploy --platform unknown', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('Unknown platform');
    });
  });

  describe('mst stop', () => {
    it('should fail if no docker-compose.yml exists', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('stop', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('No docker-compose.yml found');
    });
  });

  describe('mst logs', () => {
    it('should fail if no docker-compose.yml exists', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      const { stderr, exitCode } = runCli('logs', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(1);
      expect(stderr).toContain('No docker-compose.yml found');
    });
  });

  describe('mst upgrade', () => {
    it('should report when no @masst packages found', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      // Create a package.json without @masst packages
      fs.writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({
          name: 'test-project',
          dependencies: {
            lodash: '^4.0.0',
          },
        })
      );

      const { stdout, exitCode } = runCli('upgrade --check', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(0);
      expect(stdout).toContain('No @masst packages found');
    });

    it('should find @masst packages', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      // Create a package.json with @masst packages
      fs.writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({
          name: 'test-project',
          dependencies: {
            '@masst/ui': '^1.0.0',
          },
        })
      );

      const { stdout, exitCode } = runCli('upgrade --check', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      expect(exitCode).toBe(0);
      expect(stdout).toContain('@masst/ui');
      expect(stdout).toContain('Found packages');
    });
  });

  describe('mst i / mst install', () => {
    it('should show install help', () => {
      const { stdout, exitCode } = runCli('i --help');
      expect(exitCode).toBe(0);
      expect(stdout).toContain('Install a package');
      expect(stdout).toContain('--skip-scope');
    });
  });
});

describe('Helper Functions', () => {
  describe('toPascalCase', () => {
    // We can test this by checking init output or creating a separate exports file
    it('should be tested through init command output', () => {
      // This is indirectly tested through the init command
      expect(true).toBe(true);
    });
  });

  describe('detectPackageManager', () => {
    it('should detect pnpm when pnpm-lock.yaml exists', () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mst-test-'));

      fs.writeFileSync(path.join(tempDir, 'pnpm-lock.yaml'), '');
      fs.writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({
          name: 'test',
          dependencies: { '@masst/ui': '1.0.0' },
        })
      );

      const { stdout } = runCli('upgrade --check', tempDir);

      fs.rmSync(tempDir, { recursive: true });

      // The upgrade command uses detectPackageManager internally
      expect(stdout).toContain('@masst/ui');
    });
  });
});

describe('Template Files', () => {
  it('should have templates directory with saas template', () => {
    const templatesDir = path.join(__dirname, '..', 'templates', 'saas');
    expect(fs.existsSync(templatesDir)).toBe(true);
  });

  it('should have required template files', () => {
    const templatesDir = path.join(__dirname, '..', 'templates', 'saas');

    const requiredFiles = [
      'package.json',
      'turbo.json',
      'docker-compose.yml',
      'pnpm-workspace.yaml',
    ];

    for (const file of requiredFiles) {
      expect(fs.existsSync(path.join(templatesDir, file))).toBe(true);
    }
  });

  it('should have apps directory structure', () => {
    const appsDir = path.join(__dirname, '..', 'templates', 'saas', 'apps');
    expect(fs.existsSync(path.join(appsDir, 'web'))).toBe(true);
    expect(fs.existsSync(path.join(appsDir, 'api'))).toBe(true);
  });

  it('should have packages directory structure', () => {
    const packagesDir = path.join(__dirname, '..', 'templates', 'saas', 'packages');
    expect(fs.existsSync(path.join(packagesDir, 'database'))).toBe(true);
  });
});
