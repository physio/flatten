import { Searcher } from '../src/Searcher.class';

describe('SearchClass', () => {
  it('Should populate the repository', () => {
    const obj = {
      EnableSymbolName: 'production',
      SamplesBefore: 30,
    };

    const searcher = new Searcher();
    const aspect = {
      EnableSymbolName: 'production',
      SamplesBefore: 30,
    };
    searcher.populate(obj);
    expect(searcher.all()).toEqual(aspect);
  });

  it('Should return the repository', () => {
    const obj = {
      EnableSymbolName: 'production',
      SamplesBefore: 30,
    };

    const searcher = new Searcher();
    searcher.populate(obj);
    expect(searcher.search('SamplesBefore')).toEqual(obj);
  });
});
