import Joi, { ObjectSchema, PartialSchemaMap } from 'joi';
import Base from '@/validations/base';

export default class JobValidation extends Base {
  public getJobSkillsVS(): ObjectSchema {
    const schema: PartialSchemaMap = {};
    schema.jobTitle = this.isString(true);

    return Joi.object(schema);
  }

    public getCompareSkillsVS(): ObjectSchema {
    const schema: PartialSchemaMap = {};
    schema.jobSkills = this.isStringArray(true);
    schema.resumeSkills = this.isStringArray(true);

    return Joi.object(schema);
  }
}
