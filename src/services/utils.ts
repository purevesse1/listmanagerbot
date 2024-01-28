export function isQuoted(value: string): boolean {
  return /^['"«].+['"»]$/.test(value)
}

export function stripQuotes(value: string): string {
  return value.substring(1, value.length - 1)
}