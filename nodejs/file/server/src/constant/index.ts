export const constant = {
  // Bearer key
  AUTHORIZATION_KEY: 'Bearer abc',

  // オリジン
  ORIGIN: {
    development: `http://192.168.0.4:1234`,
    production: `http://${process.env.SERVER_IP}:${process.env.NGINX_PORT}`
  },

  // apiのバージョン
  API_VERSION: 'v1'
};
