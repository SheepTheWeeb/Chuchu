import { ErrorBase } from './error-base'

type ErrorName = 'CREATE_ERROR' | 'CREATE_EXISTS_ERROR'

export class TamagotchiError extends ErrorBase<ErrorName> {}
