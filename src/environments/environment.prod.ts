
export const environment = {
  production: true,
  HOSTNAME: '10.100.97.31',
  PORT: '81',
  SCHEME: 'http',
  apiUrl: `${this.SCHEME}://${this.HOSTNAME}:${this.PORT}/api`,
};
