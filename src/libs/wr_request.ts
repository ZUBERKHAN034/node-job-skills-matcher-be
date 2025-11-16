import { Request, ParamsDictionary, Query } from 'express-serve-static-core';
import { Cookies, TokenUser } from '@/types/request/base';

export interface WRRequest<B = null, Q extends Query = null, P extends ParamsDictionary = null> extends Request {
  body: B;
  query: Q;
  params: P;
  cookies: Cookies;
  tokenUser?: TokenUser;
}
