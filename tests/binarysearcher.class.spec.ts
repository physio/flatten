import { BinarySearcherClass } from '../src/BinarySearcher.class';

describe('BinarySearcherClass', () => {
  it('should flatten a simple object', () => {
    const arr = [
      {
        name: 'Alice',
        age: 30,
      },
      {
        name: 'Bob',
        age: 40,
      },
      {
        name: 'Charlie',
        age: 50,
      },
    ];
    expect(BinarySearcherClass.searchBy('age', 50, arr)).toEqual(2);
    expect(BinarySearcherClass.searchBy('name', 'Charlie', arr)).toEqual(2);
    expect(BinarySearcherClass.searchBy('name', 'Bob', arr)).toEqual(1);
    expect(BinarySearcherClass.searchBy('name', 'Alice', arr)).toEqual(0);
  });
});
