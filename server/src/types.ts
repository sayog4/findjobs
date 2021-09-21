import { Request } from 'express'
import * as core from 'express-serve-static-core'

export interface Query extends core.Query {}

export interface Params extends core.ParamsDictionary {}

export interface CustomRequest<
  ReqBody = any,
  ReqQuery = Query,
  URLParams extends Params = core.ParamsDictionary
> extends Request<URLParams, any, ReqBody, ReqQuery> {}
