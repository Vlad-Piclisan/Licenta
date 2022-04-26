export interface SignUpPayload  extends UserInfo{
    password: string;
    confirmEmail: string;
    confirmPassword: string;
  }
export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;

  }