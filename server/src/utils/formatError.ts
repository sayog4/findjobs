import { Result, ValidationError } from 'express-validator'

function formatError(errors: Result<ValidationError>) {
  let errs: any = {}
  errors.array().map((err) => (errs[err.param] = err.msg))
  return errs
}

export { formatError }
