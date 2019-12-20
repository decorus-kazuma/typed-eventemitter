import { EventRegisterContract } from './EventRegisterContract';
import 'reflect-metadata';
import { EventEmitter } from 'events';

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
      Reflect.getOwnMetadata('events:listener', target) || [];

    descriptor.value = function(...args: any[]) {
      const original = method.apply(this, args);
      return original;
    };

    reflects.push({
      event: event,
      listen: listen,
      listener: propertyKey,
      listenFunction: listenFunction || null,
    });

    Reflect.defineMetadata('events:listener', reflects, target);
  };
}
