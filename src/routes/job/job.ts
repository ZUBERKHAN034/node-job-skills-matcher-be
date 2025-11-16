import { Router } from 'express';
import JobController from '@/controllers/job';
import constants from '@/common/constants';
import multer from 'multer';

export default class JobRoute {
  private controller = new JobController();
  private route = constants.ROUTES.JOB_MATCHER;
  private upload = multer({ storage: multer.memoryStorage() });

  constructor(private router: Router) {
    this.routes();
  }

  routes() {
    this.router.post(`${this.route}/job-skills`, this.controller.jobSkills.bind(this.controller));
    this.router.post(`${this.route}/parse-resume`, this.upload.single('file'), this.controller.parseResume.bind(this.controller));
    this.router.post(`${this.route}/compare-skills`, this.controller.compareSkills.bind(this.controller));
  }
}
