/**
 * Aggiornamento automatico della versione web.
 * A ogni pubblicazione il sito contiene `version.json` con l'identificativo della build;
 * l'app lo confronta con la propria versione e, se è cambiata, si aggiorna.
 */

/** Versione di questa build (impostata dalla pubblicazione automatica; vuota in sviluppo). */
export const currentVersion: string = process.env.EXPO_PUBLIC_APP_VERSION ?? '';

/** Ogni quanto ricontrollare mentre l'app resta aperta. */
export const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function isNewVersion(current: string, remote: unknown): boolean {
  if (!current || typeof remote !== 'string' || !remote.trim()) return false;
  return remote.trim() !== current;
}

/** Schermate in cui non ricarichiamo da soli, per non interrompere un esercizio in corso. */
const busyRoutes = [
  '/lesson/',
  '/quiz/',
  '/practice/',
  '/challenge/',
  '/tutor',
  '/admin/notifications',
];

export function isSafeToReload(pathname: string): boolean {
  return !busyRoutes.some((route) => pathname.includes(route));
}

export function versionUrl(origin: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, '');
  return `${origin}${base}/version.json`;
}

/**
 * Evita ricaricamenti a ripetizione: per ogni nuova versione si tenta il ricaricamento
 * automatico una sola volta (se il browser serve ancora la copia vecchia, si mostra l'avviso).
 */
export function shouldAutoReload(remoteVersion: string, alreadyTried: string | null): boolean {
  return alreadyTried !== remoteVersion;
}
