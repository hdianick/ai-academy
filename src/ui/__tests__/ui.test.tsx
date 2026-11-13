import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../Button';
import { DemoBanner } from '../DemoBanner';
import { clampProgress, ProgressBar } from '../ProgressBar';
import { ErrorState } from '../StateView';

describe('ProgressBar', () => {
  it('limita i valori tra 0 e 1', () => {
    expect(clampProgress(-1)).toBe(0);
    expect(clampProgress(0.42)).toBe(0.42);
    expect(clampProgress(3)).toBe(1);
    expect(clampProgress(Number.NaN)).toBe(0);
  });

  it('espone il valore percentuale per l’accessibilità', async () => {
    await render(<ProgressBar progress={0.456} testID="bar" />);
    expect(screen.getByTestId('bar').props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 46,
    });
  });
});

describe('Button', () => {
  it('chiama onPress quando premuto', async () => {
    const onPress = jest.fn();
    await render(<Button label="Inizia" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Inizia' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('non chiama onPress quando disabilitato', async () => {
    const onPress = jest.fn();
    await render(<Button label="Inizia" onPress={onPress} disabled />);
    await fireEvent.press(screen.getByRole('button', { name: 'Inizia' }));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('ErrorState', () => {
  it('mostra il pulsante Riprova e lo collega a onRetry', async () => {
    const onRetry = jest.fn();
    await render(<ErrorState onRetry={onRetry} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Riprova' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe('DemoBanner', () => {
  it('è visibile in modalità demo', async () => {
    await render(<DemoBanner visible />);
    expect(screen.getByTestId('demo-banner')).toBeTruthy();
  });

  it('è nascosto quando non in modalità demo', async () => {
    await render(<DemoBanner visible={false} />);
    expect(screen.queryByTestId('demo-banner')).toBeNull();
  });
});
