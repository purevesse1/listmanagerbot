import { I18nCommandContext } from '../i18n'

export function isQuoted(value: string): boolean {
  return /^['"«].+['"»]$/.test(value)
}

export function stripQuotes(value: string): string {
  return value.substring(1, value.length - 1)
}

export function retrieveChatId(ctx: I18nCommandContext): number {
  if (!ctx.chat) {
    throw Error('retrieveChatId requires chat in context')
  }
  return ctx.chat.id
}