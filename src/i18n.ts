import { I18n, I18nFlavor } from '@grammyjs/i18n'
import { Context } from 'grammy'

export type I18nContext = Context & I18nFlavor;

export const i18n = new I18n<I18nContext>({
  defaultLocale: 'en',
  directory: 'src/locales',
})