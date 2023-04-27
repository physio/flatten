class FlattenerClass {

  /**
   * Description - Flatten an object
   * @param {any} obj
   * @param {any} prefix=""
   * @returns {any}
   */
  static flatten(obj, prefix = "") {
    const flattenedObject = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (Array.isArray(value)) {
          FlattenerClass.flattenArray(value, newKey, flattenedObject);
        } else if (typeof value === "object" && value !== null) {
          Object.assign(flattenedObject, FlattenerClass.flatten(value, newKey));
        } else {
          flattenedObject[newKey] = value;
        }
      }
    }
    return flattenedObject;
  }

  /**
   * Description - Flatten an array
   * @param {any} arr
   * @param {any} prefix
   * @param {any} flattenedObject
   * @returns {any}
   */
  static flattenArray(arr, prefix, flattenedObject) {
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      const newKey = `${prefix}[${i}]`;
      if (Array.isArray(value)) {
        FlattenerClass.flattenArray(value, newKey, flattenedObject);
      } else if (typeof value === "object" && value !== null) {
        Object.assign(flattenedObject, FlattenerClass.flatten(value, newKey));
      } else {
        flattenedObject[newKey] = value;
      }
    }
  }

  /**
   * Description - Unflatten an object
   * @param {any} flattenedObj
   * @returns {any}
   */
  static unflatten(flattenedObj) {
    const result = {};

    for (const key in flattenedObj) {
      const keys = key.split(".");
      let currentObj = result;
      let arrayIndex;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (k.includes("[")) {
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
            currentObj = currentObj[arrayKey][arrayIndex];
          }
        } else {
          if (i === keys.length - 1) {
            currentObj[k] = flattenedObj[key];
          } else {
            if (!currentObj[k]) {
              currentObj[k] = {};
            }
            currentObj = currentObj[k];
          }
        }
      }
    }

    return result;
  }
}

module.exports = FlattenerClass;