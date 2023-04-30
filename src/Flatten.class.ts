import { BinarySearcherClass } from './BinarySearcher.class';
import { BuilderClass } from './Builder.class';

type ObjectWithNestedProperties = { [key: string]: any };

export class Flatten {
  private repository;

  private filterObjectByKey(key: string, obj: ObjectWithNestedProperties): ObjectWithNestedProperties[] {
    const result: ObjectWithNestedProperties[] = [];
    for (const prop in obj) {
      if (prop.endsWith(key) && typeof obj[prop] !== 'undefined') {
        result.push({ [key]: obj[prop] });
      }
    }
    return result;
  }

  private getStringUntilIdKey(input: string, filter: string): string {
    const idIndex = input.indexOf('.' + filter);
    if (idIndex !== -1) {
      return input.slice(0, idIndex);
    }
    return input;
  }

  private getPath(path: string): string {
    if (path.includes('*')) {
      const key = path.split('*.')[1].split('.')[0];
      const id = path.split('*.')[1].split('.')[1];
      const prefix = path.split('*')[0].replace(/\.$/, '');
      let arr = this.filterObjectByKey(key, this.repository);
      const index = BinarySearcherClass.searchBy(key, Number(id), arr);
      let p = path.replace(/\*/g, index as unknown as string);
      return this.getStringUntilIdKey(p, key);
    }
    return path;
  }

  /**
   * Description: search property in the repository
   * @param {any} path:string
   * @returns {any}
   */
  getIndex(path: string): number {
    if (path.includes('*')) {
      const key = path.split('*.')[1].split('.')[0];
      const id = path.split('*.')[1].split('.')[1];
      let arr = this.filterObjectByKey(key, this.repository);
      return BinarySearcherClass.searchBy(key, Number(id), arr);
    }
    return -1;
  }

  getIndexByProperty(path: string, key: string, value: any): number {
    let arr = this.filterObjectByKey(key, this.repository);
    return BinarySearcherClass.searchBy(key, value, arr);
  }

  /**
   * Description: search property in the repository
   * @param {any} path:string
   * @returns {any}
   */
  public getValue(path: string): Object[] {
    //path = this.getPath(path);
    if (this.repository.hasOwnProperty(path)) {
      return this.repository[path];
    } else {
      throw new Error('search term not found.');
    }
  }

  /**
   * Description: get the collection
   * @param {any} collection:string
   * @returns {any}
   */
  public getCollection() {
    return this.repository;
  }

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
}
