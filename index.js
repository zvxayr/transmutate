function transmute(transmuter, promisedValue) {
	return Promise.resolve(promisedValue).then(value => {
		if (transmuter == undefined) {
			// no transmutation
			return value;
		} else if (transmuter instanceof Function) {
			// transmute with function
			return transmuter(value);
		} else if (transmuter instanceof Array) {
			if (value instanceof Array) {
				// apply transmutaion to all array element
				return Promise.all(value.map(element => transmute(transmuter[0], element)));
			} else {
				// transmute and wrap in array
				return transmute(transmuter, value).then(result => [result]);
			}
		} else if (transmuter.constructor == Object) {
			if (value == undefined) {
				// no transmutation
				return;
			} else if (value.constructor == Object) {
				let valueKeys = Object.keys(value);
				let transmuterKeys = Object.keys(transmuter);

				let keys = unique(valueKeys.concat(transmuterKeys)),
					promises = [];

				for (var i = 0; i < keys.length; i++) {
					let key = keys[i];
					if (key in transmuter) {
						promises.push(transmute(transmuter[key], value[key]));
					} else {
						promises.push(value[key]);
					}
				}

				return Promise.all(promises).then(values => {
					let result = {};
					for (let i in keys) {
						if (values[i] != undefined) {
							result[keys[i]] = values[i];
						}
					}
					return result;
				});
			} else {
				// type error
				// fail silently
				return;
			}
		} else {
			// all other values
			if (transmuter) {
				return transmuter;
			} else {
				return value;
			}
		}
	});
}

// Helper functions
function unique(array) {
	return array.reduce((acc, val) => {
			if (!acc.includes(val))
				acc.push(val);
			return acc;
		},
	[]);
}

module.exports = transmute;