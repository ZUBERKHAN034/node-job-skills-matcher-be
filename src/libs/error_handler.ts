import constants from '@/common/constants';
import { RespError } from '@/libs/wr_response';

export async function handleError<E extends Error>(error: E): Promise<RespError> {
  if (error instanceof RespError) return new RespError(error.code, error.message);
  else return new RespError(constants.RESP_ERR.CODE_500, error.message);
}
