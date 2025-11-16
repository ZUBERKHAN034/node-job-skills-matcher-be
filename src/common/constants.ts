// NOTE : ENVIRONMENT VARIABLES NOT ACCESSIBLE HERE!!!

/**
 * @description Central bucket module for all constants and enums.
 * @module constants
 * @author Zuber Khan
 *
 * @example
 * // Importing a constant from this module
 * import constants from './constants';
 * console.log(constants.ROLE.USER); // Outputs the value of constants.ROLE.USER which is 'user'
 */
const constants = {
   AI : {
     GOOGLE:{
        MODEL_NAME: 'gemini-2.5-flash',
     }
   },

  PATHS: {
    JOB_LISTINGS: "../data/jobs",
  },

  BACKEND_PROPS: {
    LOCAL_HOST: 'localhost',
    TOKEN_USER: 'tokenUser',
  },

  EMAIL: {
    PURPOSE: {
      RESET_PASSWORD: 'resetPassword',
      REGISTER_USER: 'registerUser',
      VALIDATE_EMAIL: 'validateEmail',
    },
    GATEWAY: {
      SENDGRID: 'sendgrid',
      POSTMARK: 'postmark',
      MANDRILL: 'mandrill',
      VALUEFIRST: 'valuefirst',
    },
  },

  OTP: {
    TYPE: {
      CREATE: 'create',
      RESEND: 'resend',
    },
    PURPOSE: {
      RESET_PASSWORD: 'resetPassword',
    },
  },

  COOKIES: {
    ACCESS_TOKEN: 'accessToken',
  },

  ENUMS: {
    ORDER: {
      ASC: 'asc',
      DESC: 'desc',
    },

    ROLE: {
      USER: 'user',
      ADMIN: 'admin',
      CUSTOM: 'custom',
    },

    CLIENT: {
      USER_CLIENT: 'user-client',
    },

    TYPE: {
      GOOGLE: 'GOOGLE',
      CUSTOM: 'CUSTOM',
    },

    STATUS: {
      WAITING: 'waiting',
      APPROVED: 'approved',
      REJECTED: 'rejected',
      BLOCKED: 'blocked',
    },

    HASH_TYPES: {
      CREATE_NEW_ACCT: 'CREATE_NEW_ACCT',
      RESET_PASSWORD: 'RESET_PASSWORD',
      UPDATE_EMAIL: 'UPDATE_EMAIL',
    },

    GENDER: {
      FEMALE: 'female',
      MALE: 'male',
      OTHER: 'other',
    },

    LOGIN_TYPE: {
      GOOGLE: 'GOOGLE',
      CUSTOM: 'CUSTOM',
    },

    HASH_EXPIRES_IN: {
      OTP_DEFAULT_EXPIRY: 5,
      OTP_REQUEST_EXPIRY: 1,
      USER_BLOCK_EXPIRY: 60,
    },
  },

  RESP_ERR: {
    CODE_400: 400, // Bad Request
    CODE_401: 401, // Unauthorized
    CODE_403: 403, // Forbidden
    CODE_404: 404, // Not Found
    CODE_405: 405, // Method Not Allowed
    CODE_406: 406, // Not Acceptable
    CODE_409: 409, // Conflict
    CODE_410: 410, // Gone
    CODE_412: 412, // Precondition Failed
    CODE_422: 422, // Unprocessable Entity
    CODE_429: 429, // Too Many Requests

    CODE_500: 500, // Internal Server Error
    CODE_501: 501, // Not Implemented
    CODE_502: 502, // Bad Gateway
    CODE_503: 503, // Service Unavailable
    CODE_504: 504, // Gateway Timeout
    CODE_505: 505, // HTTP Version Not Supported
  },

  ERR_MESSAGES: {
    NOT_AUTHORIZED: 'You are not authorized to make this request',
    NOT_ENOUGH_ACCESS: 'Not Enough Access',
    USER_NOT_EXIST: `User doesn't exist`,
    FILE_NOT_FOUND: 'File not found.',
    USER_ALREADY_EXISTS: 'User already exists',
    USER_INVALID: 'Invalid Email/Password',
    USER_STATUS_WAITING: 'Please wait while a member contacts you.',
    USER_STATUS_REJECTED: 'Your authorization has failed. Please register again.',
    USER_STATUS_BLOCKED: 'You are not authorized to use Ingage. Kindly contact someone from our team.',
    USER_NOT_VERIFIED: 'Please check your mail to signUp.',
    USER_NOT_SIGNED_UP: 'Please setup your password.',
    RECORD_NOT_FOUND: 'Record not found.',
    PASSWORD_NOT_MATCHED: 'Password not matched',
    PASSWORD_NOT_CHANGED: "You haven't changed your password in the last 3 months. Please change your password.",
    SAME_OLD_PASSWORD: 'New Password cannot be same as Old Password',
    LIMIT_REACHED: 'Limit reached',
    OTP_EXPIRED: 'OTP expired',
    OTP_INVALID: 'Invalid OTP',
    INVALID_LINK: 'Invalid link',
    FORGOT_PASSWORD_REQUEST: `The account currently has no password set. We recommend requesting a 'Forgot Password'.`,
    OTP_REQUEST_LIMIT: 'Please wait at least 1 minute before requesting a new OTP.',
    USER_ACCOUNT_BLOCK: 'Account Blocked: 5 wrong OTP attempts. Please try again after 1 hour.',
    USER_ALREADY_SIGNED_UP: 'You have already SignedUp. Please login.',
    MEMBER_CONTACT_YOU: 'A member of our team will contact you soon.',
    EMAIL_ALREADY_REGISTERED_AZURE: 'Email already registered in Azure Portal',
    VERIFY_EMAIL_SENT: 'Verification email has been sent to you',
    INVITE_ALREADY_SENT: 'Invitation already sent',
    EMAIL_ALREADY_VERIFIED: 'Email already verified',
    PERMISSION_TEMPLATE_NOT_EXIST: 'Permission Template not exist',
    INVALID_EMAIL_PASSWORD: 'Invalid Email/Username or Password',
    JOB_NOT_FOUND: 'No job listing found for this title',
  },

  SUCC_MESSAGES: {
    USER_DELETED: 'User deleted successfully',
    PERMISSION_TEMPLATE_DELETED: 'Permission template deleted successfully',
    EMAIL_SEND: 'Email send successfully',
    EMAIL_RESEND: 'Email resend successfully',
    OK: 'OK',
    REGISTER_SUCCESS: 'Register successfully',
    PASSWORD_CHANGED: 'Password changed successfully',
    PASSWORD_SET: 'Password set successfully',
    PASSWORD_RESET: 'Password reset successfully',
    EMAIL_UPDATED: 'Email updated successfully',
    OTP_EMAIL_SEND: 'one-time password (OTP) email sent successfully',
  },

  NODE_ENV: {
    NODEMON_LOCAL: 'nodemon-local',
    LOCAL: 'local',
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
  },

  ROUTES: {
    API_BASE_ROUTE: '/api',
    AUTH: '/auth',
    JOB_MATCHER: '/job-matcher',
  },
    DB_STATES: {
    0: 'DISCONNECTED',
    1: 'CONNECTED',
    2: 'CONNECTING',
    3: 'DISCONNECTING',
  },
} as const;

export default constants;
