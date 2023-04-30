import { BinarySearcherClass } from '../src/BinarySearcher.class';

describe('BinarySearcherClass', () => {
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

  it('should find the index with a number', () => {
    expect(BinarySearcherClass.searchBy('age', 50, arr)).toEqual(2);
  });

  it('should find the index with a string', () => {
    expect(BinarySearcherClass.searchBy('name', 'Charlie', arr)).toEqual(2);
    expect(BinarySearcherClass.searchBy('name', 'Bob', arr)).toEqual(1);
    expect(BinarySearcherClass.searchBy('name', 'Alice', arr)).toEqual(0);
  });

  it('should not find the index because it not exist', () => {
    expect(BinarySearcherClass.searchBy('age', 1000, arr)).toEqual(-1);
  });
});
