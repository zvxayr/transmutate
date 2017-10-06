# transmutate
Mutates object properties as specified by functions

## Installation

```sh
npm install transmutate --save
```

## API
```javascript
let transmutate = require('transmutate');
```

## Usage

```javascript
let mutator = {
	a: '12', // set to '12',
	b: n => 2 * n, // multiply by two,
	c: p => { // use method push and return p
		p.push(12);
		return p;
	},
	d: [x => x * x] // square array contents
}

let object = {
	b: 7,
	c: [10, 11],
	d: [-2, -1, 0],
	e: 'unchanged'
}

transmutate(mutator, object).then(result => {
	// result == { a: '12', b: 14, c: [10, 11, 12], d: [4, 1, 0], e: 'unchanged' }
});
```

## License

MIT
