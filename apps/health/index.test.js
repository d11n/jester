import express from "express";
import request from "supertest";
import test from "ava";
import Health from "./index.js";

test("/health", async (t) => {
	const xp = express();
	const health = new Health();

	xp.use(...health.route());

	const response = await request(xp).get("/health");
	t.is(response.type, "text/plain");
	t.is(response.status, 200);
	t.is(response.text, "A-OK!");
});
