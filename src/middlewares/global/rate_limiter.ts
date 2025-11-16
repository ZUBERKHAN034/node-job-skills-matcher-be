import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Generates a rate limiter middleware function.
 *
 * @return {RateLimitRequestHandler} A rate limiter middleware function that limits each IP to 300 requests per minute and returns a 'Too many requests' message when the limit is exceeded.
 */
const rateLimiter = (): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 300, // limit each IP to 300 requests per windowMs
    message: 'Too many requests',
  });
};

export { rateLimiter };
