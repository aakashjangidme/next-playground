import { AppError } from './app-error';

export type WarningCode = 'debug-enabled' | 'csrf-disabled';

/**
 * Logger interface for custom logger functionality
 */
export interface Logger {
  warn: (code: WarningCode) => void;
  error: (error: Error) => void;
  debug: (message: string, metadata?: unknown) => void;
}

const red = '\x1b[31m';
const yellow = '\x1b[33m';
const grey = '\x1b[90m';
const reset = '\x1b[0m';

const logger: Logger = {
  /**
   * Logs error messages to the console with stack trace and additional error information.
   */
  error(error) {
    const name = error instanceof AppError ? error.name : error.name;
    console.error(`${red}[app][error]${reset} ${name}: ${error.message}`);
    if (
      error.cause &&
      typeof error.cause === 'object' &&
      'err' in error.cause &&
      error.cause.err instanceof Error
    ) {
      const { err, ...data } = error.cause;
      console.error(`${red}[app][cause]${reset}:`, err.stack);
      if (data)
        console.error(
          `${red}[app][details]${reset}:`,
          JSON.stringify(data, null, 2)
        );
    } else if (error.stack) {
      console.error(error.stack.replace(/.*/, '').substring(1));
    }
  },

  /**
   * Logs warning messages to the console with a link to more information.
   */
  warn(code) {
    const url = `https://warnings.authjs.dev#${code}`;
    console.warn(`${yellow}[app][warn][${code}]${reset}`, `Read more: ${url}`);
  },

  /**
   * Logs debug messages to the console along with optional metadata.
   */
  debug(message, metadata) {
    console.log(
      `${grey}[app][debug]:${reset} ${message}`,
      metadata ? JSON.stringify(metadata, null, 2) : ''
    );
  },
};

export default logger;
