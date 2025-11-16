import type { Request } from 'express';
import { expressjwt } from 'express-jwt';
import constants from '@/common/constants';

/**
 * Generate the options for the expressjwt middleware.
 *
 * @return {Function} The expressjwt options.
 */
const expressJwtOptions = () => {
  // NOTE : publicRoutes contains path for public routes means jwt token is not required
  const publicRoutes = [/\/auth\/*/, /\/swagger-docs\/*/, /\/job-matcher\/*/];

  return expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
    requestProperty: constants.BACKEND_PROPS.TOKEN_USER, // Attach the token user to request.tokenUser
    /**
     * Retrieves the token from the given request object.
     *
     * @param {Request} request - The request object containing the cookies.
     * @return {string | null} The token value or null if it does not exist.
     */
    getToken: (request: Request): string | null => {
      return request.cookies[constants.COOKIES.ACCESS_TOKEN] || null;
    },
  }).unless({ path: publicRoutes });
};

export { expressJwtOptions };
