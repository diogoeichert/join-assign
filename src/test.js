"use strict";

const assert = require("assert");
const join = require("./index.js");

const tests = {
	"assign instances" () {
		function A() {
			this.a = 1;
		}

		function B() {}

		B.prototype.b = function () {
			return this.a;
		};

		const a = new A();
		const b = new B();
		join.assign(a, b);
		assert.strictEqual(a.b(), 1);
	},
	"assign tree" () {
		const source = {
			a: [1, 2],
			b: {c: 3},
			d: {e: [4, 5]},
			f: {g: {h: [6, 7]}},
			i: "alpha"
		};

		const target = {
			a: [2, 3],
			c: [1, 2, 3],
			d: {e: [5, 6]},
			f: "beta"
		};

		const result = {
			a: [2, 3, 1],
			c: [1, 2, 3],
			d: {e: [5, 6, 4]},
			f: {g: {h: [6, 7]}},
			b: {c: 3},
			i: "alpha"
		};

		join.assign(target, source);
		assert.strictEqual(JSON.stringify(target), JSON.stringify(result));
	},
	"concat" () {
		const source = [1, 2, 3, 4, 5];
		const target = [5, 6, 7, 8, 9];
		join.concat(target, source);
		assert.strictEqual(JSON.stringify(target), "[5,6,7,8,9,1,2,3,4]");
	}
};

for (const name in tests) {
	try {
		tests[name]();
	} catch (e) {
		console.log(e);
	}
}
