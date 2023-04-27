import { SearcherRepositoryInterface } from './interfaces/SearcherRepository.interface';
import _ from 'lodash';
import { FlattenerClass } from './Flatten.class';

export class Searcher implements SearcherRepositoryInterface {
  private static instance: Searcher = null;
  private repository: Object[] = [];
  public static getRepository(): Searcher {
    if (this.instance == null) {
      this.instance = new Searcher();
    }
    return this.instance;
  }

  all(): Object[] {
    return this.repository;
  }

  getItem(index: number): Object {
    return { id: index };
  }

  public search(searchTerm: string): Object[] {
    const filteredCollection = _.filter(this.repository, (item) => {
      const values = _.flatMapDeep(item, (value) => (_.isArray(value) ? value : [value]));
      return _.some(values, (value) => _.includes(_.toLower(value), _.toLower(searchTerm)));
    });

    return filteredCollection;
  }

  getCollection(collection: string): Object[] {
    return [{}];
  }

  populate(jsonData: any): void {
    try {
      this.repository = FlattenerClass.flatten(jsonData);
    } catch (err) {
      throw new Error('Strapi file configuration not valid.');
    }
  }
}
