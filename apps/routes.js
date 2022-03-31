/**
 * This is the route definition file for the "API" server, which supports
 * multiple api endpoints.
 */

import Health from "./health/index.js";
import GuestGraphql from "./guest-graphql/index.js";
import MainGraphql from "./main-graphql/index.js";
import WellKnown from "./well-known/index.js";
import Static from "./static/index.js";

const route_map = new Map();
route_map.set("/health", new Health());
route_map.set("/api/guest-graphql", new GuestGraphql());
route_map.set("/api/graphql", new MainGraphql());
route_map.set("/.well-known", new WellKnown());
route_map.set("/", new Static());

export default route_map;
