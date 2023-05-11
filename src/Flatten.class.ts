import { FlattenBaseClass } from './FlattenBase.class';
import { FlattenToolsClass } from './FlattenTools.class';

export class Flatten extends FlattenToolsClass {
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
