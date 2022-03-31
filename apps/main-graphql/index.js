import express from "express";
import { ApolloServer } from "apollo-server-express";


import { schema } from "./schema/index.js";
import BaseApp from "../base_app.js";

export default class MainGraphql extends BaseApp {
	app;
	server;

	constructor() {
		super();
		this.app = express();
		this.server = new ApolloServer({ schema });
	}

	get name() {
		return "main-graphql";
	}

	get app() {
		return this.app;
	}

	get server() {
		return this.server;
	}

	get router() {
		// TODO: Additional middleware can be mounted at this point
		//  - jwt validat
		//  - infalte the current user
		// this.app.use('*',
		//    jwtCheck,
		//    inflateUser,
		//    this.server.getMiddleware({ path: "/" }));

		return this.app.use(this.server.getMiddleware({ path: "/" }));
	}

	async start() {
		await this.server.start();
	};
}
