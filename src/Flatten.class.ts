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
   * Description: get the repository
   * @param {any} collection:string
   * @returns {any}
   */
  public getCollection() {
    return this.repository;
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

  private countOccurrences(str: string, char: string) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) {
        count++;
      }
    }
    return count;
  }

  /**
   * Description: replace the asterisk with index
   * @param {any} str:string
   * @param {any} position:number
   * @param {any} index:number
   * @returns {any}
   */
  private replaceAtIndex(str: string, position: number, index: number): string {
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

  public countKeys(stringWithAsterisks: string): number {
    const regex = new RegExp('^' + stringWithAsterisks.replace(/\*/g, '\\d+') + '$');
    const matchingKeys = Object.keys(this.repository).filter((key) => regex.test(key));
    return matchingKeys.length;
  }

  public getMatchingKeys(stringWithAsterisks: string): string[] {
    const regex = new RegExp('^' + stringWithAsterisks.replace(/\*/g, '\\d+') + '$');
    const matchingKeys = Object.keys(this.repository).filter((key) => regex.test(key));
    return matchingKeys;
  }

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

  public update(path: string, value: any): void {
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

  unflatten(): Object {
    return BuilderClass.unflatten(this.repository);
  }
}
