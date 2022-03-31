import express from "express";
import BaseApp from "../base_app.js";

export default class Health extends BaseApp {
	get name() {
		return "health";
	}

	get router() {
		const router = express.Router();

		router.get("/", (_request, response) => {
			response.set("Content-Type", "text/plain");
			response.send("A-OK!");
		});

		return router;
	};
};

