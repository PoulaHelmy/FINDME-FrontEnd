import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const toggleFade = trigger('fade', [
  //state('void', style({ opacity: 0, transform: 'translateX(30px)' })),
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate(500, style({ opacity: 1, transform: 'translateX(0px)' })),
  ]),
  transition(':leave', [
    animate(500, style({ opacity: 0, transform: 'translateY(30px)' })),
  ]),
]);

//transition('void <=>*', animate('500ms'))  =   transition(':enter,:leave', animate(500)),

//   state('login', style({ opacity: 1 })),
//   transition('login <=> logout', animate(500)),
//   state('logout', style({ opacity: 0 })),
//   sata('*',style({}))
