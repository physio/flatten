import { FlattenBaseClass } from '../src/FlattenBase.class';
import { FlattenToolsClass } from '../src/FlattenTools.class';

describe('FlattenToolsClass', () => {
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

    const objTest = new FlattenToolsClass();
    objTest.populate(obj);
    expect(objTest.getIndex('hobbies.0.test.*.Id.6')).toEqual(result);
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

    const objTest = new FlattenToolsClass();
    objTest.populate(obj);
    expect(objTest.getIndex('hobbies.0.test.*.Id.6')).toEqual(result);
  });

  it('Should return the list with values', () => {
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

    let flatten = new FlattenToolsClass();
    let aspect = ['students.0.books.0.title', 'students.1.books.0.title', 'students.1.books.1.title', 'students.3.books.0.title', 'students.3.books.1.title'];
    flatten.populate(obj);
    expect(flatten.getMatchingKeys('students.*.books.*.title')).toEqual(aspect);
  });

  it('Should return the list with values', () => {
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
    let flatten = new FlattenToolsClass();
    let aspect = ['students.0.name', 'students.1.name', 'students.2.name', 'students.3.name'];
    flatten.populate(obj);
    expect(flatten.getPropertiesWithAsterisk('students.*.name')).toEqual(aspect);
  });

  it('Should return correct string with *', () => {
    let flatten = new FlattenToolsClass();
    expect(flatten.replaceAtIndex('students.*.books.*.titles.*.italian', 1, 3)).toEqual('students.3.books.*.titles.*.italian');
    expect(flatten.replaceAtIndex('students.*.books.*.titles.*.italian', 2, 3)).toEqual('students.*.books.3.titles.*.italian');
    expect(flatten.replaceAtIndex('students.*.books.*.titles.*.italian', 3, 3)).toEqual('students.*.books.*.titles.3.italian');
  });

  it('Should return the input string with no *', () => {
    let flatten = new FlattenToolsClass();
    expect(flatten.replaceAtIndex('students.1.books.0.titles.2.italian', 1, 3)).toEqual('students.1.books.0.titles.2.italian');
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
      let flatten = new FlattenToolsClass();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.*.name')).toEqual(true);
    });

    it('Should get true with a valid index', () => {
      let flatten = new FlattenToolsClass();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.3.name')).toEqual(true);
    });

    it('Should get false with a not valid index', () => {
      let flatten = new FlattenToolsClass();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.223.name')).toEqual(false);
    });

    it('Should get false with a not valid property with *', () => {
      let flatten = new FlattenToolsClass();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.*.age')).toEqual(false);
    });

    it('Should get false with a not valid property', () => {
      let flatten = new FlattenToolsClass();
      flatten.populate(obj);
      expect(flatten.isValidPath('students.2.age')).toEqual(false);
    });
  });

  /*   it('Should return -1 because there is not the value with getIndexByProperty method', () => {
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

    const objTest = new FlattenToolsClass();
    objTest.populate(obj);
    expect(objTest.getIndexByProperty('hobbies.0.test', 'Id', 1116)).toEqual(result);
  }); */

  /* it('Should return the index with getIndexByProperty method', () => {
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

    const objTest = new FlattenToolsClass();
    objTest.populate(obj);
    expect(objTest.getIndexByProperty('hobbies.0.test', 'Id', 6)).toEqual(result);
  }); */
});
