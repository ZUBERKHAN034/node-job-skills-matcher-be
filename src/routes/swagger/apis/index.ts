import { jobSkillsSwaggerUI, parseResumeSwaggerUI, compareSkillsSwaggerUI } from '@/routes/swagger/apis/job';

const apisPath = {
  // ENDPOINTS FOR JOB MATCHER
  '/job-matcher/job-skills': {
    post: jobSkillsSwaggerUI,
  },
  '/job-matcher/parse-resume': {
    post: parseResumeSwaggerUI,
  },
  '/job-matcher/compare-skills': {
    post: compareSkillsSwaggerUI,
  },
};

export default apisPath;