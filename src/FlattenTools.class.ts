import { FlattenBaseClass } from './FlattenBase.class';
import { BinarySearcherClass } from './BinarySearcher.class';
type ObjectWithNestedProperties = { [key: string]: any };

export class FlattenToolsClass extends FlattenBaseClass {

  /**
   * Replace property
   * @param {any} path:string
   * @param {any} property:string
   * @returns {any}
   */
  protected replaceProperty(path: string, property: string): string {
    const lastDotIndex = path.lastIndexOf('.');

    if (lastDotIndex === -1) {
      throw new Error("Path not valid");
    }

    return path.substring(0, lastDotIndex + 1) + property;
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
   * Description: get the partial repository filtered by key
   * @param {any} path:string
   * @returns {any}
   */
  isValidProperty(path: string): boolean {
    if (Object.keys(this.repository).length === 0) return false;
    return this.repository.hasOwnProperty(path);
  }

  /**
   * Description: check if the path is valid in the repository
   * @param {any} path:string
   * @returns {any}
   */
  isValidPath(path: string): boolean {
    if (path.endsWith('.*')) {
      return false;
    }
    const regex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+|\.[a-zA-Z0-9]+(\.[a-zA-Z0-9]+|\.\*)|\.\*)*$/;
    return regex.test(path) && !path.endsWith('.');
  }

  /**
   * Description: replace the asterisk with index
   * @param {any} str:string
   * @param {any} position:number
   * @param {any} index:number
   * @returns {any}
   */
  getMatchingKeys(pathString: string): string[] {
    const regex = new RegExp('^' + pathString.replace(/\*/g, '\\d+') + '$');
    const matchingKeys = Object.keys(this.repository).filter((key) => regex.test(key));
    return matchingKeys;
  }

  /**
   * Check if property exist
   * 
   * @param {any} key:string
   * @returns {any}
   */
  protected hasPropertyStartingWithPathAndDot(key: string): boolean {
    for (const prop in this.repository) {
      if (prop.startsWith(key + '.')) {
        return true;
      }
    }
    return false;
  }

  protected hasPropertyStartingWithPathWithoutDot(path: string): boolean {
    for (const prop in this.repository) {
      if (prop.startsWith(path) && !prop.match(new RegExp(`${path}\.\d+`))) {
        return true;
      }
    }
    return false;
  }

  protected getMaxNumber(str: string): number {
    const regex = new RegExp(`${str}\\.(\\d+)(\\.|$)`);
    let maxNumber = 0;
    for (const key in this.repository) {
      if (regex.test(key)) {
        const [, number] = regex.exec(key) || [];
        maxNumber = Math.max(maxNumber, Number(number));
      }
    }
    return maxNumber + 1;
  }

  protected isAnArray(path: string): boolean {
    for (const prop in this.repository) {
      if (prop.startsWith(path.concat('.0'))) return true;
    }
    return false;
  }

  /**
   * Description: replace the asterisk with index
   * @param {any} str:string
   * @param {any} position:number
   * @param {any} index:number
   * @returns {any}
   */
  protected replaceAtIndex(str: string, position: number, index: number): string {
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
}
