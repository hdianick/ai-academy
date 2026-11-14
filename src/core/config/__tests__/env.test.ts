import { resolveConfig } from '../env';

describe('resolveConfig', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

  afterEach(() => warn.mockClear());

  it('usa la modalità demo senza variabili Supabase', () => {
    expect(resolveConfig({})).toEqual({ mode: 'demo', supabase: null });
    expect(warn).not.toHaveBeenCalled();
  });

  it('usa Supabase quando URL e anon key sono validi', () => {
    const config = resolveConfig({
      EXPO_PUBLIC_SUPABASE_URL: ' https://abc.supabase.co ',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: 'public-anon-key',
    });
    expect(config).toEqual({
      mode: 'supabase',
      supabase: { url: 'https://abc.supabase.co', anonKey: 'public-anon-key' },
    });
  });

  it('torna alla modalità demo se la configurazione è incompleta', () => {
    const config = resolveConfig({ EXPO_PUBLIC_SUPABASE_URL: 'https://abc.supabase.co' });
    expect(config.mode).toBe('demo');
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('accetta anche il nuovo nome “publishable key”', () => {
    const config = resolveConfig({
      EXPO_PUBLIC_SUPABASE_URL: 'https://abc.supabase.co',
      EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_x',
    });
    expect(config.supabase?.anonKey).toBe('sb_publishable_x');
  });

  it('rifiuta URL non https', () => {
    const config = resolveConfig({
      EXPO_PUBLIC_SUPABASE_URL: 'http://abc.supabase.co',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: 'key',
    });
    expect(config.mode).toBe('demo');
  });
});
