export default () => {
  process.env = {
    HTTP_PORT: '3000',
    ENV: 'development',
    DB_HOST: 'localhost',
    DB_PORT: '5432',
    DB_NAME: 'nestchat',
    DB_USERNAME: 'postgres',
    DB_PASSWORD: 'password',
    SECRET: 'appsecret',
  };
};
