import { Searcher } from '../src/Searcher.class';

describe('SearchClass', () => {
  it('Should populate the repository', () => {
    const obj = {
      name: 'Mario',
      surname: 'Rossi',
      age: 30,
      address: {
        city: 'Modena',
        state: 'IT',
      },
    };

    const searcher = new Searcher();
    const aspect = {
      name: 'Mario',
      surname: 'Rossi',
      age: 30,
      'address.city': 'Modena',
      'address.state': 'IT',
    };
    searcher.populate(obj);
    expect(searcher.all()).toEqual(aspect);
  });

  it('Should return the property of an object without array', () => {
    const obj = {
      name: 'Mario',
      surname: 'Rossi',
      age: 30,
      address: {
        city: 'Modena',
        state: 'IT',
      },
    };
    const aspectAge = 30;
    const aspectCity = 'Modena';

    const searcher = new Searcher();
    searcher.populate(obj);
    expect(searcher.search('age')).toEqual(aspectAge);
    expect(searcher.search('address.city')).toEqual(aspectCity);
  });

  it('Should return the property of an object with array', () => {
    const obj = {
      name: 'Mario',
      surname: 'Rossi',
      hobbies: ['reading', 'cooking'],
    };
    const aspectReading = 'reading';
    const aspectCooking = 'cooking';

    const searcher = new Searcher();
    searcher.populate(obj);
    expect(searcher.search('hobbies[0]')).toEqual(aspectReading);
    expect(searcher.search('hobbies[1]')).toEqual(aspectCooking);
  });

  it('Should return the property of an array', () => {
    const obj = ['reading', 'cooking'];
    const aspectReading = 'reading';
    const aspectCooking = 'cooking';

    expect(() => {
      const searcher = new Searcher();
      searcher.populate(obj);
      searcher.search('[0]');
    }).toThrow('search term not found.');
  });

  it('Should return the property of an object with array', () => {
    const obj = {
      name: 'Mario',
      hobbies: [
        {
          name: 'reading',
        },
        {
          name: 'cooking',
        },
      ],
    };
    const aspectReading = 'reading';
    const aspectCooking = 'cooking';

    const searcher = new Searcher();
    searcher.populate(obj);
    expect(searcher.search('hobbies[0].name')).toEqual(aspectReading);
    expect(searcher.search('hobbies[1].name')).toEqual(aspectCooking);
  });

  it('Should return the property of an object with array', () => {
    const obj = {
      name: 'Mario',
      hobbies: [
        {
          name: 'reading',
          test: [
            {
              name: 'test',
            },
          ],
        },
        {
          name: 'cooking',
          secondTest: ['mario', 'Ross'],
        },
      ],
    };
    const firstResult = 'test';
    const secondResult = 'Ross';

    const searcher = new Searcher();
    searcher.populate(obj);
    expect(searcher.search('hobbies[0].test[0].name')).toEqual(firstResult);
    expect(searcher.search('hobbies[1].secondTest[1]')).toEqual(secondResult);
  });

  it('Should return a object filtered with a * char with a numeric Id', () => {
    const obj = {
      name: 'Mario',
      hobbies: [
        {
          name: 'reading',
          test: [
            {
              Id: 2,
              name: 'test',
            },
            {
              Id: 1,
              name: 'test',
            },
            {
              Id: 4,
              name: 'test',
            },
            {
              Id: 3,
              name: 'test',
            },
          ],
        },
        {
          name: 'cooking',
          secondTest: ['mario', 'Ross'],
        },
      ],
    };
    const result = {
      Id: 2,
      name: 'test',
    };

    const searcher = new Searcher();
    searcher.populate(obj);
    expect(searcher.search('hobbies[*].Id.2')).toEqual(result);
  });

  it('Should return the empty repository', () => {
    const obj = {
      name: 'Mario',
      hobbies: [
        {
          name: 'reading',
        },
        {
          name: 'cooking',
        },
      ],
    };
    const aspect = { repository: [] };
    expect(Searcher.getCollection()).toEqual(aspect);
  });
});
