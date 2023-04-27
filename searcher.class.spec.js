const Searcher = require('./searcher.class.js');

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

});
