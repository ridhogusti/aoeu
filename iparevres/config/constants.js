require('dotenv').config();

const WHITELIST = {
  artikels: {
    create: ['title', 'text', 'image'],
    update: ['title', 'text', 'image'],
  },

  videos: {
    create: ['title', 'video'],
    update: ['title', 'video'],
  },

  audios: {
    create: ['title', 'audio'],
    update: ['title', 'audio'],
  },

  jadwals: {
    create: ['tanggal', 'waktu', 'tema', 'tempat'],
    update: ['tanggal', 'waktu', 'tema', 'tempat'],
  },
  
  users: {
    create: ['email', 'username', 'password', 'akses', 'name'],
  },
};

const devConfig = {
  // JWT_SECRET: process.env.JWT_SECRET_DEV,
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: process.env.MONGO_URL_DEV,
};

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-test',
};

const prodConfig = {
  // JWT_SECRET: process.env.JWT_SECRET_PROD,
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: process.env.MONGO_URL_PROD,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  RAVEN_ID: process.env.RAVEN_ID,
  WHITELIST,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
