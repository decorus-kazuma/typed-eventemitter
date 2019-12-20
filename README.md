# typed-emitter

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
receiver(@Event event: EventEmitter, data: any) {

}
```

### Emit

```typescript
class Test {
  @EventEmit(event, 'halo')
  sendEvent() {
    return 'Halo!'
  }

  @EventListener(event, 'halo)
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
