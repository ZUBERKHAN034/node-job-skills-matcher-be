import { Router } from 'express';
import { apiDocumentationConfig } from '@/routes/swagger/config';
import swaggerUi from 'swagger-ui-express';

export default class SwaggerDocsRoute {
  constructor(private router: Router) {
    this.routes();
  }

  routes() {
    this.router.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentationConfig));
  }
}
