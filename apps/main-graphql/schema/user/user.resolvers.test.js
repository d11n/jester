import { schema } from "../index.js";
import { graphql } from "graphql";

import test from "ava";

test("fetchCurrentUser", async (t) => {
	const query = `
	query fetchCurrentUser {
	  fetchCurrentUser {
			id
			phoneNumber
			email
		}
	}`;
	const result = await graphql({ schema: schema, source: query });

	const { data: { fetchCurrentUser } } = result;

	t.is(fetchCurrentUser.id, "fakeid-1234");
	t.is(fetchCurrentUser.phoneNumber, "+18005551212");
	t.is(fetchCurrentUser.email, "fakeid@example.com");
});
