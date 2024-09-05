export interface SignInUserDataForSign {
  data: {
    signingMessage: string;
  };
}

export interface SignInError {
  message: string;
  status: number;
}

export type KYCVerify = 'not-verify' | 'review' | 'not-recognized' | 'verify';

export interface User {
  id: number;
  email: string;
  verify: KYCVerify;
  isVeryfied: boolean;
  tester: boolean;
}

export interface UserSchemeState {
  _inited: boolean;
  isLogged: boolean;
  sessionEnded: boolean;
  user?: User;
}
