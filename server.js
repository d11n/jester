import http from "http";
import express from "express";
import route_map from "./apps/routes.js";

const NODE_ENV = process.env.NODE_ENV || "development";

export default class Server {
	#root;
	#daemon;
	#route_map;

	constructor() {
		const root = express();
		const httpServer = http.createServer(root);

		this.#root = root;
		this.#daemon = httpServer;
		this.#route_map = route_map;
	}

	async start() {
		for (const app of this.#route_map.values()) {
			await app.start();
		}
	}

	async serve(port) {
		if (isNaN(port)) {
			throw new Error("port must be numeric");
		}

		await this.start();

		// must delay setting up routes until after applications
		// are "started" because of Apollo lifecycle
		this.#route();

		this.#root.listen(port, () => {
			if (NODE_ENV === "development") {
				// TODO: add logger w/ log-levels, use console during dev only
				// eslint-disable-next-line no-console
				console.log(`Lifespark Family app listening on port ${ port }`);
			}
		});
	}

	async close() {
		for (const app of this.#route_map.values()) {
			await app.stop();
		}
		await this.#daemon.close();
	}

	#route() {
		// do simplistic logging if in development
		if (NODE_ENV == "development") {
			this.#root.use(function(req, res, next) {
				// eslint-disable-next-line no-console
				console.log("%s %s %s", req.method, req.url, req.path);
				next();
			});
		}

		for (const [ path, app ] of this.#route_map.entries()) {
			this.#root.use(path, app.router);
		}
	}
}
