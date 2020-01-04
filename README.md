# typed-emitter
`EventEmitter` is an effective function to do make an async application. And the decorator is useful to keep the code clean and simple. 

#### 日本語
EventEmitterを利用すれば、良い非同期アプリケーションを開発することができます。
また、Decoratorを利用してコードをきれいに保つことができます。なお、Decoratorを利用してコードをきれいに保つことができます。
**実験的な機能です。**

**THIS LIBRARY IS VERY EXPERIMENTAL**
Might be a cause memory leak.

- [Usage](Usage)
- [Decorators](Decorators)
	- [@EventComponent](@EventComponent)
	- [@EventListener](@EventListener)
	- [@EventEmit](@EventEmit)
	- [@Event](@Event)

## Usage

```typescript
interface Order {
  item: string;
  price: number;
}
```

```typescript
const customEventEmitter = new EventEmitter();
```

```typescript
import { EventListener, EventComponent, Event } from 'typed-eventemitter';

@EventComponent
class OrderService {
  lastItem: Order | undefined;

  @EventListener(customEventEmitter, 'ordered')
  receiveOrderEvent(item: Order) {
    console.log(`${item.name}: ${item.price}`);
    this.lastItem = item;
  }
}
```

```typescript
class Application {
  static bootstrap() {
    // Singleton
    const orderService = new OrderService();
  }
}

Application.bootstrap();

customEventEmitter.on('ordered', {
  item: 'りんご',
  price: 200,
});
```

```
りんご: 200
```

### Receive event instance

```typescript
receiver(@Event event: EventEmitter, data: any): bool {
  // do something in here
  if (event instanceof EventEmitter) {
    return true; // always.
  }

  return false;
}
```

### Emit

```typescript
@EventComponent
class Test {
  @EventEmit(event, 'halo')
  sendEvent() {
    return 'Halo!';
  }

  @EventListener(event, 'halo')
  receive(data: any) {
    console.log(data);
  }
}

const testInstance = new Test();
testInstance.sendEvent();
```

```
Halo!
```

## Decorators

