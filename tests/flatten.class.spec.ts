import { Flatten } from '../src/Flatten.class';

describe('FlattenClass', () => {
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

  it('Not update, should Through because the path is invalid', () => {
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

  describe('delete', () => {
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

    it('Should delete a property for multiple objects', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      const result = {
        'students.0.sport': 'football',
        'students.1.sport': 'football',
        'students.2.sport': 'volley',
        'students.3.sport': 'football',
        'students.4.sport': 'football',
      };

      expect(flatten.delete('students.*.name')).toEqual(result);
    });

    it('Should delete a object', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      const result = {
        'students.0.sport': 'football',
        'students.1.sport': 'football',
        'students.2.sport': 'volley',
        'students.3.sport': 'football',
        'students.4.sport': 'football',
      };

      expect(flatten.delete('students.1.name')).toEqual(result);
    });
  });

  describe('add', () => {
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

    it('Should add a property for multiple objects', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
      const result = {
        'students.0.name': 'Mario',
        'students.0.sport': 'football',
        'students.0.age': 30,
        'students.1.name': 'Paolo',
        'students.1.sport': 'football',
        'students.1.age': 30,
        'students.2.name': 'Giacomo',
        'students.2.sport': 'volley',
        'students.2.age': 30,
        'students.3.name': 'Mario',
        'students.3.sport': 'football',
        'students.3.age': 30,
        'students.4.name': 'Mario',
        'students.4.sport': 'football',
        'students.4.age': 30,
      };

      expect(flatten.add('students.*.age', 30)).toEqual(result);
    });

    it('Should add a object', () => {
      let flatten = new Flatten();
      flatten.populate(obj);
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
        'students.4.sport': 'football',
        'students.5.name': 'Franco',
        'students.5.sport': 'swimming',
      };

      expect(flatten.add('students', { name: 'Franco', sport: 'swimming' })).toEqual(result);
    });
  });
});
