export const environment = {
  production: true,
  apiRoot: 'http://127.0.0.1:8000/api',
  algolia: {
    appId: 'VNP1XYFNSF',
    apiKey: '43313045a7a3e98b65b0cb53cdc3cfcc',
    indexName: 'getstarted_actors',
    urlSync: false,
  },
  firebaseConfig: {
    apiKey: 'AIzaSyDzTHd1Z4Fifhw3e2JTc8Z4D58ZwOR01Tc',
    authDomain: 'findme-272806.firebaseapp.com',
    databaseURL: 'https://findme-272806.firebaseio.com',
    projectId: 'findme-272806',
    storageBucket: 'findme-272806.appspot.com',
    messagingSenderId: '601151124383',
    appId: '1:601151124383:web:30157ec341056cd03b83aa',
    measurementId: 'G-5DZVTS8PL8'
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
