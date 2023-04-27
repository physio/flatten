export interface SearcherRepositoryInterface {
  getItem(index: number): Object;
  getCollection(str: string): Object[];
  populate(jsonData: any): void;
}
