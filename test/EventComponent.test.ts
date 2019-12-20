import { EventComponent } from '../src';

describe('EventComponent', () => {
  @EventComponent
  class FakeClass {}
  test('create new instance and check', () => {
    const instance = new FakeClass();

    expect(instance).toBeInstanceOf(Object);
  });
});
