import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import {
//   SocketIoEchoConfig,
//   EchoService,
//   ECHO_CONFIG,
// } from 'angular-laravel-echo-fix/dist/src/services/lib.service';

// export const echoConfig: SocketIoEchoConfig = {
//   userModel: 'App.Models.User',
//   notificationNamespace: 'App\\Notifications',
//   options: {
//     broadcaster: 'socket.io',
//     host: window.location.hostname + ':6001',
//   },
// };
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  // providers: [EchoService, { provide: ECHO_CONFIG, useValue: echoConfig }],
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() core: CoreModule) {
  //   if (core) {
  //     throw new Error('You should import core module only in the root module');
  //   }
  // }
}
