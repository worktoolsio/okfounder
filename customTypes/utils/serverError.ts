import { EHTTPErrorCode } from '@constants/httpCodes';

export interface IServerError {
  error: {
    code: EHTTPErrorCode;
    message: string;
  };
}
