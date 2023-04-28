import { BinarySearcherClass } from './BinarySearcher.class';
import { FlattenerClass } from './Flatten.class';

export class Searcher {
  private static instance: Searcher = null;
  private repository: Object[] = [];

  /**
   * Description
   * @returns {any}
   */
  all(): Object[] {
    return this.repository;
  }

  /**
   * Description: search property in the repository
   * @param {any} searchTerm:string
   * @returns {any}
   */
  public search(searchTerm: string): Object[] {
    if (searchTerm.includes('*')) {
      // Todo: implement a binary search
      const id = searchTerm.split('*')[1];
      BinarySearcherClass.searchBy(id, searchTerm, this.repository);
    }
    if (this.repository.hasOwnProperty(searchTerm)) {
      return this.repository[searchTerm];
    } else {
      throw new Error('search term not found.');
    }
  }

  /**
   * Description: get the collection
   * @param {any} collection:string
   * @returns {any}
   */
  public static getCollection(): Searcher {
    if (this.instance == null) {
      this.instance = new Searcher();
    }
    return this.instance;
  }

  /**
   * Description: populate the repository
   * @param {any} jsonData:any
   * @returns {any}
   */
  populate(jsonData: any): void {
    try {
      this.repository = FlattenerClass.flatten(jsonData);
    } catch (err) {
      throw new Error('data not valid.');
    }
  }
}
