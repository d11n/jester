//
// The base class of all routable applications. Anything that extends this
//  must implment:
//
//  - A `name` accessor to return the name of the application
//  - A `router` accessor that returns an express router for this app
//  - Implment `start` and `stop` that do initialiation and teardown of the
//    application (if necessary). If they are not necessary no need to
//    implement.
//

export default class BaseApp {
	get name() {
		throw Error("Implement the name() accessor");
	}

	get router() {
		throw Error("Implement the router() to create the application routes");
	}

	route() {
		return [ `/${ this.name }`, this.router ];
	}

	async start() {
		// console.log(`Starting up the ${ this.name } application`);
	}

	async stop() {
		// console.log(`Stopping up the ${ this.name } check application`);
	}
}


