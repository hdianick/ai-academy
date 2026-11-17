import { isNewVersion, isSafeToReload, shouldAutoReload, versionUrl } from '../updates';

describe('app updates', () => {
  it('detects a different published version', () => {
    expect(isNewVersion('abc', 'def')).toBe(true);
    expect(isNewVersion('abc', 'abc')).toBe(false);
    expect(isNewVersion('abc', ' abc \n')).toBe(false);
  });

  it('ignores missing data or development builds', () => {
    expect(isNewVersion('', 'def')).toBe(false);
    expect(isNewVersion('abc', undefined)).toBe(false);
    expect(isNewVersion('abc', 42)).toBe(false);
    expect(isNewVersion('abc', '')).toBe(false);
  });

  it('does not interrupt exercises in progress', () => {
    expect(isSafeToReload('/ai-academy/')).toBe(true);
    expect(isSafeToReload('/ai-academy/academy')).toBe(true);
    expect(isSafeToReload('/ai-academy/lesson/chatgpt.m1.l1')).toBe(false);
    expect(isSafeToReload('/ai-academy/quiz/chatgpt.final')).toBe(false);
    expect(isSafeToReload('/ai-academy/tutor')).toBe(false);
  });

  it('builds the version file address', () => {
    expect(versionUrl('https://x.github.io', '/ai-academy')).toBe(
      'https://x.github.io/ai-academy/version.json',
    );
    expect(versionUrl('https://x.app', '')).toBe('https://x.app/version.json');
  });

  it('reloads automatically only once per version', () => {
    expect(shouldAutoReload('v2', null)).toBe(true);
    expect(shouldAutoReload('v2', 'v2')).toBe(false);
    expect(shouldAutoReload('v3', 'v2')).toBe(true);
  });
});
