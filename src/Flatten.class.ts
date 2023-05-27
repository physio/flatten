import { FlattenBaseClass } from './FlattenBase.class';
import { FlattenToolsClass } from './FlattenTools.class';

export class Flatten extends FlattenToolsClass {


  public firstIndex(key: string, value: string): number {
    const pattern = key.replace('*', '\\d+');
    const regex = new RegExp(`^${pattern}$`);

    for (const prop in this.repository) {
      if (regex.test(prop) && this.repository[prop] === value) {
        const indexMatch = prop.match(/\d+/);
        if (indexMatch) {
          return Number(indexMatch[0]);
        }
      }
    }

    return -1;
  }

  public allIndexes(key: string, value: string): number[] {
    const pattern = key.replace('*', '\\d+');
    const regex = new RegExp(`^${pattern}$`);

    const matches: number[] = [];

    for (const prop in this.repository) {
      if (regex.test(prop) && this.repository[prop] === value) {
        const indexMatch = prop.match(/\d+/);
        if (indexMatch) {
          matches.push(Number(indexMatch[0]));
        }
      }
    }

    return matches;
  }


  public propertyByValue(path: string, value: string, property: string): number | string | boolean {
    if (!path.includes('*')) {
      throw new Error("Char * no present in path");
    }
    if (path[path.length - 1] == '.') {
      throw new Error("No valid path");
    }

    const segments = path.split('.');
    const wildcardIndex = segments.findIndex((segment) => segment === '*');

    if (wildcardIndex === -1) {
      throw new Error("Char '*' no present in 'path'");
    }

    const objLenght = Object.keys(this.repository).length;

    for (let index = 0; index < objLenght; index++) {
      const key = path.replace('*', index.toString());
      if (this.repository[key] == value) {
        let newProperty = this.replaceProperty(key, property);
        return this.repository[newProperty];
      }
    }

    throw new Error("No value found");
  }


  public propertiesByValue(path: string, value: string, property: string): number[] | string[] | boolean[] {
    if (!path.includes('*')) {
      throw new Error("Char * no present in path");
    }
    if (path[path.length - 1] == '.') {
      throw new Error("No valid path");
    }

    let results = [];
    const segments = path.split('.');
    const wildcardIndex = segments.findIndex((segment) => segment === '*');

    if (wildcardIndex === -1) {
      throw new Error("Char '*' no present in 'path'");
    }

    const objLenght = Object.keys(this.repository).length;

    for (let index = 0; index < objLenght; index++) {
      const key = path.replace('*', index.toString());
      if (this.repository[key] == value) {
        let newProperty = this.replaceProperty(key, property);
        results.push(this.repository[newProperty]);
      }
    }
    return results;
  }


  /**
   * Description: update the repository
   * @param {any} path:string
   * @param {any} value:any
   * @returns {any}
   */
  update(path: string, value: any): Object {
    const properties = this.getMatchingKeys(path);
    if (properties.length < 1) {
      throw new Error('search term not found.');
    }
    properties.forEach((property) => {
      this.repository[property] = value;
    });
    return this.repository;
  }

  /**
   * Description: delete the properties in the repository
   * @param {any} path:string
   * @returns {any}
   */
  delete(path: string): Object {
    const properties = this.getMatchingKeys(path);
    if (properties.length < 1) {
      throw new Error('search term not found.');
    }
    properties.forEach((property) => {
      delete this.repository[property];
    });

    return this.repository;
  }

  /*

condizioni possibili:
1) path valido ()

*/

  add(path: string, value: boolean | number | string | object, key: string = ''): object {
    if (this.isValidPath(path)) {
      if (this.hasPropertyStartingWithPathWithoutDot(path)) {
        if (this.isAnArrray(path)) {
          // this is the case that add a property to an array
          const maxNumber = this.getMaxNumber(path);
          if (typeof value !== 'object') {
            /*             for (let index = 0; index < maxNumber; index++) {
              const property = path.concat('.').concat(index.toString()).concat('.').concat(key);
              this.repository[property] = value;
            } */
            this.repository[path.concat('.').concat(maxNumber.toString())] = value;
            //this.repository[path.concat('.').concat(maxNumber.toString()).concat('.').concat(key)] = value;
            return this.repository;
          } else {
            const fbc = new FlattenBaseClass();
            let ele = fbc.populate(value);
          }
        }

        // this is the case that add a property to an array
        /*         let properties = this.filterObjectByKey(path, this.repository);
         for (let i = 0; i < properties.length; i++) {
          const property = properties[i];

          const newProperty = property.concat('.').concat(maxNumber.toString());
          this.repository[newProperty] = value;
          return this.repository;
        }  */
      }
      if (this.hasPropertyStartingWithPathAndDot(path)) {
        // this is the case that add a property to an existing property
        const property = path.concat('.').concat(key);
        this.repository[property] = value;
        return this.repository;
      }

      if (key != '') {
        if (typeof value !== 'object') {
          this.getMatchingKeys(path).forEach((property) => {
            this.repository[property][key] = value;
          });
        } else {
        }
      }

      return this.repository;
    } else {
      throw new Error('path term not found.');
    }
  }
}
