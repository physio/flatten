import { Flatten } from '../src/Flatten.class';

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

  it('Should return the empty repository', () => {
    const obj = {};
    const aspect = {};
    let flatten = new Flatten();
    flatten.populate([]);
    expect(flatten.getCollection()).toEqual(aspect);
  });
});
