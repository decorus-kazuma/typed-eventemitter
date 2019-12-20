import { EventEmitter } from 'events';
import { EventComponent, EventListener } from '../src';

describe('EventListener', () => {
  it('event listener basic test', done => {
    const event = new EventEmitter();
    @EventComponent
    class TestClass {
      public calls: number = 0;

      @EventListener(event, 'halo')
      alpha() {
        ++this.calls;
        done();
      }

      @EventListener(event, 'world')
      @EventListener(event, 'halo')
      beta() {
        ++this.calls;
      }
    }

    const test = new TestClass();

    event.emit('halo', {
      objectId: 1,
    });
    event.emit('world', {
      objectId: 2,
    });

    expect(test.calls).toEqual(3);
  });
});
