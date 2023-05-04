import { FlattenToolsClass } from './FlattenTools.class';

export class Flatten extends FlattenToolsClass {
  /**
   * Description: update the repository
   * @param {any} path:string
   * @param {any} value:any
   * @returns {any}
   */
  update(path: string, value: any): Object {
    const properties = this.getPropertiesWithAsterisk(path);
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
    const properties = this.getPropertiesWithAsterisk(path);
    if (properties.length < 1) {
      throw new Error('search term not found.');
    }
    properties.forEach((property) => {
      delete this.repository[property];
    });

    return this.repository;
  }

  /**
   * Description: add a value in the repository
   * @param {any} path:string
   * @param {any} value:any
   * @returns {any}
   */
  add(path: string, value: any): void {
    path = this.removeLastKeyFromPath(path);
    const properties = this.getPropertiesWithAsterisk(path);
    if (properties.length < 1) {
      throw new Error('search term not found.');
    }
    properties.forEach((property) => {
      this.repository[property].push(value);
    });
  }
}
