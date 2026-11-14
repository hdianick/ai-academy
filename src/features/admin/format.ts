import i18n from '@/core/i18n';

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(i18n.language === 'en' ? 'en-GB' : 'it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso.slice(0, 10);
  }
}
