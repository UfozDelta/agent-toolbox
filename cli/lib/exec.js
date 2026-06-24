import { spawn } from 'node:child_process';

// Run a command, streaming its stdout/stderr straight to our terminal so the
// underlying installers (caveman, react-doctor, graphify, npm) show their own
// progress. Resolves with { code } — never rejects on a non-zero exit; callers
// decide what a tool-level failure means. Rejects only when the binary itself
// can't be spawned (ENOENT etc.), which the runtime pre-flight should prevent.
export function run(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      // npx/headroom/graphify are .cmd shims on Windows -> shell needed.
      shell: process.platform === 'win32',
      ...opts,
    });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code: code ?? 1 }));
  });
}

// Convenience: throw if the command exits non-zero. Used where a failure should
// surface in the final summary as ✗.
export async function runOrThrow(cmd, args = [], opts = {}) {
  const { code } = await run(cmd, args, opts);
  if (code !== 0) {
    throw new Error(`\`${cmd} ${args.join(' ')}\` exited with code ${code}`);
  }
}
