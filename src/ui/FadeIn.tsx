import { useEffect, useState, type ReactNode } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  /** Effetto "pop" (scala) oltre alla dissolvenza. */
  pop?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Entrata animata leggera (dissolvenza + spostamento). Rispetta "riduci movimento". */
export function FadeIn({ children, delay = 0, pop = false, style }: FadeInProps) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    let cancelled = false;
    const useNativeDriver = Platform.OS !== 'web';
    void AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        if (cancelled) return;
        if (reduce) {
          progress.setValue(1);
          return;
        }
        Animated.timing(progress, {
          toValue: 1,
          duration: pop ? 420 : 320,
          delay,
          easing: pop ? Easing.out(Easing.back(1.8)) : Easing.out(Easing.cubic),
          useNativeDriver,
        }).start();
      });
    return () => {
      cancelled = true;
    };
  }, [delay, pop, progress]);

  const transform = pop
    ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }]
    : [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }];

  return (
    <Animated.View style={[style, { opacity: progress, transform }]}>{children}</Animated.View>
  );
}
