export const environment = {
  production: true,
  apiRoot: 'http://127.0.0.1:8000/api',
  algolia: {
    appId: 'VNP1XYFNSF',
    apiKey: '43313045a7a3e98b65b0cb53cdc3cfcc',
    indexName: 'getstarted_actors',
    urlSync: false,
  },
  azure: {
    endpoint: 'https://eastus.api.cognitive.microsoft.com/face/v1.0',
  },
  remoteConfig: false, // for performance don't load settings from remote
  apiUrl: 'http://findme.test',
  tenant: 'findme',
  defaultLang: 'en',
  shemaVersion: '1',
};
