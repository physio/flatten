import { Flatten } from '../src/Flatten.class';

describe('FlattenClass', () => {
  describe('firstIndex', () => {
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

    const objTest = new Flatten();
    objTest.populate(obj);
    it('Should find the first property from array', () => {
      expect(objTest.firstIndex('students.*.sport', 'volley')).toEqual(2);
    });

    it('Should return no index because there is not a key', () => {
      expect(objTest.firstIndex('students.*.sport', 'swimming')).toEqual(-1);
    });
  });

  describe('allIndexes', () => {
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

    const objTest = new Flatten();
    objTest.populate(obj);
    it('Should find only one occuren from array', () => {
      expect(objTest.allIndexes('students.*.sport', 'volley')).toEqual([2]);
    });

    it('Should find the entire array from array', () => {
      expect(objTest.allIndexes('students.*.sport', 'football')).toEqual([0, 1, 3, 4]);
    });

    it('Should return no index because there is not a key', () => {
      expect(objTest.allIndexes('students.*.sport', 'swimming')).toEqual([]);
    });
  });

  describe('propertyByValue', () => {
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

    const objTest = new Flatten();
    objTest.populate(obj);
    it('Should find only one occuren from array', () => {
      expect(objTest.propertyByValue('students.*.sport', 'volley', 'name')).toEqual('Giacomo');
    });

    it('Should return a throw because there is not a key', () => {
      expect(() => {
        objTest.propertyByValue('students.*.sport', 'swimming', 'name');
      }).toThrow('No value found');
    });

    it('Should return a throw because there is not a key', () => {
      expect(() => {
        objTest.propertyByValue('students.*.', 'swimming', 'name');
      }).toThrow('No valid path');
    });

    it('Should return a throw because the path is not valid', () => {
      expect(() => {
        objTest.propertyByValue('students', 'swimming', 'name');
      }).toThrow('Char * no present in path');
    });
  });

  describe('propertiesByValue', () => {
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

    const objTest = new Flatten();
    objTest.populate(obj);
    it('Should find only one occuren from array', () => {
      expect(objTest.propertiesByValue('students.*.sport', 'football', 'name')).toEqual(["Mario", "Paolo", "Mario", "Mario"]);
    });

    it('Should return a throw because there is not a key', () => {
      expect(objTest.propertiesByValue('students.*.sport', 'swimming', 'name')).toEqual([]);

    });

    it('Should return a throw because there is not a key', () => {
      expect(() => {
        objTest.propertiesByValue('students.*.', 'swimming', 'name');
      }).toThrow('No valid path');
    });

    it('Should return a throw because the path is not valid', () => {
      expect(() => {
        objTest.propertiesByValue('students', 'swimming', 'name');
      }).toThrow('Char * no present in path');
    });
  });

  describe('update', () => {
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
        'students.0.name': 'Mario',
        'students.0.sport': 'football',
        'students.1.sport': 'football',
        'students.2.name': 'Giacomo',
        'students.2.sport': 'volley',
        'students.3.name': 'Mario',
        'students.3.sport': 'football',
        'students.4.name': 'Mario',
        'students.4.sport': 'football',
      };

      expect(flatten.delete('students.1.name')).toEqual(result);
    });
  });

  /*   describe('add', () => {
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
  
        expect(flatten.add('students.*', 30, 'age')).toEqual(result);
      });
  
      it('Should add a object to array', () => {
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
  
      it('Should add a string to array', () => {
        let obj = {
          students: ['mario', 'paolo', 'giacomo'],
        };
        let flatten = new Flatten();
        flatten.populate(obj);
        const result = {
          'students.0': 'mario',
          'students.1': 'paolo',
          'students.2': 'giacomo',
          'students.3': 'franco',
        };
  
        expect(flatten.add('students', 'franco')).toEqual(result);
      });
  
      it('Should add a property to object', () => {
        let flatten = new Flatten();
        flatten.populate(obj);
        const result = {
          'students.0.name': 'Mario',
          'students.0.sport': 'football',
          'students.1.name': 'Paolo',
          'students.1.sport': 'football',
          'students.2.name': 'Giacomo',
          'students.2.sport': 'volley',
          'students.2.age': 30,
          'students.3.name': 'Mario',
          'students.3.sport': 'football',
          'students.4.name': 'Mario',
          'students.4.sport': 'football',
        };
  
        expect(flatten.add('students.2', 30, 'age')).toEqual(result);
      });
    }); */
});
