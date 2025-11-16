import cors from 'cors';

/**
 * Generates the CORS options for the API.
 *
 * @return {Function} The CORS options function.
 */
const corsOptions = () => {
  return cors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'], // Allowed methods
    optionsSuccessStatus: 200, // Setting the response status code
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'device-remember-token',
      'Access-Control-Allow-Origin',
      'Origin',
      'Accept',
      'X-XSRF-TOKEN',
    ], // Allowed headers
    async origin(origin, callback) {
      if (!origin) return callback(null, true); // Allowing the call if no origin found
      const whitelist = process.env.CORS_ORIGIN_URL?.split(',') || [];
      if (whitelist.indexOf(origin) === -1) {
        return callback(new Error('Not allowed by CORS')); // Blocking the call if origin not matched
      }
      return callback(null, true);
    },
  });
};

export { corsOptions };
