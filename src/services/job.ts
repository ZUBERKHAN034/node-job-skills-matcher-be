import type { ServiceReturnVal } from '@/types/common';
import type { IJobSkills, IResumeUpload, ICompareSkills } from '@/types/request/job';
import { RespError, RespVal } from '@/libs/wr_response';
import constants from '@/common/constants';
import utility from '@/libs/utility';
import jobScraper from '@/libs/job_scraper';
import fileParser from '@/libs/file_parser';
import skillsMatcher from '@/libs/skills_matcher';

export default class JobService {

  /**
   * @author Zuber Khan
   * @description service for getting job skills by job title
   * @param  {IJobSkills} params job request details
   * @return {ServiceReturnVal} return the object
   */
  public async jobSkills(params: IJobSkills) {
    const returnVal: ServiceReturnVal = {};
    try {
      const skills = await jobScraper.scrapeJobsByTitle(params.jobTitle);
      if(!utility.isEmpty(skills)) {
         return new RespVal({ data: skills }).send();
      } else {
        returnVal.error = new RespError(constants.RESP_ERR.CODE_404, constants.ERR_MESSAGES.JOB_NOT_FOUND);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR.CODE_500, error.message);
    }
    return returnVal;
  }

  /**
   * @author Zuber Khan
   * @description service for parsing resume to extract skills
   * @param  {IResumeUpload} params resume upload details
   * @return {ServiceReturnVal} return the object
   */
  public async parseResume(params: IResumeUpload) {
    const returnVal: ServiceReturnVal = {};

    try {
      const file = params.file;
      if (!utility.isEmpty(file)) {
        const skills = await fileParser.parse(file.buffer, file.mimetype);
        return new RespVal({ data: skills }).send();
      } else {
        returnVal.error = new RespError(constants.RESP_ERR.CODE_404, constants.ERR_MESSAGES.FILE_NOT_FOUND);
      }
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR.CODE_500, error.message);
    }
    return returnVal;
  }

    /**
   * @author Zuber Khan
   * @description service for comparing job skills and resume skills
   * @param  {ICompareSkills} params compare skills details
   * @return {ServiceReturnVal} return the object
   */
  public async compareSkills(params: ICompareSkills) {
    const returnVal: ServiceReturnVal = {};

    try {
        const jobSkills = params.jobSkills;
        const resumeSkills = params.resumeSkills;

        const result = skillsMatcher.compareSkills(jobSkills, resumeSkills);
        return new RespVal({ data: result }).send();
    } catch (error) {
      returnVal.error = new RespError(constants.RESP_ERR.CODE_500, error.message);
    }
    return returnVal;
  }
}
