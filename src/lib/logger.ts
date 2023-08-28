export enum LOG_LEVEL {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const loggerFn = {
  [LOG_LEVEL.ERROR]: console.error,
  [LOG_LEVEL.INFO]: console.log,
  [LOG_LEVEL.WARN]: console.warn,
}

export function log(level: LOG_LEVEL) {
  return (message: string, meta: Record<string, string> = {}) => {
    const metaString = Object.entries(meta)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => `[${key}=${value}]`)
      .join('')

    loggerFn[level](`[${level}]${metaString} ${message}`)
  }
}

export const info = log(LOG_LEVEL.INFO)
export const warn = log(LOG_LEVEL.WARN)
export const error = log(LOG_LEVEL.ERROR)
