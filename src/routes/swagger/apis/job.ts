export const security = [
  {
    cookieAuth: [],
  },
];


export const jobSkillsSwaggerUI = {
  tags: ['Job'],
  description: 'API to get job skills by job title',
  operationId: 'jobSkillsSwaggerUI',
  requestBody: {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            jobTitle: {
              type: 'string',
              example: 'Frontend Developer',
            },
          },
          required: ['jobTitle'], // Specify required properties here
        },
      },
    },
    required: true, // Specify required request body here
  },
  responses: {
    '200': {
      description: 'Returns list of skills for the given job title',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
                data: {
                  type: 'array',
                  items: { type: 'string' },
                    example: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
                },
            },
          },
        },
      },
    },
    '400': {
      description: 'Validation errors',
    },
    '404': {
      description: 'Job not found',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

export const parseResumeSwaggerUI = {
  tags: ['Job'],
  description: 'API to parse resume and extract skills',
  operationId: 'parseResumeSwaggerUI',
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'file',
              example: 'resume.pdf',
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Returns list of skills extracted from the resume',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
                data: {
                  type: 'array',
                  items: { type: 'string' },
                    example: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
                },
            },
          },
        },
      },
    },
    '404': {
      description: 'File not found.',
    },
    '500': {
      description: 'Internal server error',
    },
  },
};

export const compareSkillsSwaggerUI = {
  tags: ['Job'],
  description: 'API to compare job skills and resume skills',
  operationId: 'compareSkillsSwaggerUI',

  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['jobSkills', 'resumeSkills'],
          properties: {
            jobSkills: {
              type: 'array',
              items: {
                type: 'string',
                example: 'JavaScript'
              },
            },
            resumeSkills: {
              type: 'array',
              items: {
                type: 'string',
                example: 'JavaScript'
              },
            },
          },
        },
      },
    },
  },

  responses: {
    '200': {
      description: 'Returns comparison of job skills and resume skills',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              jobSkills: {
                type: 'array',
                items: { 
                    type: 'string',
                    example: 'JavaScript'
                },
              },
              resumeSkills: {
                type: 'array',
                items: { 
                    type: 'string',
                    example: 'JavaScript'
                },
              },
              matchPercentage: {
                type: 'integer',
                example: 85,
              },
              matchedSkills: {
                type: 'array',
                items: { 
                    type: 'string',
                    example: 'JavaScript'
                },
              },
              missingSkills: {
                type: 'array',
                items: { 
                    type: 'string',
                    example: 'React'
                },
              },
              totalJobSkills: {
                type: 'integer',
                example: 10,
              },
              totalResumeSkills: {
                type: 'integer',
                example: 8,
              },
            },
          },
        },
      },
    },

    '400': {
      description: 'Validation error',
    },

    '500': {
      description: 'Internal server error',
    },
  },
};