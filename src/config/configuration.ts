export default () => ({
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_URL,
  },
  access: {
    accessTokenKey: process.env.JWT_SECRET,
    accessTokenExpireTime: process.env.JWT_EXPIRES_IN,
  },
});
  