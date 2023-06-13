export const jwtConstants = {
  secret: process.env.JWT_KEY as string,
};
export const FAILED_TO_RETRIEVE_REVIEWS =
  'Failed to retrieve existing reviews from the database.';
export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const NOT_ACCEPTABLE = 'Not acceptable';
export const INVALID_CAPTCHA = 'Invalid captcha';
