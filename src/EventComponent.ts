import { Listener as EventListenerSymbol } from './EventEmitterSymbol';
import 'reflect-metadata';
import { EventRegisterContract } from './EventRegisterContract';

/**
 * Event component (event listen reg)
 *
 * @param constructor
 */
export default function EventComponent<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(args);
      const self: any = this;
      Reflect.getMetadata(EventListenerSymbol, this)?.forEach(
        (item: EventRegisterContract) => {
          if (typeof self[item.listener] !== 'function') {
            throw new Error('Event listener not found');
          }

          item.event.on(item.listen, (...e: any[]) => {
            self[item.listener].bind(this)(item.event, ...e);
          });
        },
      );
    }
  };
}
