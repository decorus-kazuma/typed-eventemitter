import { EventInstance } from './EventEmitterSymbol';
import 'reflect-metadata';

export default function Event(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(EventInstance, target, propertyKey) || [];

  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    EventInstance,
    existingRequiredParameters,
    target,
    propertyKey,
  );
}
