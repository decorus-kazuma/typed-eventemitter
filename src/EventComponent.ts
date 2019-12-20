import { EventRegisterContract } from './EventRegisterContract';
import 'reflect-metadata';
import { EventEmitter } from 'events';

export default function EventComponent<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(args);
      const self: any = this;

      Reflect.getMetadata('events:listener', this).forEach(
        (item: EventRegisterContract) => {
          if (typeof self[item.listener] !== 'function') {
            throw new Error('Event listener not found');
          }

          item.event.on(item.listen, (...e: any[]) =>
            self[item.listener].bind(this)(e),
          );
        },
      );
    }
  };
}
