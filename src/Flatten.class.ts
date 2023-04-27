export class FlattenerClass {
  /**
   * Create a Flatten Class from obj input parameter
   * @date 2023-03-10
   * @param {Object} obj:Object - The input Object
   * @param {string} prefix="" - Optional: use it if you want a prefix
   * @returns {Object}
   */
  static flatten(obj: Object, prefix = '') {
    const flattenedObject: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (Array.isArray(value)) {
          FlattenerClass.flattenArray(value, newKey, flattenedObject);
        } else if (typeof value === 'object' && value !== null) {
          Object.assign(flattenedObject, FlattenerClass.flatten(value, newKey));
        } else {
          flattenedObject[newKey] = value;
        }
      }
    }
    return flattenedObject;
  }

  private static flattenArray(arr: any[], prefix: string, flattenedObject: any) {
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      const newKey = `${prefix}[${i}]`;
      if (Array.isArray(value)) {
        FlattenerClass.flattenArray(value, newKey, flattenedObject);
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(flattenedObject, FlattenerClass.flatten(value, newKey));
      } else {
        flattenedObject[newKey] = value;
      }
    }
  }

  static unflatten(flattenedObj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const key in flattenedObj) {
      const keys = key.split('.');
      let currentObj = result;
      let arrayIndex;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (k.includes('[')) {
          const match = k.match(/^(.*)\[(\d+)\]$/);
          if (match) {
            const arrayKey = match[1];
            arrayIndex = Number(match[2]);
            if (!currentObj[arrayKey]) {
              currentObj[arrayKey] = [];
            }
            if (!currentObj[arrayKey][arrayIndex]) {
              currentObj[arrayKey][arrayIndex] = {};
            }
            currentObj = currentObj[arrayKey][arrayIndex] as Record<string, unknown>;
          }
        } else {
          if (i === keys.length - 1) {
            currentObj[k] = flattenedObj[key];
          } else {
            if (!currentObj[k]) {
              currentObj[k] = {};
            }
            currentObj = currentObj[k] as Record<string, unknown>;
          }
        }
      }
    }

    return result;
  }
}
