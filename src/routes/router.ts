import { Router } from 'express';
import SwaggerDocsRoute from '@/routes/swagger/swagger';
import JobRoute from '@/routes/job/job';

export default class AppRouter {
  public router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    new SwaggerDocsRoute(this.router);
    new JobRoute(this.router);
  }
}
