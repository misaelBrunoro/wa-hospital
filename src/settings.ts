import * as dotenv from 'dotenv';

const ENV_FILE = dotenv.config().parsed || {};

export const NODE_ENV = (process.env.NODE_ENV || 'production').trim();
export const SENTRY_DSN = (process.env.SENTRY_DSN || '').trim();

export const API_DNS = (process.env.API_DNS || '').trim();
export const APP_DNS = (process.env.APP_DNS || '').trim();

export const REQUEST_BODY_LIMIT = process.env.REQUEST_BODY_LIMIT || '10mb';

export const VERSION = (
  process.env.VERSION ||
  ENV_FILE.VERSION ||
  'dev'
).trim();
