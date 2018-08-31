import cardsData from './cards.json';

/* eslint-disable import/prefer-default-export */

// Use EOS Asia for Mainnet
export const eosOptions = {
  eosasia: {
    httpEndpoint: 'https://api1.eosasia.one',
    verbose: true,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  },
  kylin: {
    httpEndpoint: 'https://api-kylin.eosasia.one',
    verbose: true,
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  },
  local: {
    httpEndpoint: 'http://127.0.0.1:8888',
    verbose: true,
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  },

};


export const cards = cardsData;

export const i18n = [
  {
    langDisplay: '中文',
    locale: 'zh',
    aliases: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw'],
  },
  {
    langDisplay: 'English',
    locale: 'en',
    aliases: ['en', 'en-us', 'en-au', 'en-bz', 'en-ca', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-gb', 'en-zw'],
  },
  {
    langDisplay: '日本語',
    locale: 'jp',
    aliases: ['jp', 'ja', 'ja-jp'],
  },
];
