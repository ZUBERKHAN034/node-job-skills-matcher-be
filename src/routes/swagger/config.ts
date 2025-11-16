import constants from '@/common/constants';
import apisPath from '@/routes/swagger/apis';

const apiDocumentationConfig = {
  openapi: '3.0.1',
  info: {
    version: '2.0.0',
    title: 'Job Skills Matcher API Documentation',
    description:
      'APIs to manage users in the system. For any questions, please contact support.',
    termsOfService: 'example.com/terms/',
    contact: {
      name: 'Support Team',
      email: 'support@example.com',
      url: 'http://example.com/contact',
    },
  },
  servers: [
    {
      url: process.env.DEV_URL,
      description: 'Development Server',
    },
    {
      url: process.env.PROD_URL, // replace it with deployed server URL
      description: 'Production Server',
    },
  ],
  paths: apisPath,

  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: constants.COOKIES.ACCESS_TOKEN,
        description: 'Description of your custom cookie.',
      },
    },
  },
};

export { apiDocumentationConfig };
