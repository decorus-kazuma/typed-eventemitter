import { EventEmitter } from 'events';

export default function EventEmit(event: EventEmitter, emit: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalFunction = descriptor.value as Function;
    descriptor.value = function(...args: any[]) {
      const original = originalFunction.apply(this, args);
      event.emit(emit, original);
      return original;
    };
  };
}
