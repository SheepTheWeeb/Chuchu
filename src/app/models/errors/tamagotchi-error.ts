import { ErrorBase } from './error-base'

type ErrorName = 'CREATE_ERROR' | 'CREATE_EXISTS_ERROR' | 'GET_NOT_FOUND'

export class TamagotchiError extends ErrorBase<ErrorName> {}
