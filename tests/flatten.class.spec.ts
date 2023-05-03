import { Flatten } from '../src/Flatten.class';

describe('FlattenClass', () => {
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

    const objTest = new Flatten();
    const aspect = {
      name: 'Mario',
      surname: 'Rossi',
      age: 30,
      'address.city': 'Modena',
      'address.state': 'IT',
    };
    objTest.populate(obj);
    expect(objTest.getCollection()).toEqual(aspect);
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

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getValue('age')).toEqual(aspectAge);
    expect(objTest.getValue('address.city')).toEqual(aspectCity);
  });

  it('Should return the property of an object with array', () => {
    const obj = {
      name: 'Mario',
      surname: 'Rossi',
      hobbies: ['reading', 'cooking'],
    };
    const aspectReading = 'reading';
    const aspectCooking = 'cooking';

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getValue('hobbies.0')).toEqual(aspectReading);
    expect(objTest.getValue('hobbies.1')).toEqual(aspectCooking);
  });

  it('Should return the property of an array', () => {
    const obj = ['reading', 'cooking'];
    const aspectReading = 'reading';
    const aspectCooking = 'cooking';

    expect(() => {
      const objTest = new Flatten();
      objTest.populate(obj);
      objTest.getValue('[0]');
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

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getValue('hobbies.0.name')).toEqual(aspectReading);
    expect(objTest.getValue('hobbies.1.name')).toEqual(aspectCooking);
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

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getValue('hobbies.0.test.0.name')).toEqual(firstResult);
    expect(objTest.getValue('hobbies.1.secondTest.1')).toEqual(secondResult);
  });

  it('Should return the index filtered with a * char with a numeric Id', () => {
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
              Id: 6,
              name: 'test',
            },
            {
              Id: 11,
              name: 'test',
            },
            {
              Id: 44,
              name: 'test',
            },
            {
              Id: 13,
              name: 'test',
            },
          ],
        },
        {
          name: 'cooking',
          secondTest: ['mario', 'Rossi'],
        },
      ],
    };
    const result = 1;

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getIndex('hobbies.0.test.*.Id.6')).toEqual(result);
  });

  it('Should return the empty repository', () => {
    const obj = {};
    const aspect = {};
    let flatten = new Flatten();
    flatten.populate([]);
    expect(flatten.getCollection()).toEqual(aspect);
  });

  it('Should return -1 because there is not the value with getIndexByProperty method', () => {
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
              Id: 6,
              name: 'test',
            },
            {
              Id: 11,
              name: 'test',
            },
            {
              Id: 44,
              name: 'test',
            },
            {
              Id: 13,
              name: 'test',
            },
          ],
        },
        {
          name: 'cooking',
          secondTest: ['mario', 'Rossi'],
        },
      ],
    };
    const result = -1;

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getIndexByProperty('hobbies.0.test', 'Id', 1116)).toEqual(result);
  });

  it('Should return the index with getIndexByProperty method', () => {
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
              Id: 6,
              name: 'test',
            },
            {
              Id: 11,
              name: 'test',
            },
            {
              Id: 44,
              name: 'test',
            },
            {
              Id: 13,
              name: 'test',
            },
          ],
        },
        {
          name: 'cooking',
          secondTest: ['mario', 'Rossi'],
        },
      ],
    };
    const result = 1;

    const objTest = new Flatten();
    objTest.populate(obj);
    expect(objTest.getIndexByProperty('hobbies.0.test', 'Id', 6)).toEqual(result);
  });

  it('Should update multiple properties in the repository', () => {
    const obj = {
      students: [
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Paolo',
          sport: 'football',
        },
        {
          name: 'Giacomo',
          sport: 'volley',
        },
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Mario',
          sport: 'football',
        },
      ],
    };
    const result = {
      'students.0.name': 'Mario',
      'students.0.sport': 'soccer',
      'students.1.name': 'Paolo',
      'students.1.sport': 'soccer',
      'students.2.name': 'Giacomo',
      'students.2.sport': 'soccer',
      'students.3.name': 'Mario',
      'students.3.sport': 'soccer',
      'students.4.name': 'Mario',
      'students.4.sport': 'soccer',
    };
    const objTest = new Flatten();
    objTest.populate(obj);
    objTest.update('students.*.sport', 'soccer');
    expect(objTest.getCollection()).toEqual(result);
  });

  it('Should update one property in the repository', () => {
    const obj = {
      students: [
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Paolo',
          sport: 'football',
        },
        {
          name: 'Giacomo',
          sport: 'volley',
        },
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Mario',
          sport: 'football',
        },
      ],
    };
    const result = {
      'students.0.name': 'Mario',
      'students.0.sport': 'football',
      'students.1.name': 'Paolo',
      'students.1.sport': 'football',
      'students.2.name': 'Giacomo',
      'students.2.sport': 'volley',
      'students.3.name': 'Mario',
      'students.3.sport': 'football',
      'students.4.name': 'Mario',
      'students.4.sport': 'swimming',
    };
    const objTest = new Flatten();
    objTest.populate(obj);
    objTest.update('students.4.sport', 'swimming');
    expect(objTest.getCollection()).toEqual(result);
  });

  /*   it('Should Through because the path is invalid', () => {
    const obj = {
      rooms: [],
      students: [
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Paolo',
          sport: 'volley',
        },
        {
          name: 'Giuseppe',
          sport: 'football',
        },
        {
          name: 'Marco',
          sport: 'football',
        },
      ],
    };
    const result = {
      'students.0.name': 'Mario',
      'students.0.sport': 'soccer',
      'students.1.name': 'Paolo',
      'students.1.sport': 'volley',
      'students.2.name': 'Giuseppe',
      'students.2.sport': 'soccer',
      'students.3.name': 'Marco',
      'students.3.sport': 'soccer',
    };

    const objTest = new Flatten();
    objTest.populate(obj);

    objTest.update('students.*.sport', 'soccer');
    expect(objTest.getCollection()).toEqual(result);
  }); */

  it('Should Through because the path is invalid', () => {
    const obj = {
      rooms: [],
      students: [
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Paolo',
          sport: 'volley',
        },
        {
          name: 'Giuseppe',
          sport: 'football',
        },
        {
          name: 'Marco',
          sport: 'football',
        },
      ],
    };

    const objTest = new Flatten();
    objTest.populate(obj);

    expect(() => {
      objTest.update('test.1.sport', 'soccer');
    }).toThrow('search term not found.');
  });

  it('Should return the empty repository', () => {
    const obj = {};
    const aspect = {};
    let flatten = new Flatten();
    flatten.populate([]);
    expect(flatten.getCollection()).toEqual(aspect);
  });

  describe('getPropertiesWithAsterisk', () => {
    let obj = {
      students: [
        {
          name: 'Mario',
          sport: 'football',
          books: [
            {
              title: 'Harry Potter',
            },
          ],
        },
        {
          name: 'Paolo',
          sport: 'volley',
          books: [
            {
              title: 'Harry Potter',
            },
            {
              title: 'Lord of the rings',
            },
          ],
        },
        {
          name: 'Luigi',
          sport: 'swimming',
        },
        {
          name: 'Claudio',
          sport: 'volley',
          books: [
            {
              title: 'Harry Potter',
            },
            {
              title: 'Lord of the rings',
            },
          ],
        },
      ],
    };
    it('Should return the list with values', () => {
      let flatten = new Flatten();
      let aspect = ['students.0.books.0.title', 'students.1.books.0.title', 'students.1.books.1.title', 'students.3.books.0.title', 'students.3.books.1.title'];
      flatten.populate(obj);
      expect(flatten.getPropertiesWithAsterisk('students.*.books.*.title')).toEqual(aspect);
    });

    it('Should return the list with values', () => {
      let flatten = new Flatten();
      let aspect = ['students.0.name', 'students.1.name', 'students.2.name', 'students.3.name'];
      flatten.populate(obj);
      expect(flatten.getPropertiesWithAsterisk('students.*.name')).toEqual(aspect);
    });
  });

  describe('replaceAtIndex', () => {
    it('Should return correct string with *', () => {
      let flatten = new Flatten();
      expect(flatten['replaceAtIndex']('students.*.books.*.titles.*.italian', 1, 3)).toEqual('students.3.books.*.titles.*.italian');
      expect(flatten['replaceAtIndex']('students.*.books.*.titles.*.italian', 2, 3)).toEqual('students.*.books.3.titles.*.italian');
      expect(flatten['replaceAtIndex']('students.*.books.*.titles.*.italian', 3, 3)).toEqual('students.*.books.*.titles.3.italian');
    });

    it('Should return the input string with no *', () => {
      let flatten = new Flatten();
      expect(flatten['replaceAtIndex']('students.1.books.0.titles.2.italian', 1, 3)).toEqual('students.1.books.0.titles.2.italian');
    });
  });

  describe('isValidPath', () => {
    const obj = {
      students: [
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Paolo',
          sport: 'football',
        },
        {
          name: 'Giacomo',
          sport: 'volley',
        },
        {
          name: 'Mario',
          sport: 'football',
        },
        {
          name: 'Mario',
          sport: 'football',
        },
      ],
    };

    it('Should get true with a valid *', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.*.name')).toEqual(true);
    });

    it('Should get true with a valid index', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.3.name')).toEqual(true);
    });

    it('Should get false with a not valid index', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.223.name')).toEqual(false);
    });

    it('Should get false with a not valid property with *', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.*.age')).toEqual(false);
    });

    it('Should get false with a not valid property', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.2.age')).toEqual(false);
    });
  });
});
