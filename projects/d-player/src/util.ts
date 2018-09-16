import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

export class Util {
  public static toBoolean(value: boolean | string): boolean {
    return coerceBooleanProperty(value);
  }

  public static toNumber<D>(value: number | string, fallback: D): number | D {
    return coerceNumberProperty(value, fallback);
  }

  public static safeSet(obj: any): any {
    Object.keys(obj).forEach(key => {
      switch (Object.prototype.toString.call(obj[key])) {
        case '[object String]':
        case '[object Array]':
          if (obj[key].length === 0) {
            delete obj[key];
          }
          break;
        case '[object Object]':
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
          break;
        case '[object Undefined]':
        case '[object Null]':
          delete obj[key];
          break;
      }
    });
    return obj;
  }
}
