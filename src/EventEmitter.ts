/**
 * Event emitter class
 *
 * @param constructor
 */
export default function EventEmitter<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {};
}
