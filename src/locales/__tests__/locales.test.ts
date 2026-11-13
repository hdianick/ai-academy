import { en } from '../en';
import { it as itLocale } from '../it';

function collectKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [path] : collectKeys(value as object, path);
  });
}

function collectStrings(obj: object): string[] {
  return Object.values(obj).flatMap((value) =>
    typeof value === 'string' ? [value] : collectStrings(value as object),
  );
}

describe('traduzioni', () => {
  it('italiano e inglese hanno esattamente le stesse chiavi', () => {
    expect(collectKeys(en).sort()).toEqual(collectKeys(itLocale).sort());
  });

  it('nessun testo è vuoto', () => {
    for (const value of [...collectStrings(itLocale), ...collectStrings(en)]) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });
});
