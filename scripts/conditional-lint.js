#!/usr/bin/env node
(async () => {
  try {
    // Try to load a dependency to determine if ESLint is installed
    await import('@eslint/js');
  } catch (err) {
    console.log('Skipping lint: ESLint dependencies not installed.');
    process.exit(0);
  }
  const { spawn } = await import('node:child_process');
  const lint = spawn('eslint', ['.'], { stdio: 'inherit', shell: true });
  lint.on('exit', code => process.exit(code));
})();
