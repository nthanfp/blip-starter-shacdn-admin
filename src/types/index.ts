export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar?: string;
}

export interface APIResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}
