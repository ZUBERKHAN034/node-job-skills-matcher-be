import type { IJobSkills, ICompareSkills, IResumeUpload } from '@/types/request/job';
import type { Response } from 'express';
import type { WRRequest } from '@/libs/wr_request';
import { RespError, WRResponse } from '@/libs/wr_response';
import JobValidation from '@/validations/job/job';
import JobService from '@/services/job';

export default class JobController {
  private validation = new JobValidation();
  private service = new JobService();
  private resp = new WRResponse();

  public async jobSkills(request: WRRequest<IJobSkills, null, null>, response: Response) {
    const params = request.body;
    const valSchema = this.validation.getJobSkillsVS();
    const result = valSchema.validate(params);
    if (result.error == null) {
      const resp = await this.service.jobSkills(params);
      this.resp.resp(response).send(resp);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error.message));
    }
  }

  public async parseResume(request: WRRequest<IResumeUpload, null, null>, response: Response) {
    const params = { file: request?.file };
    const resp = await this.service.parseResume(params);
    this.resp.resp(response).send(resp);
  }

    public async compareSkills(request: WRRequest<ICompareSkills, null, null>, response: Response) {
    const params = request.body;
    const valSchema = this.validation.getCompareSkillsVS();
    const result = valSchema.validate(params);
    if (result.error == null) {
      const resp = await this.service.compareSkills(params);
      this.resp.resp(response).send(resp);
    } else {
      this.resp.resp(response).error(RespError.validation(result.error.message));
    }
  }
}
