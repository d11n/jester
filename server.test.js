import { test, expect } from "@jest/globals"

import Server from "./server.js";

/////////// Tests

test(".serve", () => {
	const server = new Server(Schema);

	expect.assertions(4)
	expect(() => server.serve()).toThrow()
	expect(() => server.serve("nonsense")).toThrow()
	expect(() => server.serve(random())).not.toThrow()
	expect(() => server.close()).not.toThrow()
});

test(".close", () => {
	const server = new Server(Schema);

	expect.assertions(2)
	expect(() => server.serve(random())).not.toThrow()
	expect(() => server.close()).not.toThrow()
});

test.todo(".execute");

/////////// Util

function random(min=1000, max=4000) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
