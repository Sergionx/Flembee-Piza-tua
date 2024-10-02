import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "30m",
  });
}

export function generateRefreshToken(userId: string, jti: string) {
  return jwt.sign(
    {
      userId,
      jti,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "8h",
    }
  );
}

export function generateTokens(userId: string, jti: string) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId, jti);

  return {
    accessToken,
    refreshToken,
  };
}
