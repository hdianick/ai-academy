import '@/core/i18n';

import { render, screen } from '@testing-library/react-native';

import AdminScreen from '@/app/admin/index';
import AdminCategoriesScreen from '@/app/admin/categories';
import AdminCoursesScreen from '@/app/admin/courses';
import AdminQuizzesScreen from '@/app/admin/quizzes';
import AdminRolesScreen from '@/app/admin/roles';
import AdminToolsScreen from '@/app/admin/tools';
import AdminUsersScreen from '@/app/admin/users';
import { useAuthStore } from '@/features/auth/store';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn(), canGoBack: () => false },
  useLocalSearchParams: () => ({}),
}));

function signInAs(role: 'user' | 'editor' | 'admin') {
  useAuthStore.setState({
    status: 'demo',
    email: null,
    profile: { id: 'me', displayName: 'Test', role, plan: 'pro' },
  });
}

describe('admin screens', () => {
  it('blocks non-staff users', async () => {
    signInAs('user');
    await render(<AdminScreen />);
    expect(screen.getByTestId('admin-denied')).toBeTruthy();
  });

  it('shows every section to staff', async () => {
    signInAs('editor');
    await render(<AdminScreen />);
    for (const key of [
      'stats',
      'users',
      'subscriptions',
      'notifications',
      'courses',
      'quizzes',
      'categories',
      'tools',
      'roles',
    ]) {
      expect(screen.getByTestId(`admin-${key}`)).toBeTruthy();
    }
  });

  it('renders the content sections without the database', async () => {
    signInAs('admin');
    for (const Screen of [
      AdminCoursesScreen,
      AdminQuizzesScreen,
      AdminCategoriesScreen,
      AdminToolsScreen,
      AdminRolesScreen,
    ]) {
      const { unmount } = await render(<Screen />);
      await unmount();
    }
  });

  it('asks for real accounts in database sections', async () => {
    signInAs('admin');
    await render(<AdminUsersScreen />);
    expect(JSON.stringify(screen.toJSON())).toContain('database');
  });
});
