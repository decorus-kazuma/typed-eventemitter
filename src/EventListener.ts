import { EventRegisterContract } from './EventRegisterContract';
import 'reflect-metadata';
import { EventEmitter } from 'events';

export default function EventListener(event: EventEmitter, listen: string) {
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
    });

    Reflect.defineMetadata('events:listener', reflects, target);
  };
}
