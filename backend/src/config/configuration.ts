export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  dateNagerBaseUrl: process.env.DATE_NAGER_BASE_URL,
  countriesNowBaseUrl: process.env.COUNTRIES_NOW_BASE_URL,
});
