// dev environments imports
import 'module-alias/register';
import dotenv from 'dotenv';
import appFunctions from '@/libs/appFunctions';
import constants from '@/common/constants';

// check if NODE_ENV is 'local' or 'nodemon-local' --> DEVELOPMENT SERVER ONLY
const envs: string[] = [constants.NODE_ENV.LOCAL, constants.NODE_ENV.NODEMON_LOCAL];
const isDev = envs.includes(process.env.NODE_ENV?.trim());
if (isDev) {
  const isNodemonLocal = process.env.NODE_ENV === constants.NODE_ENV.NODEMON_LOCAL;
  const path = `${__dirname}/${isNodemonLocal ? '../' : '../../'}.env`;
  dotenv.config({ path });
  appFunctions.loadEnvTypes();
}

// application imports
import express, { Application } from 'express';
import AppRouter from '@/routes/router';

// global middlewares imports
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@/middlewares/global/cors';
import { rateLimiter } from '@/middlewares/global/rate_limiter';
import { helmetOptions } from '@/middlewares/global/helmet';
import { expressJwtOptions } from '@/middlewares/global/express_jwt';

export class ApiServer {
  private app: Application;
  private PORT: number | string;

  constructor() {
    this.PORT = process.env.PORT || 8002;
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(corsOptions()); // CORS Configuration
    this.app.use(helmetOptions()); // Security headers
    this.app.use(compression()); // Compress responses
    this.app.use(express.static('public')); // Serve static files
    this.app.use(rateLimiter()); // Rate limiting
    this.app.use(cookieParser()); // Parse cookies
    this.app.use(hpp()); // Protect against HTTP Parameter Pollution
    this.app.use(express.json({ limit: '1mb' })); // Parse JSON data
    this.app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
    this.app.use(expressJwtOptions()); // JWT authentication/authorization
  }

  private routes() {
    const appRouter = new AppRouter();
    this.app.use(constants.ROUTES.API_BASE_ROUTE, appRouter.router);
  }

  public start() {
    this.app.listen(this.PORT, () => {
      // eslint-disable-next-line no-console
      console.debug(`API server started at http://localhost:${this.PORT} ⚡`);
      console.debug(`Swagger UI available at http://localhost:${this.PORT}/api/swagger-docs ⚡`);
    });
  }
}

const apiServer = new ApiServer();
apiServer.start();
