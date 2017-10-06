const transmutate = require('./');

let mutator = {
	a: '12', // set to '12',
	b: n => 2 * n, // multiply by two,
	c: p => { // use method push and return p
		p.push(12);
		return p;
	},
	d: [x => x * x], // square array contents,
	f: {
		g: a => --a // nesting objects works
	}
}

let object = {
	b: 7,
	c: [10, 11],
	d: [-2, -1, 0],
	e: 'unchanged',
	f: {
		g: 7
	}
}

transmutate(mutator, object).then(result => {
	assert(result.a, '12');
	assert(result.b, 14);
	assert(result.c[0], 10);
	assert(result.c[1], 11);
	assert(result.c[2], 12);
	assert(result.d[0], 4);
	assert(result.d[1], 1);
	assert(result.d[2], 0);
	assert(result.e, 'unchanged');
	assert(result.f.g, 6);
}).catch(console.error);


function assert(left, right) {
	if (left !== right)
		throw new Error(`Value mismatch! ${left} is not equal to ${right}`);
}