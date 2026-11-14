import { useCallback, useEffect, useState } from 'react';

export type AsyncState<T> =
  { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: T };

/** Carica dati asincroni con stato di caricamento/errore e possibilità di ricaricare. */
export function useAsyncData<T>(loader: () => Promise<T>, enabled = true) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    loader().then(
      (data) => !cancelled && setState({ status: 'ready', data }),
      () => !cancelled && setState({ status: 'error' }),
    );
    return () => {
      cancelled = true;
    };
    // Il loader è stabile per ciascuna schermata: si ricarica solo con reload().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, version]);

  const reload = useCallback(() => {
    setState({ status: 'loading' });
    setVersion((v) => v + 1);
  }, []);

  return { state, reload };
}
