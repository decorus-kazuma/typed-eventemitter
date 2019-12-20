import { EventEmitter } from 'events';
/**
 *
 *
 * @export
 * @interface EventRegisterContract
 */
export interface EventRegisterContract {
  event: EventEmitter;
  listen: string;
  listener: string;
}
