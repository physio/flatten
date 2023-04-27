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
    if (this.repository.hasOwnProperty(searchTerm)) {
      return this.repository[searchTerm];
    } else {
      throw new Error('search term not found.');
    }
    /*
    const filteredCollection = _.filter(this.repository, (item: string) => {
      const values = _.flatMapDeep(item, (value) => (_.isArray(value) ? value : [value]));
      return _.some(values, (value) => _.includes(_.toLower(value), _.toLower(searchTerm)));
    });

    return filteredCollection;*/
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
