import de from './languages/de';

const languages: Record<string, Record<string, string>> = { de };

export function translate(language: string | undefined, text: string): string {
  const languageKey = language?.toLowerCase().split(/[-_]/)[0];
  return languages[languageKey ?? '']?.[text] ?? text;
}
