import { CartProduct } from "../hooks/useCart";

export interface SignUpPayload  extends UserInfo{
    password: string;
    confirmEmail: string;
    confirmPassword: string;
  }
export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    cart?: CartProduct[]
    address?: string;
  }
