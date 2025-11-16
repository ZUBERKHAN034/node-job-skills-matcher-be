export interface TokenUserPermissions {
  campaign?: string;
  journeys?: string;
  segment?: string;
  referral?: string;
  giftcard?: string;
  publisher?: string;
  sms?: string;
  email?: string;
  whatsapp?: string;
  integrations?: string;
  uploads?: string;
  downloadCsvAccess?: boolean;
  dashboardsAccess?: boolean;
  'inbox-builder'?: string;
  'customer-profile'?: string;
  'landing-page'?: string;
  'loyalty-rewards'?: string;
  'loyalty-program'?: string;
  'push-notification'?: string;
  'qr-code-campaign'?: string;
  'points-reinstate'?: string;
  'in-app-promotions'?: string;
  'web-push'?: string;
  'facebook-ads'?: string;
  'google-ads'?: string;
  'help-center'?: string;
  'survey-builder'?: string;
  'in-app-notification'?: string;
  'web-onsite-notification'?: string;
  'member-pricing'?: string;
  'tikTok-ads'?: string;
  'snapchat-ads'?: string;
  'e-receipts'?: string;
}

export interface ParamsID {
  id?: string;
}

export interface TokenUser {
  email: string;
  client: string;
  authenticationEnabled: boolean;
  canLogin: boolean;
  userRole: string;
  firstName: string;
  lastName: string;
  permissions?: TokenUserPermissions;
}

export interface Cookies {
  swanSession?: string; // swan session cookie for backend
  refreshToken?: string; // refresh token cookie for backend
  _csrf?: string; // csrf token cookie for backend
  swanConfig?: string; // swan config cookie for frontend
  rememberMeToken?: string; // remember me token cookie for frontend
  'XSRF-TOKEN'?: string; // xsrf token cookie for frontend
}
