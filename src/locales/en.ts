import type { TranslationShape } from './it';

export const en: TranslationShape = {
  app: {
    name: 'AI Academy',
    payoff: 'Learn. Practice. Master.',
  },
  tabs: {
    home: 'Home',
    academy: 'Academy',
    practice: 'Practice',
    tutor: 'Tutor',
    profile: 'Profile',
  },
  home: {
    greeting: 'Hi, {{name}}',
    guestName: 'learner',
    subtitle: 'Ready to learn something new about AI today?',
  },
  academy: {
    title: 'Academy',
    subtitle: 'Courses and learning paths to actually use artificial intelligence.',
  },
  practice: {
    title: 'Practice Lab',
    subtitle: 'Exercises, missions and prompt engineering challenges.',
  },
  tutor: {
    title: 'AI Tutor',
    subtitle: 'Ask questions about concepts and lessons.',
  },
  profile: {
    title: 'Profile',
    subtitle: 'Level, XP, badges and statistics.',
  },
  common: {
    comingSoon: 'Coming soon',
    comingSoonDescription: 'This section will be available in the next development phases.',
    retry: 'Retry',
    loading: 'Loading…',
    errorTitle: 'Something went wrong',
    errorDescription: 'An unexpected error occurred. Please try again in a moment.',
    notFoundTitle: 'Page not found',
    backHome: 'Back to Home',
  },
  demo: {
    banner: 'Demo mode · progress is saved only on this device',
  },
};
