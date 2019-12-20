import 'reflect-metadata';
import { EventEmitter } from 'events';
import { EventRegisterContract } from './EventRegisterContract';
import {
  EventInstance as EventInstanceSymbol,
  Listener as EventListenerSymbol,
} from './EventEmitterSymbol';

/**
 * Listen event
 *
 * @param {EventEmitter} event Event
 * @param listen Event key
 * @param {Function|null|undefined} listenFunction
 */
export default function EventListener(
  event: EventEmitter,
  listen: string,
  listenFunction?: Function | null | undefined,
) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    const reflects: EventRegisterContract[] =
      Reflect.getOwnMetadata(EventListenerSymbol, target) || [];

    descriptor.value = function(eventInstance: EventEmitter, ...args: any[]) {
      const eventInstanceParam = Reflect.getOwnMetadata(
        EventInstanceSymbol,
        target,
        propertyKey,
      );
      if (eventInstanceParam && eventInstanceParam.length > 0) {
        args.splice(eventInstanceParam[0], 0, eventInstance);
      }

      return method.apply(this, args);
    };

    reflects.push({
      event: event,
      listen: listen,
      listener: propertyKey,
      listenFunction: listenFunction || null,
    });

    Reflect.defineMetadata(EventListenerSymbol, reflects, target);
  };
}
