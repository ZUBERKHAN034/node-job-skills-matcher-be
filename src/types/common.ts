export interface ServiceReturnVal<T = null> {
  error?: Error;
  data?: T;
  filePath?: string;
  mimeType?: string;
}

export interface APIResponse {
  success: boolean;
  details: any;
  headers?: any;
}
export interface RequestParams {
  [key: string]: any;
}
export interface Pagination {
  offset: number;
  limit: number;
}
export interface OrderType {
  orderBy: any;
  order: string;
}

export interface listAll {
  offset: string;
  limit: string;
  search?: string;
  orderBy: string;
  order: string;
}

export interface IdParams {
  id?: string;
}

export interface AuthParams {
  firstName?: string;
  lastName?: string;
  email: string;
  photo?: string;
  type?: string;
}

export interface CosmosDBConfig {
  endpoint: string;
  key: string;
  database: string;
  container: string;
  debug?: boolean;
}
