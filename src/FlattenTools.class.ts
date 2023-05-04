import { FlattenBaseClass } from './FlattenBase.class';
import { BinarySearcherClass } from './BinarySearcher.class';
type ObjectWithNestedProperties = { [key: string]: any };

export class FlattenToolsClass extends FlattenBaseClass {
  /**
   * Description: get all the properties with asterisk
   *
   * If pass a path like this: '0*.id' the method return an array with all the properties that match the path
   *
   * @param {any} path:string
   * @returns {any}
   */
  getPropertiesWithAsterisk(path: string): string[] {
    return this.getMatchingKeys(path);
  }

  /**
   * Description: get a path without the last node
   * @param {any} input:string
   * @param {any} filter:string
   * @returns {any}
   */
  private getStringUntilIdKey(input: string, filter: string): string {
    const idIndex = input.indexOf('.' + filter);
    if (idIndex !== -1) {
      return input.slice(0, idIndex);
    }
    return input;
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

  /**
   * Description: get the first path without *
   * @param {any} path:string
   * @returns {any}
   */
  getFirstPath(path: string): string {
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
   * Description: get the partial repository filtered by key
   * @param {any} key:string
   * @param {any} obj:ObjectWithNestedProperties
   * @returns {any}
   */
  filterObjectByKey(key: string, obj: ObjectWithNestedProperties): ObjectWithNestedProperties[] {
    const result: ObjectWithNestedProperties[] = [];
    for (const prop in obj) {
      if (prop.endsWith(key) && typeof obj[prop] !== 'undefined') {
        result.push({ [key]: obj[prop] });
      }
    }
    return result;
  }

  /**
   * Description: check if the path is valid in the repository
   * @param {any} path:string
   * @returns {any}
   */
  isValidPath(path: string): boolean {
    const updatedPath = path.replace(/\*/g, '0');
    return this.repository.hasOwnProperty(updatedPath);
  }

  /**
   * Description: replace the asterisk with index
   * @param {any} str:string
   * @param {any} position:number
   * @param {any} index:number
   * @returns {any}
   */
  replaceAtIndex(str: string, position: number, index: number): string {
    if (index < 1) throw new Error('index must be greater than 0');
    const asteriskIndex = str.indexOf('*');
    if (asteriskIndex === -1) {
      return str;
    }
    let count = 0;
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '*') {
        count++;
        if (count === position) {
          result += index.toString();
          continue;
        }
      }
      result += str[i];
    }
    return result;
  }

  /**
   * Description: remove the last key from path
   * @param {any} path:string
   * @returns {any}
   */
  removeLastKeyFromPath(path: string): string {
    const lastDotIndex = path.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return '';
    }
    return path.substring(0, lastDotIndex);
  }

  /**
   * Description: replace the asterisk with index
   * @param {any} str:string
   * @param {any} position:number
   * @param {any} index:number
   * @returns {any}
   */
  getMatchingKeys(stringWithAsterisks: string): string[] {
    const regex = new RegExp('^' + stringWithAsterisks.replace(/\*/g, '\\d+') + '$');
    const matchingKeys = Object.keys(this.repository).filter((key) => regex.test(key));
    return matchingKeys;
  }
}
