// import the required animation functions from the angular animations module
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';

export const staggerAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), {optional: true}),
    query(':enter', stagger('300ms', [
      animate('1s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
      ]))]), {optional: true}),
      query(':leave', stagger('300ms', [
        animate('1s ease-in', keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
          style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
        ]))]), {optional: true})
  ])
]);

export const staggerExplainerAnimation = trigger('explainerAnimation', [
  transition('* => *', [
    query('.btn', style({ opacity: 0, transform: 'translateX(-40px)' })),
    query('.btn', stagger('100ms', [
      animate('300ms 1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ])),
    query('.btn', [
      animate(1000, style('*'))
    ])
  ])
]);
