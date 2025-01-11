import { ErrorBase } from './error-base';

type ErrorName = 'UNKNOWN';

export class AppError extends ErrorBase<ErrorName> {}
