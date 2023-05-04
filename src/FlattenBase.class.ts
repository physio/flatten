import { BuilderClass } from './Builder.class';

export class FlattenBaseClass {
  protected repository;

  /**
   * Description: populate the repository
   * @param {any} jsonData:any
   * @returns {any}
   */
  populate(jsonData: Object): void {
    try {
      this.repository = BuilderClass.flatten(jsonData);
    } catch (err) {
      throw new Error('data not valid.');
    }
  }

  /**
   * Description: unflatten the repository
   * @returns {any}
   */
  unflatten(): Object {
    return BuilderClass.unflatten(this.repository);
  }

  /**
   * Description: search property in the repository
   * @param {any} path:string
   * @returns {any}
   */
  getValue(path: string): Object[] {
    if (this.repository.hasOwnProperty(path)) {
      return this.repository[path];
    } else {
      throw new Error('search term not found.');
    }
  }

  /**
   * Description: get the repository
   * @param {any} collection:string
   * @returns {any}
   */
  getCollection() {
    return this.repository;
  }
}
