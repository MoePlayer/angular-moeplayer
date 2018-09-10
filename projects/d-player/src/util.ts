import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

export class Util {
  public static toBoolean(value: boolean | string): boolean {
    return coerceBooleanProperty(value);
  }

  public static toNumber<D>(value: number | string, fallback: D): number | D {
    return coerceNumberProperty(value, fallback);
  }
}
