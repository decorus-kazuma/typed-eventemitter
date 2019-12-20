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
  @EventListener(customEventEmitter, 'ordered')
  receiveOrderEvent(item: Order) {
    console.log(`${item.name}: ${item.price}`);
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
