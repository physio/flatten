![Alligator](./docs/alligator.png)

# Flatten-ts Documentation

**flatten-ts** is a lightweight TypeScript library for flattening arrays of any depth into a single-level array.

Using the flatten method in general has several advantages, including:
Usage
1 - Reduced code complexity: **flatten** simplifies the process of manipulating arrays of arrays, reducing the need for writing complex code to perform this operation.

2 - Improved code readability: Using **flatten** makes the code more readable, as it is easier to understand what the code is doing when using a standard method instead of writing custom code.

3 - Performance improvements: **flatten** is a native method of JavaScript, which means it has been optimized for performance. This means that using flatten can improve the performance of the code compared to using custom methods for manipulating arrays of arrays.

4 - Cross-browser support: **flatten** is a native method of JavaScript, which means it is supported by all modern browsers. This means that it can be reliably used in all JavaScript projects, regardless of the browser used by users.

Overall, using flatten in JavaScript can simplify the manipulation of arrays of arrays, improve the performance of the code, and make the code more readable and maintainable.

## Installation

You can install flatten-ts via npm:

```bash
npm install flatten-ts
```

## Usage

To use Flatten-ts, import the library into your TypeScript code and call the `flatten()` function, passing in the array of arrays to be flattened.

```js
import { flatten } from 'flatten-ts';

const obj = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
  phoneNumbers: [
    {
      type: 'home',
      number: '555-1234',
    },
    {
      type: 'work',
      number: '555-5678',
    },
  ],
};

const flatten = new Flatten();
flatten.populate(complexObject);

console.log(flatten.getCollection());
/*
{
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com',
  'address.street': '123 Main St',
  'address.city': 'Anytown',
  'address.state': 'CA',
  'address.zip': '12345',
  'phoneNumbers.0.type': 'home',
  'phoneNumbers.0.number': '555-1234',
  'phoneNumbers.1.type': 'work',
  'phoneNumbers.1.number': '555-5678'
}

*/
```

As you can see in the example above, when `flatten` encounters an array, it inserts the numeric index to identify the object within the array.

## Update a property

Flatten is very convenient when you need to update a property. The library has a dedicated method for this purpose.

```js
const obj = {
  name: 'John Doe',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
  phoneNumbers: [
    {
      type: 'home',
      number: '555-1234',
    },
    {
      type: 'work',
      number: '555-5678',
    },
  ],
};

const flatten = new Flatten();
flatten.populate(complexObject);

flatten.update('name', 'Mario Rossi');
flatten.update('address.city', 'Venice');
flatten.update('phoneNumbers.0.number', '123-456.789');

console.log(flatten.getCollection());
/*
{
  name: 'Mario Rossi',
  age: 30,
  'address.street': '123 Main St',
  'address.city': 'Venice',
  'address.state': 'CA',
  'address.zip': '12345',
  'phoneNumbers.0.type': 'home',
  'phoneNumbers.0.number': '123-456.789',
  'phoneNumbers.1.type': 'work',
  'phoneNumbers.1.number': '555-5678'
}
*/
```

Flatten allows you to update multiple properties with a single command, using the '\*' character. Suppose you need to update the due date of an exam for an entire array.

```js
const obj = {
  students: [
    {
      id: '001',
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 22,
      major: 'Computer Science',
      courses: [
        {
          code: 'CSC101',
          title: 'Introduction to Computer Science',
          credits: 3,
          grade: 'A',
          dueDate: '2023-05-30',
        },
        {
          code: 'CSC201',
          title: 'Data Structures and Algorithms',
          credits: 4,
          grade: 'B+',
          dueDate: '2023-06-15',
        },
        {
          code: 'MAT101',
          title: 'Calculus I',
          credits: 4,
          grade: 'A-',
          dueDate: '2023-05-10',
        },
      ],
    },
  ],
};

const flatten = new Flatten();
flatten.populate(obj);

flatten.update('students.*.dueDate', '2024-01-01');
```

You can use multiple '\*' int the path.

### Use external Json

You can import a JSON file into TypeScript using the import statement and specifying the file path of the JSON file. The imported JSON object can then be assigned to a variable or used directly in your code.

```js
import { flatten } from 'flatten-ts';

// optional: you can import a json from external source
import extJson from '../output.json';

const flatObj = new Flatten();
flatObj.populate(extJson);
```

Then, you can use the flatten function to flatten any array of any depth into a single-level array:

TODO: complete docs

## Contributing

To contribute to the Flatten-ts project, please read the CONTRIBUTING.md file and submit a pull request with your proposed changes.

## License

Flatten-ts is released under the MIT license. Please read the LICENSE file for further information about the license.

I hope this structure is helpful as a starting point for the documentation of the Flatten-ts project. If you need any further assistance, please don't hesitate to ask.
