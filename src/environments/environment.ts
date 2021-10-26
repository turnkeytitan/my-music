// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  tokenUrl: 'https://accounts.spotify.com/api/token',
  accUrl: 'https://accounts.spotify.com/authorize?',
  apiUrl: 'https://api.spotify.com/v1/',
  clientId: 'a400d9e9923f4600b87b849f90800186',
  clientSecret: '1625de527b14449595ec9345d953d944',
  response_type: 'code',
  redirect_uri: 'http://localhost:4200/auth',
  state: randomString(),
  scope: 'ugc-image-upload '+
  'playlist-modify-private '+
  'playlist-read-private '+
  'playlist-modify-public '+
  'playlist-read-collaborative '+
  'user-read-private '+
  'user-read-email '+
  'user-read-playback-state '+
  'user-modify-playback-state '+
  'user-read-currently-playing '+
  'user-library-modify '+
  'user-library-read '+
  'user-read-playback-position '+
  'user-read-recently-played '+
  'user-top-read '+
  'app-remote-control '+
  'streaming '+
  'user-follow-modify '+
  'user-follow-read',
  grant_type: ['authorization_code','refresh_token']
};
function randomString() {
  const length = 16;
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";    

  for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random()* length)];
  }

  return str;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
