import { join } from 'node:path';
import { mergeIntoJsonFile } from '../lib/mergeJson.js';

// Ponytail is a Claude Code plugin. CC reads `extraKnownMarketplaces` +
// `enabledPlugins` from project .claude/settings.json on launch, so we wire it
// declaratively (no live session needed). Format verified against a real
// ~/.claude/settings.json.
export const meta = {
  key: 'ponytail',
  label: 'Ponytail',
  kind: 'feature',
};

export async function run({ cwd }) {
  const settingsPath = join(cwd, '.claude', 'settings.json');
  mergeIntoJsonFile(settingsPath, {
    extraKnownMarketplaces: {
      ponytail: {
        source: { source: 'github', repo: 'DietrichGebert/ponytail' },
      },
    },
    enabledPlugins: {
      'ponytail@ponytail': true,
    },
  });
}
