/// <reference types="jest" />
// Setup globale dei test.
import i18n from '@/core/i18n';

// I test usano sempre l'italiano, indipendentemente dalla lingua della macchina.
void i18n.changeLanguage('it');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
