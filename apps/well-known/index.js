import express from "express";
import BaseApp from "../base_app.js";

export default class WellKnown extends BaseApp {
	get name() {
		return "well-known";
	}

	get router() {
		const router = express.Router();

		router.get("/mobile-config", (request, response) => {
			const host = request.headers["host"];
			const base_url = `${ request.protocol }://${ host }`;

			const config = {
				"FAMILY_APP_ROOT_URL": base_url,
				"FAMILY_APP_MOBILE_CONFIG_URL": `${ base_url }/.well-known/mobile-config`,
				"FAMILY_APP_HEALTHCHECK_URL": `${ base_url }/health`,
				"FAMILY_APP_GUEST_GRAPHQL_URL": `${ base_url }/api/guest-graphql`,
				"FAMILY_APP_MAIN_GRAPHQL_URL": `${ base_url }/api/graphql`,
			};
			response.json(config);
		});

		return router;
	};
};

