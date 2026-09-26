import { describe, expect, it } from 'vitest';
import { translate } from './i18n';

describe('editor language', () => {
  it('uses German for German locales and English otherwise', () => {
    expect(translate('de-DE', 'Entities')).toBe('Entitäten');
    expect(translate('en-US', 'Entities')).toBe('Entities');
    expect(translate(undefined, 'Entities')).toBe('Entities');
  });
});
