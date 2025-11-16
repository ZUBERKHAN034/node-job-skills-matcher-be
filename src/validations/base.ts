import Joi, { AnySchema, ObjectSchema, PartialSchemaMap } from 'joi';
import constants from '@/common/constants';

export default class Base {
  protected isObjectId(isRequired: boolean): AnySchema {
    let schema = Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message(`"id" password" must be a valid id`);
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isUUID(isRequired: boolean): AnySchema {
    let schema = Joi.string().trim().uuid({ version: 'uuidv4' });
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isNumber(isRequired: boolean): AnySchema {
    let schema = Joi.number();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isString(isRequired: boolean): AnySchema {
    let schema = Joi.string().trim();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isGender(isRequired: boolean): AnySchema {
    let schema = Joi.string().valid(
      constants.ENUMS.GENDER.MALE,
      constants.ENUMS.GENDER.FEMALE,
      constants.ENUMS.GENDER.OTHER,
    );
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isStringAlpha(isRequired: boolean): AnySchema {
    let schema = Joi.string().trim().alphanum();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isBoolean(isRequired: boolean): AnySchema {
    let schema = Joi.bool();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isEmail(isRequired: boolean): AnySchema {
    let schema = Joi.string().trim().email();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isPhone(isRequired: boolean): AnySchema {
    let schema = Joi.string()
      .regex(/^(?:\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/)
      .message(`"phone" must be a valid phone number`);
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isSort(isRequired: boolean): AnySchema {
    let schema = Joi.string().trim().valid(constants.ENUMS.ORDER.ASC, constants.ENUMS.ORDER.DESC);
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isStringArray(isRequired: boolean): AnySchema {
    let schema = isRequired
      ? Joi.array().items(Joi.string().trim().required())
      : Joi.array().items(Joi.string().trim());
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isPassword(isRequired: boolean): AnySchema {
    let schema = Joi.string()
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$/)
      .message(`"password" must be a valid password`);
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isURL(isRequired: boolean): AnySchema {
    let schema = Joi.string().uri();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isObject(isRequired: boolean): AnySchema {
    let schema = Joi.object();
    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isStringAllowNull(isRequired: boolean): AnySchema {
    let schema = Joi.string().allow(null);

    if (isRequired) {
      schema = schema.required();
    }
    return schema;
  }

  protected isForbidden(): AnySchema {
    let schema = Joi.forbidden();
    return schema;
  }

  public getIdVS(type: 'ObjectId' | 'UUID'): ObjectSchema {
    const schema: PartialSchemaMap = {};
    schema.id = type === 'UUID' ? this.isUUID(true) : this.isObjectId(true);

    return Joi.object(schema);
  }

  public getTokenVS(): ObjectSchema {
    const schema: PartialSchemaMap = {};
    schema.token = this.isString(true);

    return Joi.object(schema);
  }

  public getEmailVS(): ObjectSchema {
    const schema: PartialSchemaMap = {};
    schema.email = this.isEmail(true);

    return Joi.object(schema);
  }
}
