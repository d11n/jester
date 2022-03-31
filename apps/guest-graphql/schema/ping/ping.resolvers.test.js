import { schema } from "../index.js";
import { graphql } from "graphql";

import test from "ava";

test("ping", async (t) => {
	const query = "query ping { ping { message } }";
	const result = await graphql({ schema: schema, source: query });

	const { data: { ping: { message } } } = result;
	t.is(message, "Pong");
});

test("ping-with-argument", async (t) => {
	const query = `query ping { ping(message: "PONG!!!") { message } }`;
	const result = await graphql({ schema: schema, source: query });

	const { data: { ping: { message } } } = result;
	t.is(message, "PONG!!!");
});
