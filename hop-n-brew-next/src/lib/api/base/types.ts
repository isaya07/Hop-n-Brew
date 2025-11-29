export interface IApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}