import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT ?? 3000),
  jwtSecret: process.env.JWT_SECRET ?? 'change_me',
  jwtExpires: process.env.JWT_EXPIRES ?? '1h',
};
