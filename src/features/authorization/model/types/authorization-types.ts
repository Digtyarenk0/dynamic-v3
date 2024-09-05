export interface AuthorizationSchema {
  loginErrMsg?: string;
  registrationErrMsg?: string;
}

export interface CheckKYCStatus {
  token: string;
  verifySatus: string;
}
