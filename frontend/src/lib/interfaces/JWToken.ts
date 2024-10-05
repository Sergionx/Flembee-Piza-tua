export interface JWToken {
  accessToken: string;
  refreshToken: string;
}

export interface JWTokenPayload {
  userId: string;
  jti: string;
  exp: number;
}